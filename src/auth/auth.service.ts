import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { DtoUser } from 'src/user/user.type';
import { UserService } from './../user/user.service';
import { Token } from './auth-types';

@Injectable()
export class AuthService {
  private options: JwtSignOptions = {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRATION,
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
        accessToken: await this.createToken(payload),
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

    return {
      user: createdUser,
      accessToken: (await this.createToken(payload)) ?? null,
    };
  }

  async createToken(data: Token) {
    return await this.jwtService.signAsync(data, this.options);
  }

  async verifyToken(token: string) {
    return await this.jwtService.verifyAsync(token, this.options);
  }
}
