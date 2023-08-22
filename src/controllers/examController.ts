import { IHttpRequest } from "../interfaces/http";
import { IExam, IExamSubject } from "../interfaces/exam";
import { createExamSubjects, getRandomQuestionsSubject } from "../handlers/examHandler";
import { examDb } from "../db";

export const createExam = async (req: IHttpRequest) => {

  const {testData} = req.body;

  let examSubjects:IExamSubject[] = [];
  await Promise.all(testData.subjects.map(async (subject:IExamSubject,i:number) => {
    const updatedSubject = await getRandomQuestionsSubject(subject);
    examSubjects = [...examSubjects,updatedSubject];
  }));

  const examSubjectIds = await createExamSubjects(examSubjects);

  const examDetails:IExam = {
    description: testData.description,
    name: testData.name,
    subjectIds:examSubjectIds,
    testAvailabilityStart: new Date(),
    testAvailabilityEnd: new Date(),
    totalMarks: testData.totalMarks,
    totalQuestions: testData.totalQuestions,
    totalTime: testData.totalTime,
    userId: testData.userId,
  }

  const exam = await examDb.createExam(examDetails);

  return {
    statusCode: 201,
    headers: {
      'Content-Type': 'application/json',
    },
    body: { exam }
  }
}

export const getAllExams = async(req:IHttpRequest) => {
  const exams = await examDb.getAllExams();
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: { exams }
  }
}

export const deleteAllExams = async(req:IHttpRequest) => {
  await examDb.deleteAll();
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: { msg: "Deleted Successfully" }
  };
}

export const getExam =async (req:IHttpRequest) => {
  const id = JSON.parse(req.query.examId);
  const exam = await examDb.getExam(id);
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: { exam }
  }
}