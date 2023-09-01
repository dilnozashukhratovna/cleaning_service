import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginEmployeeDto {
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
  password: string;
}
