import { PrismaClient } from "@prisma/client";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import session from "express-session";

declare module 'express-session' {
  export interface SessionData {
    user: any;
  }
}

export const appSession = session({
  cookie: {
    maxAge: 2 * 60 * 60 * 1000,
    sameSite: false,
    secure: false
  },
  name: 'sid',
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  store: new PrismaSessionStore(
    new PrismaClient(),
    {
      checkPeriod: 2 * 60 * 1000,  // ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    },
  )
})