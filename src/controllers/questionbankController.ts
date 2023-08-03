
// import { Request, Response } from 'express';
// import { QuestionModel } from '../models/questionbank';

// export const createQuestion = async (req: Request, res: Response) => {
//   try {
//     const { text, type, options, images } = req.body;

//     if (!text || !type || !options || options.length === 0) {
//       return res.status(400).json({ message: 'Insufficient input data' });
//     }

//     const question = {
//       text,
//       type,
//       options,
//       images,
//     };

//     const createdQuestion = await QuestionModel.create(question);

//     res.status(201).json({ message: 'Question created successfully', question: createdQuestion });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };

// export const getQuestions = async (req: Request, res: Response) => {
//   try {
//     const numberOfQuestions: number = Number(req.query.number);

//     const questions = await QuestionModel.aggregate([
//       { $sample: { size: numberOfQuestions } },
//       { $unset: 'options.isAnswer' }
//     ]);

//     if (!Number.isInteger(numberOfQuestions) || numberOfQuestions <= 0) {
//       throw new Error('Number of questions must be a positive integer');
//     }

//     if (questions.length < numberOfQuestions) {
//       throw new Error('Insufficient number of questions in the database');
//     }

//     res.json(questions);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };