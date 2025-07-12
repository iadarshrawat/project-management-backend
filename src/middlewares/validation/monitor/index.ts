import { NextFunction, Request, RequestHandler, Response } from 'express';
import Joi from 'joi';
import { sendResponse } from '../../../common';
import { MESSAGE } from '../../../lib';
import { getAllCategories } from '../../../services';

export const createMonitorValidation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const userId = req.user?.id;
    const categories =  await getAllCategories({ userId });
    const categoryNames = categories.map(category => category.name);

    const createMonitorSchema = Joi.object({
          url: Joi.string()
            .uri()
            .required()
            .messages({
              'string.uri': 'URL must be a valid URI',
              'any.required': 'URL is required'
          }),

          urlName: Joi.string()
            .min(3)
            .messages({
              'string.min': 'URL Name must be at least 3 characters'
          }),

          interval: Joi.number()
            .integer()
            .min(60)
            .messages({
              'number.min': 'Interval must be at least 60 seconds'
          }),

          timeout: Joi.number()
            .integer()
            .min(1)
            .max(30)
            .messages({
              'number.min': 'Timeout must be at least 1 second',
              'number.max': 'Timeout must be less than or equal to 30 seconds'
            }),

          notify: Joi.boolean()
            .default(false)
            .messages({
              'boolean.base': 'Notify must be a boolean value'
          }),

          chatUrl: Joi.alternatives()
            .conditional('notify', {
              is: true,
              then: Joi.array()
                .items(
                  Joi.string()
                    .uri()
                    .required()
                    .messages({
                      'string.uri': 'Each chat URL must be a valid URI'
                    })
                )
            .max(5)
            .unique()
            .min(1)
            .required()
            .messages({
              'array.base': 'chatUrl must be an array of URLs',
              'array.min': 'At least one chat URL is required when notify is true',
              'array.unique': 'Duplicate chat URLs are not allowed'
            }),
              otherwise: Joi.array()
              .max(0)
              .messages({
                'array.base': 'chatUrl must be an array',
                'array.max': 'chatUrl must be empty when notify is false'
            })
          }),

          isPaused: Joi.boolean()
            .default(false)
            .messages({
              'boolean.base': 'isPaused must be a boolean value'
          }),
          categoryName: Joi.string()
            .valid(...categoryNames, MESSAGE.DEFAULT_CATEGORY_NAME)
            .default(MESSAGE.DEFAULT_CATEGORY_NAME)
            .messages({
              'any.only': `Invalid category name. Choose an existing category or use ${MESSAGE.DEFAULT_CATEGORY_NAME}.`
            })
      })
      .custom((value, helpers) => {
        if (value.interval <= value.timeout) {
          return helpers.message({ custom: 'Interval must be greater than timeout' });
        }

        return value;
      }, 'Custom validation for interval vs timeout');

    const { error } = createMonitorSchema.validate(req.body, { abortEarly: false });
    const errorMessage: any = error?.details.map(err => err.message);
    if (error) {
      return sendResponse(res, 400, errorMessage);
    }

    next();
  } catch (err: any) {
    return sendResponse(res, 500, err.message);
  }
};
