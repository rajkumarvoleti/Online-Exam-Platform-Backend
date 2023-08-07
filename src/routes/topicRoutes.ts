import express from 'express';
import makeExpressCallback from '../util/express-callback';
import { createTopic, deleteTopic, getTopics, updateTopic } from '../controllers/topicController';

const topicRouter = express.Router();

topicRouter.post("/create", makeExpressCallback(createTopic));
topicRouter.post("/update", makeExpressCallback(updateTopic));
topicRouter.get("/getAll", makeExpressCallback(getTopics));
topicRouter.delete("/delete", makeExpressCallback(deleteTopic));

export default topicRouter;