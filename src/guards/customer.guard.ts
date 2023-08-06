import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { Customer } from '../customer/models/customer.model';

@Injectable()
export class CustomerGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Customer unauthorized');
    }
    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];
    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('Customer unauthorized');
    }
    async function verify(token: string, jwtService: JwtService) {
      const customer: Partial<Customer> = await jwtService.verify(token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });
      if (!customer) {
        throw new UnauthorizedException('Invalid token provided');
      }

      if (!customer.is_active) {
        throw new BadRequestException('Customer is not active');
      }

      return true;
    }
    return verify(token, this.jwtService);
  }
}

