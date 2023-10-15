import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, Salt } from 'src/entity';
import { DtoUser, TUser, TUserSalt } from './user.type';
import { userExists, hash } from 'src/utils';

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

  public async findOne(field: string, value: number | string): Promise<TUser> {
    const findResult = await this.usersRepo.findOne({
      where: { [field]: value },
    });

    return { user: findResult, ok: !!findResult };
  }

  private async getSalt(id: number): Promise<Salt> {
    return await this.saltsRepo.findOne({
      where: { user: { id: id } },
    });
  }

  async getUserWithSalt(userDto: DtoUser): Promise<TUserSalt> | null {
    const user = (await this.findOne('login', userDto.login)).user;

    if (!user) throw new NotFoundException();
    const salt = await this.getSalt(user.id);

    return { user, salt };
  }

  public async deleteUser(login: string) {
    return `Affected rows: ${await this.usersRepo.delete(login)}`;
  }

  public async updateUser(id: number, userDto: DtoUser) {
    const saltedData = await hash(userDto.password);
    userDto.password = saltedData.hashedPassword;

    this.saltsRepo.update({ id }, { saltText: saltedData.salt });

    return ` Affected ${
      (await this.usersRepo.update({ id }, { ...userDto })).affected
    }`;
  }
}
