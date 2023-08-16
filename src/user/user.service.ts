import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';
import { DtoUser, TUser } from './user.type';
import { Salt } from 'src/entity/salt.entity';
import { hash } from '../utils/hashData';
import { userExists } from 'src/utils/userExists';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
    @InjectRepository(Salt)
    private saltsRepo: Repository<Salt>
  ) {}

  public async createUser(createUserDto: DtoUser): Promise<TUser> {
    const newUser: TUser = { ok: false };

    if (await userExists(createUserDto.login, this.usersRepo)) {
      newUser.error = 'User already exists';
      return newUser;
    }

    const saltedData = await hash(createUserDto.password);
    createUserDto.password = saltedData.hashedPassword;

    const addedUser = this.usersRepo.create(createUserDto);
    await this.usersRepo
      .save(addedUser)
      .then((user) => {
        newUser.user = user;
        newUser.ok = true;
      })
      .catch((reason) => {
        newUser.error = reason;
      });

    this.saltsRepo
      .insert({
        saltText: saltedData.salt,
        user: addedUser,
      })
      .catch((reason) => console.log(`Can't add salt: ${reason}`));

    return newUser;
  }

  public async findOne(id: number): Promise<TUser> {
    const foundUser: TUser = { ok: false };
    foundUser.user = await this.usersRepo.findOne({ where: { id: id } });
    if (!!foundUser.user) foundUser.ok = true;

    return foundUser;
  }

  public async deleteUser(login: string) {
    const deleted = await this.usersRepo.delete(login);
    console.log(deleted);
    return `Affected rows: ${deleted.affected}`;
  }
}
