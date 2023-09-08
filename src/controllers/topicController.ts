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
  const { subjectId } = req.query
  const data = await topicDb.getTopics({ subjectId:parseInt(subjectId, 10) });
  const topics:ITopic[] = data.map(topic => {
    return {
      description: topic.description,
      name: topic.name,
      subjectId: topic.subjectId,
      id: topic.id,
      questionsCount: topic._count.questions
    }
  })
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: { topics }
  }
}

export const getTopicsFromTopicId = async (req: IHttpRequest) => {
  const { topicId } = req.query;
  const subjectId = (await topicDb.getTopic(parseInt(topicId,10))).subjectId;
  const subject:ISubject = await subjectDb.getSubject(subjectId);
  const topics:ITopic[] = await topicDb.getTopics({subjectId});
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: { topics, subject }
  }
}

export const getTopic = async (req: IHttpRequest) => {
  const { topicId } = req.query;
  const data = await topicDb.getTopic(parseInt(topicId,10));
  const topic:ITopic = {
    description: data.description,
    name: data.name,
    subjectId: data.subjectId,
    id: data.id,
    questionsCount: data._count.questions
  }
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: { topic }
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

  const questions = await topicDb.getQuestions(id);
  if(questions.questions.length !== 0){
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: { msg: "Cannot delete the topic. Please delete the questions in the topic first" }
    }
  }

  const topic = await topicDb.deleteTopic(id);
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: { msg: "Deleted Successfully", topic }
  };
}
