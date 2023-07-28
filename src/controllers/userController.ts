import bcrypt from 'bcrypt';
import { userDb } from '../db';
import { IHttpRequest } from '../interfaces/http';
import { makeUser } from '../handlers/userHandler';
import { IUser } from '../interfaces/user';
import { googleSigninRequest } from '../handlers/axios/auth';
import jwtDecode from "jwt-decode";


export const signup = async (req: IHttpRequest) => {

  const userData:IUser = await makeUser(req.body);

  const exsistingUser = await userDb.findByEmail({email:userData.email});
  if(exsistingUser) {
    return {
      statusCode:400,
      headers: {
        'Content-Type': 'application/json'
      },
      body:{error:"User already exsists"}
    }
  }

  const user = await userDb.create(userData)

  return {
    statusCode:201,
    headers: {
      'Content-Type': 'application/json',
      'Last-Modified': user.updatedAt.toUTCString()
    },
    body:{user}
  }
}

export const signin = async (req: IHttpRequest) =>{

  const {email, password} = req.body;
  const user = await userDb.findByEmail({email});
  if(!user){
    return {
      statusCode:400,
      headers: {
        'Content-Type': 'application/json'
      },
      body:{error:"User doesn't exsists"}
    }
  }
  const isMatch = await bcrypt.compare(password,user.password);
  if(!isMatch){
    return {
      statusCode:400,
      headers: {
        'Content-Type': 'application/json'
      },
      body:{error:"Incorrect password"}
    }
  }
  return {
    statusCode:200,
    headers: {
      'Content-Type': 'application/json',
    },
    body:{user,isAuth:true}
  }
}

export const externalSignin = async (req:IHttpRequest) => {
  const {accessToken, service} = req.body;
  let userDetails:{email:string, firstName:string} = {
    email: "",
    firstName: ""
  };
  if(service === "google")
    userDetails = await googleSignin({accessToken});
  else if(service === "microsoft")
    userDetails = await microsoftSignin({accessToken});

  const exsistingUser = await userDb.findByEmail({email:userDetails.email});
  if(exsistingUser){
    return {
      statusCode:200,
      headers: {
        'Content-Type': 'application/json',
      },
      body:{user:exsistingUser,isAuth:true}
    }
  }

  const userData:IUser = await makeUser({email:userDetails.email, firstName:userDetails.firstName, password:"123"});
  const user = await userDb.create(userData);

  return {
    statusCode:201,
    headers: {
      'Content-Type': 'application/json',
      'Last-Modified': user.updatedAt.toUTCString()
    },
    body:{user, isAuth:true}
  }
}

const googleSignin = async ({accessToken}:{accessToken:string}):Promise<{email:string, firstName:string}> => {
  const data = await googleSigninRequest({accessToken});
  return {email: data.email, firstName: data.name};
}

const microsoftSignin = async ({accessToken}:{accessToken:string}):Promise<{email:string, firstName:string}> => {
  const data:any = jwtDecode(accessToken);
  return {email: data.email, firstName: data.name};
}

export const signout = async (req:IHttpRequest) => {
  req.session.destroy((err:any) => {
    if(err) throw err;
    return {
      statusCode:200,
      headers: {
        'Content-Type': 'application/json',
      },
      body:{clearCookie:true}
    }
  })
  return {
    statusCode:200,
      headers: {
        'Content-Type': 'application/json',
      },
    body:{msg: "Logged out"}
  }
}

export const authCheck = async (req:IHttpRequest) => {
  const user = req.session.user;
  console.log(req.session);
  if(user){
    return {
      statusCode:200,
      headers: {
        'Content-Type': 'application/json',
      },
      body:{msg:"Authorized",user}
    }
  }
  return {
    statusCode:200,
      headers: {
        'Content-Type': 'application/json',
      },
    body:{msg: "Unauthorized"}
  }
}

export const updateUser = async (req:IHttpRequest) => {
  const body = req.body;
  const user:IUser = {...body};
  const updatedUser = await userDb.update(user);
  return {
    statusCode:200,
    headers: {
      'Content-Type': 'application/json',
    },
    body:{user:updatedUser}
  };
}

export const updatePassword = async (req:IHttpRequest) => {
  console.log(req.session);
  const {currentPassword, newPassword} = req.body;
  const isMatch = await bcrypt.compare(currentPassword,req.session.user.password);
  if(!isMatch){
    return {
      statusCode:400,
      headers: {
        'Content-Type': 'application/json'
      },
      body:{error:"Incorrect password"}
    }
  }
  await userDb.updatePassword(newPassword,req.session.user.id);
  return {
    statusCode:200,
      headers: {
        'Content-Type': 'application/json',
      },
    body:{msg: "Updated Password Successfully"}
  }
}