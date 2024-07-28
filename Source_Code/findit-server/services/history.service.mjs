import History from '../models/history.model.mjs';

/**
 * Create a new history record
 * @param {object} historyBody
 * @returns {Promise<object>}
 */
const createHistory = async (historyBody) => {
  try {
    const history = await History.create(historyBody);
    return history;
  } catch (error) {
    console.error('Error saving history:', error.message);
    throw new Error('Error saving history');
  }
};

/**
 * Get all history records for a user
 * @param {ObjectId} userId
 * @returns {Promise<Array>}
 */
const getHistoryByUserId = async (userId) => {
  try {
    const histories = await History.find({ userId });
    if (histories) {
      return histories;
    } else {
      throw new Error(`Could not find history for userId: ${userId}`);
    }
  } catch (error) {
    console.error('Error fetching history:', error.message);
    throw new Error('Error fetching history');
  }
};

export { createHistory, getHistoryByUserId };
