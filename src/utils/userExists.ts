import { User } from 'src/entity/user.entity';
import { Repository } from 'typeorm';

export async function userExists(
  login: string,
  usersRepo: Repository<User>
): Promise<boolean> {
  return (await usersRepo.findOne({ where: { login: login } })) ? true : false;
}
