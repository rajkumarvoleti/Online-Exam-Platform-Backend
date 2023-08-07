import express, { Request, Response } from "express";
import 'dotenv/config';
import cors from 'cors';
import userRouter from "./routes/userRoutes";
import { appSession as session } from "./session";
import { developmentErrors, notFound, productionErrors } from './handlers/errorHandlers';
import cookieParser from 'cookie-parser';
import subjectRouter from "./routes/subjectRoutes";
import topicRouter from "./routes/topicRoutes";

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
}))
app.use(session);

app.use("/api/users", userRouter);
app.use("/api/subject", subjectRouter);
app.use("/api/topic", topicRouter);

app.get("/", (req: Request, res: Response) => {
    res.send(`Hello world! ${process.env.PROJECT_NAME}`);
});

app.use(notFound);

if (process.env.NODE_ENV === "development") {
    app.use(developmentErrors);
}

app.use(productionErrors);

const port: string = process.env.PORT || "7777";

app.listen(port, () => {
    console.log("server started");
});