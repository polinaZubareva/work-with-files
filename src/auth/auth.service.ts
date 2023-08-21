import { JwtService } from '@nestjs/jwt';
import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { DtoUser } from 'src/user/user.type';
import * as bcrypt from 'bcrypt';
import { TAuthUser } from './auth.type';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async logIn(userDto: DtoUser) {
    const { user, salt } = await this.userService.getUserAndSalt(userDto);
    const authResult: TAuthUser = {
      ok: false,
    };
    if (
      user &&
      user.password === bcrypt.hashSync(userDto.password, salt.saltText)
    ) {
      console.log('Authentication passed');
      authResult.ok = true;
    } else {
      console.log('Authentication failed');
      authResult.error = 'Authentication failed';
    }
    return authResult;
  }

  async signIn(userDto: DtoUser) {
    const createdUser = await this.userService.createUser(userDto);
    return createdUser;
  }
}
