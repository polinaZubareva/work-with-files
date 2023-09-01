import { UserService } from '../../user/user.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWTCONSTANTS } from '../constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) {
    super({
      global: true,
      usernameField: 'login',
      passwordField: 'password',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWTCONSTANTS.secret,
      signOptions: { expiresIn: '1h' },
    });
  }

  async validate(payload: { login: string }) {
    // const token = await this.jwtService.signAsync(payload);
    // if(token===)
    return await this.userService.findOne('login', payload.login);
  }
}
