import { PrismaClient } from '@prisma/client'
import { IDatabase } from '../interfaces/db';
import makeUserDb from './user';

export default function makeDb():IDatabase {
  const db = new PrismaClient()
  return db;
}

export const userDb = makeUserDb({ makeDb });
