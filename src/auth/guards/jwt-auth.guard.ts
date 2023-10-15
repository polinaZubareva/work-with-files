import { AuthService } from './../auth.service';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1] ?? null;

    if (!token) throw new UnauthorizedException('Token is required');

    try {
      const decoded =
        (await this.authService.verifyFromAnother(token, 'access')) ?? null;
      if (decoded?.exp < 0)
        throw new UnauthorizedException('Token is required to be updated');
    } catch (error) {
      console.log(error.message);
      throw new UnauthorizedException('Token is not valid');
    }

    return true;
  }

  handleRequest(err: any, user: any) {
    if (err || !user) throw err || new UnauthorizedException();
    return user;
  }
}
