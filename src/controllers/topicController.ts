import { subjectDb, topicDb } from "../db";
import { ISubject, ITopic } from "../interfaces/exam";
import { IHttpRequest } from "../interfaces/http";

export const createTopic = async (req: IHttpRequest) => {
  const data = req.body;
  const topicData: ITopic = {
    name: data.topicData.name,
    description: data.topicData.description,
    subjectId: data.topicData.subjectId
  }
  const topic = await topicDb.createTopic({ topicData, userId: data.userId });

  return {
    statusCode: 201,
    headers: {
      'Content-Type': 'application/json',
    },
    body: { topic }
  }

}

export const getTopics = async (req: IHttpRequest) => {
  const { subjectId } = req.body
  const topics = await topicDb.getTopics({ subjectId });
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: { topics }
  }
}

export const updateTopic = async (req: IHttpRequest) => {
  const { topicData, id } = req.body;
  const topic = topicDb.editTopic({ topicData, id });
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: { topic }
  }
}

export const deleteTopic = async (req: IHttpRequest) => {
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
  await topicDb.deleteTopic(id);
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: { msg: "Deleted Successfully" }
  };
}