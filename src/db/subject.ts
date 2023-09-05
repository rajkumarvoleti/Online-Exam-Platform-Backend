import { IDatabase } from "../interfaces/db";
import { ISubject } from "../interfaces/exam";

export default function makeSubjectDb({ makeDb }: { makeDb: () => IDatabase }) {

  async function createSubject({ subjectData, userId }: { subjectData: ISubject, userId: number }) {
    const db = makeDb();
    const subject = await db.subject.create({
      data: {
        name: subjectData.name,
        description: subjectData.description,
        createdBy: {
          connect: {
            id: userId
          }
        }
      }
    }).catch((e: any) => console.log(e));
    return subject;
  }

  async function getAllSubjects() {
    const db = makeDb();
    const subjects = await db.subject.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        _count: {
          select: {
            topics: true,
          }
        }
      }
    })
    return subjects;
  }

  async function getSubject(id:number) {
    const db = makeDb();
    const subjects = await db.subject.findUnique({
      where:{
        id
      },
      select: {
        id: true,
        name: true,
        description: true,
        _count: {
          select: {
            topics: true
          }
        }
      }
    })
    return subjects;
  }

  async function editSubject({ subjectData, id }: { subjectData: ISubject, id: number }) {
    const db = makeDb();
    const subject = await db.subject.update({
      where: {
        id
      },
      data: {
        name: subjectData.name,
        description: subjectData.description
      }
    }).catch((e: any) => console.log(e));
    return subject;
  }

  async function deleteSubject(id: number) {
    const db = makeDb();
    await db.subject.delete({
      where: {
        id
      }
    })
  }

  async function getTopics(subjectId:number) {
    const db = makeDb();

    const topics = await db.subject.findUnique({
      where: { id: subjectId},
      select: {
        topics:{
          select: {
            id: true,
            questions: {
              where: {
                isActive: true,
              },
              select: {
                id: true,
                complexity: true,
              },
            }
          }
        }
      }
    });

    return topics;
  }

  async function getAllQuestionBanks() {
    const db = makeDb();
    const questionBanks = await db.subject.findMany({
      where: {},
      select: {
        id: true,
        name: true,
        topics: {
          select: {
            questions: {
              where: {
                isActive: true,
              },
              select: {
                complexity: true,
              }
            }
          }
        }
      }
    })
    return questionBanks;
  }

  return { createSubject, getAllSubjects, deleteSubject, editSubject, getTopics, getSubject, getAllQuestionBanks };
}