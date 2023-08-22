import express from 'express';
import makeExpressCallback from '../util/express-callback';
import { createExam, deleteAllExams, getAllExams, getExam } from '../controllers/examController';

const examRouter = express.Router();

examRouter.get("/getAll", makeExpressCallback(getAllExams));
examRouter.get("/get", makeExpressCallback(getExam));
examRouter.post("/create", makeExpressCallback(createExam));
examRouter.delete("/deleteAll", makeExpressCallback(deleteAllExams));

export default examRouter;