import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoService } from './photo.service';
import { PhotoController } from './photo.controller';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';

@Module({
  providers: [PhotoService, UserService],
  controllers: [PhotoController],
  imports: [UserModule, TypeOrmModule],
})
export class PhotoModule {}
