import express, { Request, Response } from "express";
import 'dotenv/config';
import cors from 'cors';
import userRouter from "./routes/userRoutes";
import { appSession as session } from "./session";
import { developmentErrors, notFound, productionErrors } from './handlers/errorHandlers';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.FRONTEND_URL,
}))
app.use(session);

app.use("/api/users", userRouter);

app.get( "/", ( req: Request, res: Response ) => {
    res.send( `Hello world! ${process.env.PROJECT_NAME}` );
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