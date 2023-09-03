import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { DtoUser } from 'src/user/user.type';
import { UserService } from './../user/user.service';
import { JWTCONSTANTS } from './constants';

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
        accessToken: await this.createToken(user.login),
      };
    } else {
      return { ok: false, error: 'Authentication failed' };
    }
  }

  async signUp(userDto: DtoUser) {
    const createdUser = await this.userService.createUser(userDto);

    return {
      user: createdUser,
      accessToken: (await this.createToken(createdUser?.user?.login)) ?? null,
    };
  }

  async createToken(data: string) {
    return await this.jwtService.signAsync(data, {
      secret: JWTCONSTANTS.secret,
    });
  }

  async verifyToken(token: string) {
    return await this.jwtService.verifyAsync(token, {
      secret: JWTCONSTANTS.secret,
    });
  }
}
