import express from 'express';
import {signup, signin, signout, authCheck, externalSignin, updateUser, updatePassword}  from '../controllers/userController';
import makeExpressCallback from '../util/express-callback';

const userRouter = express.Router();

userRouter.post("/signup",makeExpressCallback(signup));
userRouter.post("/signin", makeExpressCallback(signin));
userRouter.post("/externalSignin", makeExpressCallback(externalSignin));
userRouter.delete("/signout", makeExpressCallback(signout));
userRouter.get("/authcheck", makeExpressCallback(authCheck));
userRouter.post("/update", makeExpressCallback(updateUser));
userRouter.post("/updatePassword", makeExpressCallback(updatePassword));

export default userRouter;