import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty({ example: 'Rosie', description: 'Employee first name' })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({ example: 'Alison', description: 'Employee last name' })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({ example: 'rosie_01', description: 'Employee telegram link' })
  @IsString()
  telegram_link: string;

  @ApiProperty({
    example: 'rosie01@gmail.com',
    description: 'Employee email',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Pa$$w0rd', description: 'Employee password' })
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  password: string;

  @ApiProperty({ example: 'img/photo1.jpg', description: 'Employee photo' })
  @IsString()
  employee_photo: string;

  @ApiProperty({
    example: '+998998887766',
    description: 'Employee phone number',
  })
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber()
  phone_number: string;

  @ApiProperty({
    example: 'passport seria',
    description: 'Employee passport seria',
  })
  @IsString()
  @IsNotEmpty()
  passport_seria: string;

  @ApiProperty({
    example: 4.5,
    description: 'Employee rating',
  })
  @IsNumber()
  rating: number;

  @ApiProperty({
    example: 'female',
    description: 'Employee gender',
  })
  @IsString()
  gender: string;
}
