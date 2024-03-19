import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Register } from './dto/register.dto';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async signIn(email: string, pass: string) {
    const user = await this.usersService.findOne(email);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async signOn(dto:Register){
    const user = await this.usersService.findOne(dto.email);
    if(user){
      throw new BadRequestException('Пользователь с таким email уже существует');
    }
    if(dto.password!==dto.password){
      throw new BadRequestException('Пароли не совпадают')
    }
    const reg = await this.usersService.create({email:dto.email, password:dto.password})
    const payload = { sub: reg.id, email: reg.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
