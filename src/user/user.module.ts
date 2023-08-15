import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Video } from '../entity/video.entity';
import { Salt } from '../entity/salt.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Video, Salt])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
