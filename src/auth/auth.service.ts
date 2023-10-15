import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { DtoUser } from 'src/user/user.type';
import { UserService } from './../user/user.service';
import { Token } from './auth-types';

@Injectable()
export class AuthService {
  private accessOptions: JwtSignOptions = {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRATION,
  };
  private refreshOptions: JwtSignOptions = {
    secret: process.env.JWT_REFRESH_SECRET,
    expiresIn: process.env.JWT_EXP_REFRESH,
  };

  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async logIn(userDto: DtoUser) {
    let payload: Token;

    const { user, salt } =
      (await this.userService.getUserWithSalt(userDto)) ?? {};

    if (
      user &&
      user.password === bcrypt.hashSync(userDto.password, salt.saltText)
    ) {
      payload = {
        sub: user.id.toString(),
        login: user.login,
      };
      return {
        ok: true,
        userLogin: user.login,
        tokens: await this.createTokens(payload),
      };
    } else {
      return { ok: false, error: 'Email or password is incorrect' };
    }
  }

  async signUp(userDto: DtoUser) {
    const createdUser = await this.userService.createUser(userDto);

    if (createdUser.error) return { createdUser };

    const payload: Token = {
      sub: createdUser.user?.id.toString(),
      login: createdUser.user?.login,
    };

    const tokens = await this.createTokens(payload);
    return {
      user: createdUser,
      accessToken: tokens.accessToken ?? null,
      refreshToken: tokens.refreshToken ?? null,
    };
  }

  async createToken(data: Token, options: JwtSignOptions) {
    return await this.jwtService.signAsync(data, options);
  }

  async verifyToken(token: string, options: JwtSignOptions) {
    return await this.jwtService.verifyAsync(token, options);
  }

  async verifyFromAnother(token: string, type: string) {
    return type === 'access'
      ? await this.verifyToken(token, this.accessOptions)
      : await this.verifyToken(token, this.refreshOptions);
  }

  async createTokens(payload: Token) {
    return {
      accessToken: await this.createToken(payload, this.accessOptions),
      refreshToken: await this.createToken(payload, this.refreshOptions),
    };
  }

  async updateTokens(refresh: string, login: string) {
    if (this.verifyToken(refresh, this.refreshOptions))
      return this.createTokens({ login });
    throw new ForbiddenException('Access denied');
  }
}
