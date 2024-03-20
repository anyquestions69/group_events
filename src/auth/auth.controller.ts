import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Register } from './dto/register.dto';
import { Login } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Login) {
    return this.authService.signIn(signInDto);
  }
  @HttpCode(HttpStatus.OK)
  @Post('registration')
  signOn(@Body() register:Register) {
    return this.authService.signOn(register);
  }
}
