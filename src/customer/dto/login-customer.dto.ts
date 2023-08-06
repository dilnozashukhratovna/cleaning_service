import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginCustomerDto {
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
}
