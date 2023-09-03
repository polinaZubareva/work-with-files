import { UserService } from '../../user/user.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWTCONSTANTS } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private userService: UserService) {
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

  async validate(payload: { login: string; password: string }) {
    // return await this.userService.findOne('login', payload.login);
    console.log('balbal');

    return payload;
  }
}
