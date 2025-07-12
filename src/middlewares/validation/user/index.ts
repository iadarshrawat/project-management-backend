import { NextFunction, Request, RequestHandler, Response } from 'express';
import Joi from 'joi';

export const userSignupValidation = (req: Request, res: Response, next: NextFunction) => {
  const userSignupSchema = Joi.object({
    name: Joi.string()
      .min(3)
      .max(30)
      .required()
      .messages({
        'string.base': 'Name should be a string.',
        'string.empty': 'Name is required.',
        'string.min': 'Name should have at least 3 characters.',
        'string.max': 'Name should not exceed 30 characters.',
        'any.required': 'Name is required.'
    }),
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'Invalid email format.',
        'string.empty': 'Email is required.',
        'any.required': 'Email is required.'
    }),
    password: Joi.string()
      .min(8)
      .max(20)
      .pattern(
        new RegExp(
          '^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
        )
      )
      .required()
      .messages({
        'string.empty': 'Password is required.',
        'string.min': 'Password should be at least 8 characters.',
        'string.max': 'Password should not exceed 20 characters.',
        'string.pattern.base':
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
        'any.required': 'Password is required.'
      })
  });

  const { error } = userSignupSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res
      .status(400)
      .json({ errors: error.details.map(err => err.message) });
  }

  next();
};

export const userLoginValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userLoginSchema = Joi.object({
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'Invalid email format.',
        'string.empty': 'Email is required.',
        'any.required': 'Email is required.'
    }),
    password: Joi.string()
      .required()
      .messages({
        'string.empty': 'Password is required.',
        'any.required': 'Password is required.'
    })
  });
  const { error } = userLoginSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res
      .status(400)
      .json({ errors: error.details.map(err => err.message) });
  }
  next();
};

export const verifyOtpValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const verifyOtpSchema = Joi.object({
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'Invalid email format.',
        'string.empty': 'Email is required.',
        'any.required': 'Email is required.'
    }),
    otp: Joi.string()
      .required()
      .messages({
        'string.empty': 'OTP is required.',
        'any.required': 'OTP is required.'
    })
  });
  const { error } = verifyOtpSchema
    .validate(req.body, { abortEarly: false });
  if (error) {
    return res
      .status(400)
      .json({ errors: error.details.map(err => err.message) });
  }
  next();
};

export const requestOtpValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const requestOtpSchema = Joi.object({
    email: Joi.string()
      .email()
      .required()
      .messages({
        'string.email': 'Invalid email format.',
        'string.empty': 'Email is required.',
        'any.required': 'Email is required.'
    })
  });
  const { error } = requestOtpSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res
      .status(400)
      .json({ errors: error.details.map(err => err.message) });
  }
  next();
};

export const resetPasswordValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const resetPasswordSchema = Joi.object({
    newPassword: Joi.string()
      .min(8)
      .max(20)
      .pattern(
        new RegExp(
          '^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
        )
      )
      .required()
      .messages({
        'string.empty': 'Password is required.',
        'string.min': 'Password should be at least 8 characters.',
        'string.max': 'Password should not exceed 20 characters.',
        'string.pattern.base':
          'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
        'any.required': 'Password is required.'
      }),
    tempToken: Joi.string()
      .required()
      .messages({
      'string.empty': 'Temporary token is required.'
    })
  });
  const { error } = resetPasswordSchema
    .validate(req.body, { abortEarly: false });
  if (error) {
    return res
      .status(400)
      .json({ errors: error.details.map(err => err.message) });
  }
  next();
};
