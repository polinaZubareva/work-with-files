import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DtoUser } from 'src/user/user.type';

// @Controller('auth')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async signIn(@Body() userDto: DtoUser) {
    return this.authService.signIn(userDto);
  }
}
