import axios from 'axios';
import { Request, Response } from 'express';

export const validateToken = async (req: Request,res: Response) => {
    const { token } = req.body;

    try {
      const response = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.CAPTCHA_SERVER_KEY}&response=${token}`
      );
      console.log(response);
      if (response.data.success) {
        res.send("Human");
      } else {
        res.send("Robot");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Error verifying reCAPTCHA");
    }
}