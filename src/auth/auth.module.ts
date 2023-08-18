import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { User } from 'src/entity/user.entity';
import { Salt } from 'src/entity/salt.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Salt]),
    UserModule,
    JwtModule.register({}),
  ],
  providers: [AuthService, UserService, JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
