import { PrismaClient } from '@prisma/client'
import { IDatabase } from '../interfaces/db';
import makeUserDb from './user';
import makeSubjectDb from './subject';
import makeTopicDb from './topic';

export default function makeDb(): IDatabase {
  const db = new PrismaClient()
  return db;
}

export const userDb = makeUserDb({ makeDb });
export const subjectDb = makeSubjectDb({ makeDb });
export const topicDb = makeTopicDb({ makeDb });
