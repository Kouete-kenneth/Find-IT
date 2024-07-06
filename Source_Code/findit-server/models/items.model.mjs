import mongoose from 'mongoose';

const itemSchema = mongoose.Schema(
  {
    imageURL: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['no match','pending claim', 'claim approved', 'further verification required'],
      required: true,
      default: 'pending claim',
    },
    type: {
      type: String,
      enum: ['lost', 'found'],
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef Item
 */
const Item = mongoose.model('Item', itemSchema);

export default Item;
