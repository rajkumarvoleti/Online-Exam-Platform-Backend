"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_callback_1 = __importDefault(require("../util/express-callback"));
const questionController_1 = require("../controllers/questionController");
const questionRouter = express_1.default.Router();
questionRouter.post("/create", (0, express_callback_1.default)(questionController_1.createQuestion));
questionRouter.post("/createMany", (0, express_callback_1.default)(questionController_1.createQuestions));
questionRouter.post("/update", (0, express_callback_1.default)(questionController_1.updateQuestion));
questionRouter.get("/getByTopicId", (0, express_callback_1.default)(questionController_1.getQuestions));
questionRouter.get("/getByQuestionId", (0, express_callback_1.default)(questionController_1.getQuestion));
questionRouter.delete("/delete", (0, express_callback_1.default)(questionController_1.deleteQuestion));
questionRouter.delete("/deleteMany", (0, express_callback_1.default)(questionController_1.deleteQuestions));
exports.default = questionRouter;
//# sourceMappingURL=questionRoutes.js.map