import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAdminDto } from './dto/create-admin.dto';
import { Admin } from 'src/admin/schemas/admin.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private adminModel: Model<Admin>,
    private jwtToken: JwtService,
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(
        createAdminDto.password,
        saltRounds,
      );
      const createAdmin = new this.adminModel({
        email: createAdminDto.email,
        password: hashedPassword,
      });
      await createAdmin.save();

      return {
        status: HttpStatus.CREATED,
        message: 'Admin account created successfully',
      };
    } catch (error) {
      throw new BadRequestException('Email already registered');
    }
  }

  async adminLogin(loginAuthDto: LoginAuthDto) {
    try {
      const fetchedData = await this.adminModel.findOne({
        email: loginAuthDto.email,
      });

      const { password } = fetchedData;

      const passwordMatch = await bcrypt.compare(
        loginAuthDto.password,
        password,
      );

      if (!passwordMatch)
        throw new HttpException(
          { message: 'Invalid credentials.' },
          HttpStatus.UNAUTHORIZED,
        );

      const jwt_token = this.jwtToken.sign(loginAuthDto, {
        secret: process.env.JWT_SECRET,
      });

      const updatedData = await this.adminModel.findOneAndUpdate(
        {
          email: loginAuthDto.email,
        },
        {
          access_token: jwt_token,
        },
      );

      return {
        status: HttpStatus.CREATED,
        message: 'Successfully logged in.',
        passcode: jwt_token,
      };
    } catch (error) {
      if (error instanceof HttpException) throw error;
      throw new UnauthorizedException(
        'Invalid credentials or Account does not exists',
      );
    }
  }
}
