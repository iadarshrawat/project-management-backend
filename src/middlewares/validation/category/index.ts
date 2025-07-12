import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { sendResponse } from '../../../common';
import { MESSAGE } from '../../../lib';
import { getAllCategories } from '../../../services';

const categoryValidation = async (req: Request, res: Response, next: NextFunction, isUpdate = false) => {
  try {
    // @ts-ignore
    const userId = req.user?.id;
    const currentCategoryId = req.params.categoryId;

    const categories = await getAllCategories({ userId });
    const categoryNames = categories
      .filter(category => !isUpdate || category._id.toString() !== currentCategoryId)
      .map(category => category.name.toLowerCase());

    const categorySchema = Joi.object({
      name: Joi.string()
        .trim()
        .min(3)
        .max(50)
        .custom((value, helpers) => {
          if (categoryNames.includes(value.toLowerCase())) {
            return helpers.message({custom: 'Category name already exists'});
          }
          if (value.toLowerCase() === MESSAGE.DEFAULT_CATEGORY_NAME.toLowerCase()) {
            return helpers.message({custom: `Category name cannot be ${MESSAGE.DEFAULT_CATEGORY_NAME}`});
          }

          return value;
        })
        .required()
        .messages({
          'string.base': 'Category name must be a string',
          'string.empty': 'Category name is required',
          'string.min': 'Category name must be at least 3 characters long',
          'string.max': 'Category name cannot exceed 50 characters',
          'any.required': 'Category name is required'
        }),

      description: Joi.string()
        .trim()
        .allow('')
        .max(255)
        .messages({
          'string.max': 'Description cannot exceed 255 characters'
        })
    });

    const { error } = categorySchema.validate(req.body, { abortEarly: false });

    if (error) {
      return sendResponse(res, 400, error.toString());
    }

    next();
  } catch (err: any) {
    return sendResponse(res, 500, err.message);
  }
};

export const createCategoryValidation = categoryValidation;
export const updateCategoryValidation = (req: Request, res: Response, next: NextFunction) => categoryValidation(req, res, next, true);
