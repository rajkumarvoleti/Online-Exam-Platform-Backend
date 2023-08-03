import { Request, Response, NextFunction } from 'express';

export const catchErrors = (fn:any) => {
  return (req:Request, res:Response, next:NextFunction) => {
    return fn(req, res, next).catch(next);
  };
};

export const notFound = (req:Request, res:Response, next:NextFunction) => {
  const err:any = new Error('Not Found');
  err.status = 404;
  next(err);
};

export const developmentErrors = (err:any, req:Request, res:Response, next:NextFunction) => {
  err.stack = err.stack || '';
  const errorDetails = {
    message: err.message,
    status: err.status,
    stackHighlighted: err.stack.replace(/[a-z_-\d]+.js:\d+:\d+/gi, '<mark>$&</mark>')
  };
  console.log(errorDetails);
  res.status(err.status || 500);
  res.json({errorDetails});
};


/*
  Production Error Handler

  No stacktraces are leaked to user
*/
export const productionErrors = (err:any, req:Request, res:Response, next:NextFunction) => {
  res.status(err.status || 500);
  res.json({message:err.message});
};

