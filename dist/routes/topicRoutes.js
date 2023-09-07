"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_callback_1 = __importDefault(require("../util/express-callback"));
const topicController_1 = require("../controllers/topicController");
const topicRouter = express_1.default.Router();
topicRouter.post("/create", (0, express_callback_1.default)(topicController_1.createTopic));
topicRouter.post("/update", (0, express_callback_1.default)(topicController_1.updateTopic));
topicRouter.get("/getAll", (0, express_callback_1.default)(topicController_1.getTopics));
topicRouter.get("/get", (0, express_callback_1.default)(topicController_1.getTopic));
topicRouter.delete("/delete", (0, express_callback_1.default)(topicController_1.deleteTopic));
exports.default = topicRouter;
//# sourceMappingURL=topicRoutes.js.map