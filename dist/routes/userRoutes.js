"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const express_callback_1 = __importDefault(require("../util/express-callback"));
const userRouter = express_1.default.Router();
userRouter.post("/signup", (0, express_callback_1.default)(userController_1.signup));
userRouter.post("/signin", (0, express_callback_1.default)(userController_1.signin));
userRouter.post("/externalSignin", (0, express_callback_1.default)(userController_1.externalSignin));
userRouter.delete("/signout", (0, express_callback_1.default)(userController_1.signout));
userRouter.get("/authcheck", (0, express_callback_1.default)(userController_1.authCheck));
userRouter.post("/update", (0, express_callback_1.default)(userController_1.updateUser));
userRouter.post("/updatePassword", (0, express_callback_1.default)(userController_1.updatePassword));
exports.default = userRouter;
//# sourceMappingURL=userRoutes.js.map