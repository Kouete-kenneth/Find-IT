import mongoose from 'mongoose';

const locationSchema = mongoose.Schema(
  {
    itemId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Item', // Assuming there is an Item model
    },
    latitude: {
      type: String,
      required: true,
    },
    longitude: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef Location
 */
const Location = mongoose.model('Location', locationSchema);

export default Location;
