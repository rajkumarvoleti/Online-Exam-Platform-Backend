import { Prisma } from "@prisma/client";
import { IDatabase } from "../interfaces/db";
import { ICreateTestData } from "../interfaces/exam";

export default function makeExamDb({ makeDb }: { makeDb: () => IDatabase }) {

  const db = makeDb();

  const createExam = async ({userId,data,questions}:{userId:number,data:ICreateTestData,questions:number[]},) => {
    const {testDetails, testSettings, pricing} = data;
    const testPrice = pricing.testType === "open" ? 0 : pricing.price;
    const testDuration = testSettings.testDurationAvailability === "always" ? 0 : testSettings.testDuration;
    const testStartDate = testSettings.testDateAvailability === "always" ? "always" : testSettings.testStartDate;
    const testEndDate = testSettings.testDateAvailability === "always" ? "always" : testSettings.testEndDate;
    const testStartTime = testSettings.testTimeAvailability === "always" ? "always" : testSettings.testStartTime;
    const testEndTime = testSettings.testTimeAvailability === "always" ? "always" : testSettings.testEndTime;


    const exam = db.exam.create({
      data:{
        description: testDetails.testDescription,
        name: testDetails.testName,
        negativeMarks: testSettings.negativeMarks,
        passPercentage: testSettings.passPercentage,
        price: testPrice,
        testDuration,
        totalMarks: data.testSettings.totalMarks,
        totalQuestions: data.testDetails.totalQuestions,
        testStartDate,
        testEndDate,
        testStartTime,
        testEndTime,
        questions: {
          connect: questions.map(question => {
            return {id:question}
          }),
        },
        createdBy: {
          connect:{id: userId}
        }
      }
    }).catch((e:any) => console.log(e));
    return exam
  }

  const deleteAll = async() => {
    await db.exam.deleteMany({
      where:{}
    })
  }

  const getExam = async(id:number) => {
    const exam = await db.exam.findUnique({
      where: {id},
      select: {
        id: true,
        questions: {
          select: {
            complexity: true,
            id: true,
            options: true,
            description: true,
            type: true,
          }
        },
        testDuration: true,
      }
    })
    return exam;
  }

  const getAllExams = async() => {
    const exams = db.exam.findMany();
    return exams;
  }

  return { createExam, getAllExams, deleteAll, getExam };
}