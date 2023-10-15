import { Module } from '@nestjs/common';
import { FaceController } from './face.controller';
import { FaceService } from './face.service';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [FaceController],
  providers: [FaceService],
  imports: [UserModule],
})
export class FaceModule {}
