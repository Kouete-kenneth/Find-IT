import mongoose from 'mongoose';
import validator from 'validator';
const emailSchema = mongoose.Schema(
  {
    to: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    from: {
      type: String,
      required: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Invalid email');
        }
      },
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
      default:'anonymous'
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef Email
 */
const Email = mongoose.model('Email', emailSchema);

export default Email;
