import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Employee } from '../employee/models/employee.model';

@Injectable()
export class EmployeeGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Employee unauthorized');
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Employee unauthorized');
    }

    const employee = await this.validateToken(token);
    if (!employee || !employee.is_active) {
      throw new UnauthorizedException('Invalid or inactive employee');
    }

    req.employee = employee;

    return true;
  }

  private async validateToken(token: string): Promise<Partial<Employee>> {
    try {
      return await this.jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });
    } catch (error) {
      return null;
    }
  }
}
