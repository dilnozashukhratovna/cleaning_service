import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class UpdateAdminDto {
  @ApiProperty({ example: 'John Green', description: 'Admin full name' })
  @IsNotEmpty()
  @IsString()
  full_name?: string;

  @ApiProperty({ example: 'john_01', description: 'Admin telegram link' })
  @IsString()
  telegram_link?: string;

  @ApiProperty({ example: 'john01@gmail.com', description: 'Admin email' })
  @IsNotEmpty()
  @IsEmail()
  email?: string;

  @ApiProperty({ example: 'Pa$$w0rd', description: 'Admin password' })
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password?: string;

  @ApiProperty({ example: 'img/photo1.jpg', description: 'Admin photo' })
  @IsString()
  admin_photo?: string;

  @ApiProperty({ example: 'false', description: 'Is admin creator' })
  is_creator?: boolean;

  @ApiProperty({ example: 'false', description: 'Is admin active' })
  is_active?: boolean;
}

