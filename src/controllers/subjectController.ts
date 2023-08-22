import { subjectDb } from "../db";
import { ISubject } from "../interfaces/exam";
import { IHttpRequest } from "../interfaces/http";

export const createSubject = async (req: IHttpRequest) => {
  const data = req.body;
  console.log({userId:data.userId});
  const subjectData: ISubject = {
    name: data.subjectData.name,
    description: data.subjectData.description,
    topicsCount: 0,
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
  const data = await subjectDb.getAllSubjects();
  const subjects:ISubject[] = data.map(subject => {
    return {
      description: subject.description,
      name: subject.name,
      topicsCount: subject._count.topics,
      id: subject.id
    }
  }) ;
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: { subjects }
  }
}

export const getSubject = async (req: IHttpRequest) => {
  const id = JSON.parse(req.query.subjectId);
  const data = await subjectDb.getSubject(id);
  const subject:ISubject = {
    id: data.id,
    description: data.description,
    name: data.name,
    topicsCount: data._count.topics,
  }
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: { subject }
  }
}

export const updateSubject = async (req: IHttpRequest) => {
  const { subjectData, id } = req.body;
  console.log({ subjectData, id });
  const subject = await subjectDb.editSubject({ subjectData, id });
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