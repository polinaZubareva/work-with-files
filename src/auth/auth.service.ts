import { JwtService } from '@nestjs/jwt';
import { UserService } from './../user/user.service';
import { Injectable } from '@nestjs/common';
import { DtoUser } from 'src/user/user.type';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {}

  async signIn(userDto: DtoUser) {
    const { user, salt } = await this.userService.getUserAndSalt(userDto);
    if (
      user &&
      user.password === bcrypt.hashSync(userDto.password, salt.saltText)
    )
      console.log('совпали');
    else console.log('не совпали пароли');
  }
}
