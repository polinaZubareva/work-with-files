import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { User } from 'src/entity/user.entity';

export type TUser = {
  ok: boolean;
  user?: User;
  error?: string;
};

export class DtoUser {
  @IsEmail()
  @IsString()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  // @IsString()
  // @MinLength(8)
  // salt: string;
}
