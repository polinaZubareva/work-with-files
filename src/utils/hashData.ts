import * as bcrypt from 'bcrypt';

export async function hash(password: string) {
  const salt = await bcrypt.genSalt(16);
  const hashedPassword = await bcrypt.hash(password, salt);
  return { salt, hashedPassword };
}
