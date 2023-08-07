import { subjectDb } from "../db";
import { ISubject } from "../interfaces/exam";
import { IHttpRequest } from "../interfaces/http";

export const createSubject = async (req: IHttpRequest) => {
  const data = req.body;
  const subjectData: ISubject = {
    name: data.subjectData.name,
    description: data.subjectData.description,
    topics: data.subjectData.topics,
  }
  const subject = await subjectDb.createSubject({ subjectData, userId: data.userId });

  return {
    statusCode: 201,
    headers: {
      'Content-Type': 'application/json',
    },
    body: { subject }
  }

}

export const getAllSubjects = async (req: IHttpRequest) => {
  const subjects = await subjectDb.getAllSubjects();
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: { subjects }
  }
}

export const updateSubject = async (req: IHttpRequest) => {
  const { subjectData, id } = req.body;
  console.log({ subjectData, id });
  const subject = subjectDb.editSubject({ subjectData, id });
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: { subject }
  }
}

export const deleteSubject = async (req: IHttpRequest) => {
  const id = req.body.id;
  if (!id) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: { msg: "Invalid request. Id is not present" }
    }
  }
  await subjectDb.deleteSubject(id);
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: { msg: "Deleted Successfully" }
  };
}