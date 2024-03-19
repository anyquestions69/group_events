import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { register } from 'module';
import { Register } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
  @HttpCode(HttpStatus.OK)
  @Post('registration')
  signOn(@Body() register:Register) {
    return this.authService.signOn(register);
  }
}
