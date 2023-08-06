import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateCustomerDto {
  @ApiProperty({ example: 'Anna', description: 'Customer first name' })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({ example: 'Smith', description: 'Customer last name' })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({ example: 'anna_01', description: 'Customer telegram link' })
  @IsString()
  telegram_link: string;

  @ApiProperty({
    example: 'anna@gmail.com',
    description: 'Customer email',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Pa$$w0rd', description: 'Customer password' })
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    example: 'Pa$$w0rd',
    description: 'Employee confirmation password',
  })
  @IsNotEmpty()
  @IsString()
  confirm_password: string;

  @ApiProperty({ example: 'img/photo1.jpg', description: 'Customer photo' })
  @IsString()
  customer_photo: string;

  @ApiProperty({
    example: '+998998887766',
    description: 'Customer phone number',
  })
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber()
  phone_number: string;

  @ApiProperty({ example: '2000-01-01', description: 'Customer birthdate' })
  @IsString()
  birthdate: Date;

  @ApiProperty({ example: 'false', description: 'Is customer active' })
  is_active: boolean;

  @ApiProperty({ example: 1, description: 'Customer location' })
  @IsNotEmpty()
  location_id: number;
}
