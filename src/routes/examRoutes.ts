import express from 'express';
import makeExpressCallback from '../util/express-callback';
import { createExam, deleteAllExams, getAllExams, getExam, getResult } from '../controllers/examController';

const examRouter = express.Router();

examRouter.get("/getAll", makeExpressCallback(getAllExams));
examRouter.get("/get", makeExpressCallback(getExam));
examRouter.get("/getResult", makeExpressCallback(getResult));
examRouter.post("/create", makeExpressCallback(createExam));
examRouter.delete("/deleteAll", makeExpressCallback(deleteAllExams));

export default examRouter;