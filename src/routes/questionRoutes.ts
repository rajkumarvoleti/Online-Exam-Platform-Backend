import express from 'express';
import makeExpressCallback from '../util/express-callback';
import { createQuestion, updateQuestion, deleteQuestion, getQuestions, getQuestion, createQuestions, deleteQuestions } from '../controllers/questionController';

const questionRouter = express.Router();

questionRouter.post("/create", makeExpressCallback(createQuestion));
questionRouter.post("/createMany", makeExpressCallback(createQuestions));
questionRouter.post("/update", makeExpressCallback(updateQuestion));
questionRouter.get("/getByTopicId", makeExpressCallback(getQuestions));
questionRouter.get("/getByQuestionId", makeExpressCallback(getQuestion));
questionRouter.delete("/delete", makeExpressCallback(deleteQuestion));
questionRouter.delete("/deleteMany", makeExpressCallback(deleteQuestions));

export default questionRouter;