import { IUser } from "../interfaces/user";
import { IDatabase } from "../interfaces/db";

export default function makeUserDb({ makeDb }: {makeDb:() => IDatabase}) {

  async function findByEmail({email}:{email:string}){
    const db = makeDb();
    const user = await db.user.findUnique({
      where:{
        email
      }
    })
    return user;
  }

  async function create(userData:IUser){
    const db = makeDb();
    const user = await db.user.create({
      data:{
        email:userData.email,
        firstName:userData.firstName,
        password:userData.hashedPassword,
        phoneNumber:userData.phoneNumber,
        voucherCode:userData.voucherCode
      }
    })
    return user;
  }

  async function update(user:IUser){
    const db = makeDb();
    const updatedUser = await db.user.update({
      where:{
        id:user.id,
      },
      data:{
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        country: user.country,
        timezone: user.timezone,
        tagline: user.tagline,
        bio: user.bio,
        experienceIn: user.experienceIn,
        qualification: user.qualification,
        totalExperience: user.totalExperience,
      }
    });
    return updatedUser;
  }

  async function updatePassword(password: string, id: number) {
    const db = makeDb();
    const updatedUser = db.user.update({
      where:{
        id
      },
      data: {
        password
      }
    })
    return updatedUser;
  }

  return {findByEmail, create, update, updatePassword}
}