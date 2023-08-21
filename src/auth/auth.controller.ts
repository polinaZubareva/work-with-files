import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DtoUser } from 'src/user/user.type';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async logIn(@Body() userDto: DtoUser) {
    return this.authService.logIn(userDto);
  }

  @Post('signin')
  async signIn(@Body() userDto: DtoUser) {
    return this.authService.signIn(userDto);
  }
}
