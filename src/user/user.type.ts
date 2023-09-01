import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Salt } from 'src/entity/salt.entity';
import { User } from 'src/entity/user.entity';

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
