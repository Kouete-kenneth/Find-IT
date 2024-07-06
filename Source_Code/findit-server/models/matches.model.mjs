import mongoose from 'mongoose';

const matchSchema = mongoose.Schema(
  {
    lostItemId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'items',
    },
    foundItemId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'items',
    },
    matchScore: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending claim', 'claim approved', 'further verification required'],
      default: 'pending claim',
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef Match
 */
const Match = mongoose.model('Match', matchSchema);

export default Match;
