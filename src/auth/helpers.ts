import { JwtService } from '@nestjs/jwt';
import { JWTCONSTANTS } from './constants';

export async function createToken(data: string, jwtService: JwtService) {
  return await jwtService.signAsync(data, { secret: JWTCONSTANTS.secret });
}

export async function verifyToken(token: string, jwtService: JwtService) {
  return await jwtService.verifyAsync(token, { secret: JWTCONSTANTS.secret });
}
