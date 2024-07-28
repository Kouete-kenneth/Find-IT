import Joi from "joi";
/**
 * Validation schema for creating an Cart
 */

const createFAQValidation = {
  body: Joi.object({
    question: Joi.string().required(),
    answer: Joi.string().required(),
  }),
};

/**
 * Validation schema for updating FAQ
 */
const updateFAQValidation = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
  body: Joi.object()
    .keys({
      question: Joi.string().trim().messages({
        'string.base': `Question must be a string`,
        'string.empty': `Question cannot be an empty field`,
      }),
      answer: Joi.string().trim().messages({
        'string.base': `Answer must be a string`,
        'string.empty': `Answer cannot be an empty field`,
      }),
    })
    .min(1).message('atleast one field needs to be updated'), // At least one field in body must be present
};

/**
 * Validation schema for deleting FAQ
 */
const deleteFAQValidation = {
  params: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

export { createFAQValidation, updateFAQValidation,deleteFAQValidation};
