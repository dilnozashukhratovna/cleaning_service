import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { Employee } from '../employee/models/employee.model';

@Injectable()
export class EmployeeGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Employee unauthorized');
    }
    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];
    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('Employee unauthorized');
    }
    async function verify(token: string, jwtService: JwtService) {
      const employee: Partial<Employee> = await jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });
      if (!employee) {
        throw new UnauthorizedException('Invalid token provided');
      }
      if (!employee.is_active) {
        throw new BadRequestException('Employee is not active');
      }
      return true;
    }
    return verify(token, this.jwtService);
  }
}
