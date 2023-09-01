import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { User } from 'src/entity/user.entity';
import { Salt } from 'src/entity/salt.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt-strategy';
// import { ConfigModule, ConfigService } from '@nestjs/config';
import { JWTCONSTANTS } from './constants';
import { LocalStrategy } from './strategies/local-strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Salt]),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: JWTCONSTANTS.secret,
    }),
  ],
  providers: [AuthService, UserService, JwtService, JwtStrategy, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
