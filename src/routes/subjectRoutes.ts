import express from 'express';
import makeExpressCallback from '../util/express-callback';
import { createSubject, getAllSubjects, deleteSubject, updateSubject, getSubject, getAllQuestionBanks, createSubjectAndTopics } from '../controllers/subjectController';

const subjectRouter = express.Router();

subjectRouter.post("/create", makeExpressCallback(createSubject));
subjectRouter.post("/create2", makeExpressCallback(createSubjectAndTopics));
subjectRouter.post("/update", makeExpressCallback(updateSubject));
subjectRouter.get("/getAll", makeExpressCallback(getAllSubjects));
subjectRouter.get("/get", makeExpressCallback(getSubject));
subjectRouter.get("/getQuestionBanks", makeExpressCallback(getAllQuestionBanks));
subjectRouter.delete("/delete", makeExpressCallback(deleteSubject));

export default subjectRouter;