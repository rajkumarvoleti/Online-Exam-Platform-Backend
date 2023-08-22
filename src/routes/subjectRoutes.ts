import express from 'express';
import makeExpressCallback from '../util/express-callback';
import { createSubject, getAllSubjects, deleteSubject, updateSubject, getSubject } from '../controllers/subjectController';

const subjectRouter = express.Router();

subjectRouter.post("/create", makeExpressCallback(createSubject));
subjectRouter.post("/update", makeExpressCallback(updateSubject));
subjectRouter.get("/getAll", makeExpressCallback(getAllSubjects));
subjectRouter.get("/get", makeExpressCallback(getSubject));
subjectRouter.delete("/delete", makeExpressCallback(deleteSubject));

export default subjectRouter;