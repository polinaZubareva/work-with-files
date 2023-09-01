import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { DtoUser } from 'src/user/user.type';
import { UserService } from './../user/user.service';
import { createToken } from './helpers';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async logIn(userDto: DtoUser) {
    const { user, salt } =
      (await this.userService.getUserWithSalt(userDto)) ?? {};

    if (
      user &&
      user.password === bcrypt.hashSync(userDto.password, salt.saltText)
    ) {
      return {
        ok: true,
        userLogin: user.login,
        accessToken: await createToken(user.login, this.jwtService),
      };
    } else {
      return { ok: false, error: 'Authentication failed' };
    }
  }

  async signUp(userDto: DtoUser) {
    const createdUser = await this.userService.createUser(userDto);

    return {
      user: createdUser,
      accessToken:
        (await createToken(createdUser?.user?.login, this.jwtService)) ?? null,
    };
  }
}
