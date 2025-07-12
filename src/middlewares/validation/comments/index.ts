import { NextFunction, Request, RequestHandler, Response } from 'express';
import Joi from 'joi';
import { sendResponse } from '../../../common';

export const createCommentValidation = (req: Request, res: Response, next: NextFunction) => {
  const commentSchema = Joi.object({
    commentText: Joi.string()
      .trim()
      .max(500)
      .required(),
    commentTag: Joi.string()
      .required()
      .valid('Monitoring', 'Update', 'Investigating')
  });

  const { error } = commentSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessage: any = error.details.map(err => err.message);

    return sendResponse(res, 400, errorMessage);
  }

  next();
};

export const updateCommentValidation = (req: Request, res: Response, next: NextFunction) => {
  const commentSchema = Joi.object({
    commentText: Joi.string()
      .trim()
      .max(500)
      .optional(),

    commentTag: Joi.string()
      .valid('Monitoring', 'Update', 'Investigating')
      .optional()
  });

  const { error } = commentSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errorMessage: any = error.details.map(err => err.message);

    return sendResponse(res, 400, errorMessage);
  }

  next();
};
