import mongoose from 'mongoose';

const historySchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item', // Reference to the Item model
    },
    actionType: {
      type: String,
      enum: ['upload', 'search'],
      required: true,
    },
    details: {
      type: String,
      trim: true,
    },
    recovered: {
      type: Boolean,
      default: false, // Default to false if not specified
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const History = mongoose.model('History', historySchema);

export default History;
