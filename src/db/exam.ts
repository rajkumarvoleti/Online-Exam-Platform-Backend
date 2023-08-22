import { Prisma } from "@prisma/client";
import { IDatabase } from "../interfaces/db";
import { IExam } from "../interfaces/exam";

export default function makeExamDb({ makeDb }: { makeDb: () => IDatabase }) {

  const db = makeDb();

  const createExam = async (data:IExam) => {
    const exam = db.exam.create({
      data:{
        description:data.description,
        name: data.name,
        totalMarks: data.totalMarks,
        totalQuestions: data.totalMarks,
        totalTime: data.totalTime,
        testAvailabilityStart: data.testAvailabilityStart,
        testAvailabilityEnd: data.testAvailabilityEnd,
        subjects: {
          connect: data.subjectIds.map(id => {
            return {id}
          }),
        },
        createdBy: {
          connect:{id: data.userId}
        }
      }
    })
    return exam
  }

  const deleteAll = async() => {
    await db.exam.deleteMany({
      where:{}
    })
  }

  const getExam = async(id:number) => {
    const exam = await db.exam.findUnique({
      where: {
        id
      },
      select: {
        id: true,
        name: true,
        description: true,
        testAvailabilityStart: true,
        testAvailabilityEnd: true,
        totalMarks: true,
        totalQuestions: true,
        totalTime: true,
        subjects: {
          select: {
            numberOfQuestions: true,
            questions: {
              select: {
                id: true,
                description: true,
                type: true,
                options: {
                  select: {
                    description: true
                  }
                },
              }
            }
          }
        }
      }
    })
    return exam;
  }

  const getAllExams = async() => {
    const exams = await db.exam.findMany({
      where:{},
      select: {
        subjects: {
          include: {
            questions: {
              select: {id: true},
            },
            topics: true,
          }
        },
        description: true,
        id: true,
        name: true,
        testAvailabilityStart: true,
        testAvailabilityEnd: true,
        totalMarks: true,
        totalQuestions: true,
        totalTime: true
      }
    })
    return exams;
  }

  return { createExam, getAllExams, deleteAll, getExam };
}