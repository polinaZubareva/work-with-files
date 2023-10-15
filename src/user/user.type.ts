import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Salt, Video } from 'src/entity';
import { User } from 'src/entity';

export type TUser = {
  ok: boolean;
  user?: User;
  error?: string;
};

export type TUserSalt = {
  user: User;
  salt: Salt;
};

export class DtoUser {
  @IsEmail()
  @IsString()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export type TUsersVideo = {
  ok: boolean;
  user?: User;
  video?: Video;
  error?: string;
};

export type TUserOk = {
  ok: boolean;
  status: string;
  error?: string;
};
