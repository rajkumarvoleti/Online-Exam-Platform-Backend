"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const session_1 = require("./session");
const errorHandlers_1 = require("./handlers/errorHandlers");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const subjectRoutes_1 = __importDefault(require("./routes/subjectRoutes"));
const topicRoutes_1 = __importDefault(require("./routes/topicRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
}));
app.use(session_1.appSession);
app.use("/api/users", userRoutes_1.default);
app.use("/api/subject", subjectRoutes_1.default);
app.use("/api/topic", topicRoutes_1.default);
app.get("/", (req, res) => {
    res.send(`Hello world! ${process.env.PROJECT_NAME}`);
});
app.use(errorHandlers_1.notFound);
if (process.env.NODE_ENV === "development") {
    app.use(errorHandlers_1.developmentErrors);
}
app.use(errorHandlers_1.productionErrors);
const port = process.env.PORT || "7777";
app.listen(port, () => {
    console.log("server started");
});
//# sourceMappingURL=index.js.map