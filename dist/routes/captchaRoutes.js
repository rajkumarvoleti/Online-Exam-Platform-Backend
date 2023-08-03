"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const captchaController_1 = require("../controllers/captchaController");
const captchaRouter = express_1.default.Router();
captchaRouter.post("/check", captchaController_1.validateToken);
exports.default = captchaRouter;
//# sourceMappingURL=captchaRoutes.js.map