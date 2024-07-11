import mongoose from 'mongoose';
// import { trim } from 'validator';

const itemSchema = mongoose.Schema(
  {
    imageURL: {
      type: String,
      required: true,
      trim: true,
      default: 'path/to/your/image',
    },
    description: {
      type: String,
      required: true,
      trim: true,
      default: 'no match',
    },
    AppwriteImageID:{
      type:String,
      required:true,
      trim:true,
      default: 'no match',
    }
    ,
    location: {
      type: String,
      required: true,
      trim: true,
      default: 'no match',
    },
    status: {
      type: String,
      enum: ['no match','pending claim', 'claim approved', 'further verification required'],
      required: true,
      default: 'no match',
    },
    type: {
      type: String,
      enum: ['lost', 'found'],
      required: true,
      default:'found'
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    userId: {
      type:String,
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
