"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_callback_1 = __importDefault(require("../util/express-callback"));
const subjectController_1 = require("../controllers/subjectController");
const subjectRouter = express_1.default.Router();
subjectRouter.post("/create", (0, express_callback_1.default)(subjectController_1.createSubject));
subjectRouter.post("/update", (0, express_callback_1.default)(subjectController_1.updateSubject));
subjectRouter.get("/getAll", (0, express_callback_1.default)(subjectController_1.getAllSubjects));
subjectRouter.delete("/delete", (0, express_callback_1.default)(subjectController_1.deleteSubject));
exports.default = subjectRouter;
//# sourceMappingURL=subjectRoutes.js.map