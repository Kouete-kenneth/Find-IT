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
    name:{
      type: String,
      required: true,
      trim: true,
    },
    missingLocation: {
        type: String,
        required: true,
        trim: true,
    },
    currentLocation: {
      townOrVillage: {
        type: String,
        required: function() {
          return this.type === 'found'; // Only required if type is 'found'
        },
        trim: true,
      },
      quarter: {
        type: String,
        required: function() {
          return this.type === 'found'; // Only required if type is 'found'
        },
        trim: true,
      },
      specificPlace: {
        type: String,
        required: function() {
          return this.type === 'found'; // Only required if type is 'found'
        },
        trim: true,
      },
    },
    contactPersonContact: {
      type: String,
      required: true,
      trim: true,
      default: 'no match',
    },
    status: {
      type: String,
      enum: ['no match', 'pending claim', 'claim approved', 'further verification required'],
      required: true,
      default: 'no match',
    },
    type: {
      type: String,
      enum: ['lost', 'found'],
      required: true,
      default: 'found',
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    userId: {
      type: String,
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
