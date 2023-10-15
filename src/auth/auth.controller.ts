import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DtoUser } from 'src/user/user.type';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async logIn(@Body() userDto: DtoUser) {
    return await this.authService.logIn(userDto);
  }

  @Post('signup')
  async signUp(@Body() userDto: DtoUser) {
    return await this.authService.signUp(userDto);
  }

  @Get('refresh')
  async updateTokens(@Body() refreshData: { login: string; refresh: string }) {
    return this.authService.updateTokens(
      refreshData.refresh,
      refreshData.login
    );
  }
}
