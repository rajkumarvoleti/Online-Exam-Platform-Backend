import { IDatabase } from "../interfaces/db";
import { IQuestionAndAnswer } from "../interfaces/exam";

export default function makeQuestionDb({ makeDb }: { makeDb: () => IDatabase }) {

  async function createQuestion({ questionData, userId }: { questionData: IQuestionAndAnswer, userId: number }) {
    const db = makeDb();
    const question = await db.question.create({
      data: {
        description: questionData.question,
        answer: questionData.answer.description,
        answerExplanation: questionData.answer.explanation,
        complexity: questionData.complexity,
        type:questionData.answer.type,
        topic: {
          connect: {
            id: questionData.topicId
          }
        },
        createdBy: {
          connect: {
            id: userId
          }
        },
        options: {
          createMany:{
            data:  questionData.answer.options.map(opt => {
              return {
                description:opt.description,
                isAnswer:opt.isCorrect,
                createdById: userId
              }
            }),
            }
          }
        },
        select: {
          answer: true,
          answerExplanation: true,
          complexity: true,
          description: true,
          id: true,
          type: true,
          topicId: true,
          options: {
            select:{
              description: true,
              isAnswer: true,
            }
          }
        }
      }
    )
    return question;
  }

  async function createManyQuestions({ questionsData, userId }: { questionsData: IQuestionAndAnswer[], userId: number }) {
    const db = makeDb();
    const questions = await db.question.createMany({
      data: questionsData.map(questionData => {
        return {
          description: questionData.question,
          answer: questionData.answer.description,
          answerExplanation: questionData.answer.explanation,
          complexity: questionData.complexity,
          type:questionData.answer.type,
          topicId: questionData.topicId,
          createdById: userId,
          }
      }),
      },
    ).catch(e => console.log(e));
    return questions;
  }

  async function getQuestions(topicId:number) {
    const db = makeDb();
    const questions = await db.question.findMany({
      where: {
        topicId,
        isActive: true,
      },
      select: {
        answer: true,
        answerExplanation: true,
        complexity: true,
        description: true,
        id: true,
        type: true,
        topicId: true,
        isActive: true,
        options: {
          select:{
            description: true,
            isAnswer: true,
          }
        },
      },
      orderBy: {
        updatedAt: "desc",
      }
    });
    return questions.filter(question => question.isActive);
  }

  async function getManyQuestions(ids:number[]) {
    const db = makeDb();
    const questions = await db.question.findMany({
      where: {
        id:{in: ids},
        isActive: true,
      },
      select: {
        answer: true,
        answerExplanation: true,
        complexity: true,
        description: true,
        id: true,
        type: true,
        topicId: true,
        options: {
          select:{
            description: true,
            isAnswer: true,
          }
        },
      },
      orderBy: {
        updatedAt: "desc",
      }
    });
    return questions;
  }

  async function getQuestion(id:number) {
    const db = makeDb();
    const questions = await db.question.findUnique({
      where: {
        id,
        isActive: true,
      },
      select: {
        answer: true,
        answerExplanation: true,
        complexity: true,
        description: true,
        id: true,
        type: true,
        topicId: true,
        options: {
          select:{
            description: true,
            isAnswer: true,
          }
        },
      }
    });
    return questions;
  }

  async function getAnswer(id:number) {
    const db = makeDb();
    const question = await db.question.findUnique({
      where: {
        id,
      },
      select: {
        type: true,
        answer: true,
        options: {
          select: {
            description: true,
            isAnswer: true,
          }
        }
      }
    })

    if(question.type === "multipleChoice")
      return question.options.find(opt => opt.isAnswer).description;

    console.log({question});

    return question.answer;
  }

  async function getAllQuestions() {
    const db = makeDb();
    const questions = await db.question.findMany({
      where: {
        isActive: true,
      },
      select: {
        id: true,
        description: true,
        topic: {
          select: {
            name: true,
            description: true,
            id: true,
          }
        }
      },
      orderBy: {
        updatedAt: "desc",
      }
    })
    return questions;
  }

  async function editQuestion({questionData, userId}:{questionData: IQuestionAndAnswer, userId:number}) {
    const db = makeDb();
    await db.option.deleteMany({
      where: {
        questionId: questionData.questionId,
      },
    })

    const question = await db.question.update({
      where: {
        id:questionData.questionId
      },
      data: {
        description: questionData.question,
        answer: questionData.answer.description,
        answerExplanation: questionData.answer.explanation,
        complexity: questionData.complexity,
        type:questionData.answer.type,
        options: {
          createMany:{
            data:  questionData.answer.options.map(opt => {
              return {
                description:opt.description,
                isAnswer:opt.isCorrect,
                createdById: userId
              }
            }),
            }
          }
        },
    });
    return question;
  }

  async function isQuestionPresentInAnyExam(questionId:number) {
    const db = makeDb();
    const examCount = await db.exam.count({
      where: {
        questions: {
          some: {
            id: questionId,
          },
        },
      },
    });

    return examCount > 0;
  }

  async function deleteQuestion(id: number) {
    const db = makeDb();
    const isPresent = await isQuestionPresentInAnyExam(id);
    let question;
    if(isPresent){
      question = await db.question.update({
        where: {id},
        data: {
          isActive: false,
        }
      })
      return question;
    }
    question = await db.question.delete({
      where: {
        id
      }
    })
    return question;
  }

  async function deleteQuestions(ids:number[]) {
    const db = makeDb();
    const data = await db.question.findUnique({
      where: {
        id: ids[0],
      },
      select:{
        topicId: true,
      }
    })

    await Promise.all(ids.map(async(id) => {
      await deleteQuestion(id);
    }))

    return data.topicId;
  }

  return { createQuestion, getAllQuestions, deleteQuestion, editQuestion, getQuestions, getQuestion, createManyQuestions,getManyQuestions, deleteQuestions, getAnswer };
}