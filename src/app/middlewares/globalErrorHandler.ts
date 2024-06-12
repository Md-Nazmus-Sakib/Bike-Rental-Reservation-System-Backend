import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError, ZodIssue } from 'zod';
import handleZodError from '../errors/handleZodError';
import { TErrorSources } from '../interface/error';
import config from '../config';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // Default Value
  let statusCode = 500;
  let message = 'Something Went Wrong !';

  // default message
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something Went Wrong',
    },
  ];
  //Zod Error Handler
  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }
  //Mongoose Error Handler
  else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }
  //Unknown route Cast Error Handler
  else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }
  //Final Return is below

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;
