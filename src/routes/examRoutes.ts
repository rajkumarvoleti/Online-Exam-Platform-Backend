import express from 'express';
import makeExpressCallback from '../util/express-callback';
import { createExam, deleteAllExams, deleteManyExams, editExam, getAllExams, getExam, getExamData, getResult } from '../controllers/examController';

const examRouter = express.Router();

examRouter.get("/getAll", makeExpressCallback(getAllExams));
examRouter.get("/get", makeExpressCallback(getExam));
examRouter.get("/getExamData", makeExpressCallback(getExamData));
examRouter.get("/getResult", makeExpressCallback(getResult));
examRouter.post("/create", makeExpressCallback(createExam));
examRouter.post("/edit", makeExpressCallback(editExam));
examRouter.delete("/deleteAll", makeExpressCallback(deleteAllExams));
examRouter.delete("/deleteMany", makeExpressCallback(deleteManyExams));

export default examRouter;