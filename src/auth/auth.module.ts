import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { User, Video } from 'src/entity';
import { Salt } from 'src/entity';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local-strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Salt, Video]),
    JwtModule.register({}),
    UserModule,
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [UserService, LocalStrategy, JwtAuthGuard],
  exports: [JwtModule],
})
export class AuthModule {}
