import * as bcrypt from 'bcrypt';

export function hashPassword(password: string) {
  const hashedPassword = bcrypt.hashSync(password, 10);
  return hashedPassword;
}

export async function comparePassword(
  password: string,
  hashedPassword: string,
) {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}
