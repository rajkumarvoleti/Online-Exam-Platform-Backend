import { IDatabase } from "../interfaces/db";
import { ISubject, ITopic } from "../interfaces/exam";

export default function makeTopicDb({ makeDb }: { makeDb: () => IDatabase }) {

  async function createTopic({ topicData, userId }: { topicData: ITopic, userId: number }) {
    const db = makeDb();
    const topic = await db.topic.create({
      data: {
        name: topicData.name,
        description: topicData.description,
        subject: {
          connect: {
            id: topicData.subjectId
          }
        },
        createdBy: {
          connect: {
            id: userId
          }
        }
      }
    }).catch((e: any) => console.log(e));
    return topic;
  }

  async function getTopics({ subjectId }: { subjectId: number }) {
    const db = makeDb();
    const topics = await db.topic.findMany({
      where: {
        subjectId
      },
      select: {
        id: true,
        name: true,
        description: true,
        subjectId: true,
        _count: {
          select: {
            questions: true,
          }
        }
      }
    });
    return topics;
  }

  async function editTopic({ topicData, id }: { topicData: ITopic, id: number }) {
    const db = makeDb();
    const topic = await db.topic.update({
      where: {
        id
      },
      data: {
        name: topicData.name,
        description: topicData.description
      }
    }).catch((e: any) => console.log(e));
    return topic;
  }

  async function deleteTopic(id: number) {
    const db = makeDb();
    const topic = await db.topic.delete({
      where: {
        id
      }
    })
    return topic;
  }

  async function getQuestions(topicId: number) {
    const db = makeDb();
    const questions = await db.topic.findUnique({
      where: {
        id: topicId
      },
      select: {
        questions: {
          select: {
            id: true,
          }
        }
      }
    })
    return questions;
  }

  return { createTopic, getTopics, deleteTopic, editTopic, getQuestions };
}