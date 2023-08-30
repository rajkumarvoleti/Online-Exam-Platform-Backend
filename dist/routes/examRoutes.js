"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_callback_1 = __importDefault(require("../util/express-callback"));
const examController_1 = require("../controllers/examController");
const examRouter = express_1.default.Router();
examRouter.get("/getAll", (0, express_callback_1.default)(examController_1.getAllExams));
examRouter.get("/get", (0, express_callback_1.default)(examController_1.getExam));
examRouter.get("/getResult", (0, express_callback_1.default)(examController_1.getResult));
examRouter.post("/create", (0, express_callback_1.default)(examController_1.createExam));
examRouter.delete("/deleteAll", (0, express_callback_1.default)(examController_1.deleteAllExams));
exports.default = examRouter;
//# sourceMappingURL=examRoutes.js.map