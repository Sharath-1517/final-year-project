import { Module, UseFilters } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Admin, AdminSchema } from 'src/admin/schemas/admin.schema';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Admin.name,
        schema: AdminSchema,
      },
    ]),
    ConfigModule.forRoot({
      envFilePath: '.env.development',
    }),
    MongooseModule.forRoot(process.env.MONGO_URI, { dbName: 'adminData' }),
  ],
  controllers: [AdminController],
  providers: [AdminService, JwtService],
})
export class AdminModule {}
