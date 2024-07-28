import httpStatus from 'http-status';
import ApiError from '../utils/ApiError.mjs';
import { createHistory, getHistoryByUserId } from '../services/history.service.mjs';

/**
 * Create a new history record
 * @param {Object} req
 * @param {Object} res
 */
const createHistoryController = async (req, res) => {
  try {
    const history = await createHistory(req.body);
    res.status(httpStatus.CREATED).json(history);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

/**
 * Get all history records for a user
 * @param {Object} req
 * @param {Object} res
 */
const getHistoryByUserIdController = async (req, res) => {
  const { userId } = req.params;
  try {
    const histories = await getHistoryByUserId(userId);
    if (!histories) {
      throw new ApiError(httpStatus.NOT_FOUND, 'No history found for this user');
    }
    res.json(histories);
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: error.message });
  }
};

export { createHistoryController, getHistoryByUserIdController };
