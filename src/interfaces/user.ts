export interface IUser {
  id?:number
  firstName:string
  lastName:string
  phoneNumber:string
  email:string
  hashedPassword:string
  voucherCode:string
  country?:string
  timezone?:string
  tagline?:string
  bio?:string
}