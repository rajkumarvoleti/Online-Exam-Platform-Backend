import { Prisma } from "@prisma/client";
import { IDatabase } from "../interfaces/db";
import { IExam, IExamSubject } from "../interfaces/exam";

export default function makeExamSubjectDb({ makeDb }: { makeDb: () => IDatabase }) {

  const db = makeDb();

  const createExamSubject = async (data:IExamSubject) => {
    const examSubject = await db.examSubject.create({
      data: {
        numberOfQuestions: data.numberOfQuestions,
        questions: {
          connect: data.questionIds.map(id => {
            return {id}
          })
        },
        subjectId: data.subjectId,
        topics: {
          createMany: {
            data: data.topics.map(topic => {
              return {
                numberOfQuestions: topic.numberOfQuestions,
                topicId: topic.topicId,
              }
            })
          }
        },
      },
      select: {
        id: true
      }
    })
    return examSubject;
  }

  return { createExamSubject };
}