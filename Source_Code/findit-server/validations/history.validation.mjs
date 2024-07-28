import Joi from 'joi';
import {objectId} from './custom.validation.mjs';

const createHistoryValidation = {
  body: Joi.object({
    userId: Joi.string().required().custom(objectId),
    itemId: Joi.string().optional().custom(objectId), 
    actionType: Joi.string().valid('upload', 'search').required(),
    details: Joi.string().optional(),
    recovered: Joi.boolean().optional(),
  }),
};

const getHistoryByUserIdValidation = {
  params: Joi.object({
    userId: Joi.string().required().custom(objectId).message('user id is required'),
  }),
};

export { createHistoryValidation, getHistoryByUserIdValidation };
