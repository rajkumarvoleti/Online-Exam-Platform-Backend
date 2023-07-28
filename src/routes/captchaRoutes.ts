import express from 'express';
import { validateToken } from '../controllers/captchaController';

const captchaRouter = express.Router();

captchaRouter.post("/check",validateToken);

export default captchaRouter;