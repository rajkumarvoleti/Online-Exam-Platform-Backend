import { PrismaClient } from '@prisma/client'
import { IDatabase } from '../interfaces/db';
import makeUserDb from './user';
import makeSubjectDb from './subject';
import makeTopicDb from './topic';
import makeQuestionDb from './question';
import makeExamDb from './exam';

const db = new PrismaClient();

export default function makeDb(): IDatabase {
  return db;
}

export const userDb = makeUserDb({ makeDb });
export const subjectDb = makeSubjectDb({ makeDb });
export const topicDb = makeTopicDb({ makeDb });
export const questionDb = makeQuestionDb({ makeDb });
export const examDb = makeExamDb({ makeDb });
