"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTopic = exports.updateTopic = exports.getTopics = exports.createTopic = void 0;
const db_1 = require("../db");
const createTopic = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const topicData = {
        name: data.topicData.name,
        description: data.topicData.description,
        subjectId: data.topicData.subjectId
    };
    const topic = yield db_1.topicDb.createTopic({ topicData, userId: data.userId });
    return {
        statusCode: 201,
        headers: {
            'Content-Type': 'application/json',
        },
        body: { topic }
    };
});
exports.createTopic = createTopic;
const getTopics = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { subjectId } = req.query;
    const data = yield db_1.topicDb.getTopics({ subjectId: parseInt(subjectId, 10) });
    const topics = data.map(topic => {
        return {
            description: topic.description,
            name: topic.name,
            subjectId: topic.subjectId,
            id: topic.id,
            questionsCount: topic._count.questions
        };
    });
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
        },
        body: { topics }
    };
});
exports.getTopics = getTopics;
const updateTopic = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const { topicData, id } = req.body;
    const topic = db_1.topicDb.editTopic({ topicData, id });
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
        },
        body: { topic }
    };
});
exports.updateTopic = updateTopic;
const deleteTopic = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.body.id;
    if (!id) {
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
            },
            body: { msg: "Invalid request. Id is not present" }
        };
    }
    const topic = yield db_1.topicDb.deleteTopic(id);
    return {
        statusCode: 200,
        headers: {
            'Content-Type': 'application/json',
        },
        body: { msg: "Deleted Successfully", topic }
    };
});
exports.deleteTopic = deleteTopic;
//# sourceMappingURL=topicController.js.map