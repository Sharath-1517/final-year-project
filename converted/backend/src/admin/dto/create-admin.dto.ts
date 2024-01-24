import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateAdminDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword()
  password: string;

  @IsEnum(['SUPER_ADMIN', 'GENERAL_ADMIN', 'OWNER'], {
    message: `Role must be one of the following values: 'SUPER_ADMIN', 'GENERAL_ADMIN', 'OWNER'`,
  })
  @IsOptional()
  role?: 'SUPER_ADMIN' | 'GENERAL_ADMIN' | 'OWNER';
}
