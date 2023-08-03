import bcrypt from 'bcrypt';
import { IUser } from '../interfaces/user';

export const makeUser = async (data:any) => {
  const {firstName, lastName, phoneNumber, email, password, voucherCode} = data;

  const hashedPassword:string = await bcrypt.hash(password, 10);

  const user:IUser = {
    firstName,
    lastName,
    phoneNumber,
    email,
    hashedPassword,
    voucherCode
  }
  return user;
}