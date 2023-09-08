import express from 'express';
import makeExpressCallback from '../util/express-callback';
import { createTopic, deleteTopic, getTopic, getTopics, getTopicsFromTopicId, updateTopic } from '../controllers/topicController';

const topicRouter = express.Router();

topicRouter.post("/create", makeExpressCallback(createTopic));
topicRouter.post("/update", makeExpressCallback(updateTopic));
topicRouter.get("/getAll", makeExpressCallback(getTopics));
topicRouter.get("/get", makeExpressCallback(getTopic));
topicRouter.get("/getTopicsFromTopicId", makeExpressCallback(getTopicsFromTopicId));
topicRouter.delete("/delete", makeExpressCallback(deleteTopic));

export default topicRouter;