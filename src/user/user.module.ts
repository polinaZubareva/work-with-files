import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { AuthService } from 'src/auth/auth.service';
import { Photo, User, UserPhotos, UserVideos, Video, Salt } from '../entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Video,
      Salt,
      UserVideos,
      Photo,
      UserPhotos,
    ]),
  ],
  providers: [UserService, JwtService, AuthService],
  controllers: [UserController],
  exports: [AuthService, TypeOrmModule],
})
export class UserModule {}
