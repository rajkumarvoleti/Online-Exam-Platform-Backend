import { createQuestionData } from "../handlers/questionHandler";
import { questionDb } from "../db";
import { IQuestionAndAnswer } from "../interfaces/exam";
import { IHttpRequest } from "../interfaces/http";

export const createQuestion = async (req: IHttpRequest) => {
  const {questionData, userId} = req.body;

  const res = await questionDb.createQuestion({ questionData, userId });

  const question:IQuestionAndAnswer = createQuestionData(res);

  return {
    statusCode: 201,
    headers: {
      'Content-Type': 'application/json',
    },
    body: { question }
  }
}

export const createQuestions = async (req:IHttpRequest) => {
  const questionsData:IQuestionAndAnswer[] = req.body.questionsData;
  const userId = req.body.userId;
  questionsData.forEach(async (questionData:IQuestionAndAnswer) => {
    await questionDb.createQuestion({questionData,userId});
  });
  return {
    statusCode: 201,
    headers: {
      'Content-Type': 'application/json',
    },
    body: { msg: "created successfully", topicId:questionsData[0].topicId }
  }
}

export const updateQuestion = async (req: IHttpRequest) => {
  const data = req.body;
  const userId = req.body.userId;
  const questionData: IQuestionAndAnswer = {
    questionId: data.id,
    question: data.questionData.question,
    answer: {
      description: data.questionData.answer.description,
      explanation: data.questionData.answer.explanation,
      options: data.questionData.answer.options,
      type: data.questionData.answer.type,
    },
    complexity: data.questionData.complexity,
    topicId: data.questionData.topicId
  }
  const question = await questionDb.editQuestion({questionData, userId});
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: { question }
  }
}

export const getQuestions = async (req:IHttpRequest) => {
  const id = JSON.parse(req.query.topicId);
  if (!id) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: { msg: "Invalid request. Id is not present" }
    }
  }
  const questionsData = await questionDb.getQuestions(id);
  const questions:IQuestionAndAnswer[] = questionsData.map((res,i) => {return {question: res.description,
    questionId: res.id,
    questionNumber: i+1,
    answer: {
      description: res.answer,
      explanation: res.answerExplanation,
      options: res.options.map(opt => {return {description: opt.description,isCorrect:opt.isAnswer}}),
      type: res.type,
    },
    complexity:res.complexity,
    topicId:res.topicId,
  }})
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: { questions }
  };
}

export const getQuestion = async (req:IHttpRequest) => {
  const id = JSON.parse(req.query.questionId);
  console.log(id);
  if (!id) {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: { msg: "Invalid request. Id is not present" }
    }
  }
  const res = await questionDb.getQuestion(id);
  const question = {question: res.description,
    questionId: res.id,
    answer: {
      description: res.answer,
      explanation: res.answerExplanation,
      options: res.options.map(opt => {return {description: opt.description,isCorrect:opt.isAnswer}}),
      type: res.type,
    },
    complexity:res.complexity,
    topicId:res.topicId,
  }
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: { question }
  };
}

export const deleteQuestion = async (req: IHttpRequest) => {
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
  const question = await questionDb.deleteQuestion(id);
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: { msg: "Deleted Successfully", question }
  };
}

export const deleteQuestions = async (req:IHttpRequest) => {
  const ids:number[] = req.body.ids;
  const topicId = await questionDb.deleteQuestions(ids);
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: { msg: "Deleted Successfully", topicId }
  };
}