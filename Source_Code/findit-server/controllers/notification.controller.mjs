import { createNotification, getAllNotifications,updateNotificationById, deleteNotification } from '../services/notification.service.mjs';
import httpStatus from 'http-status';

/**
 * Controller function to create a new notification
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Next function to pass control to the next middleware
 * @returns {Promise<void>}
 */
const addNotification = async (req, res, next) => {
  try {
    const { userId, senderId, content, status, title, linkText, recipientType, recipients } = req.body;

    const notification = await createNotification({
      userId,
      senderId,
      content,
      status,
      title,
      linkText,
      recipientType,
      recipients,
    });

    res.status(201).json(notification);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller function to fetch all notifications for a user
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Next function to pass control to the next middleware
 * @returns {Promise<void>}
 */
const getNotifications = async (req, res, next) => {
  try {
    const { userId } = req.params;

    const notifications = await getAllNotifications(userId);

    res.json(notifications);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller function to delete a notification
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Next function to pass control to the next middleware
 * @returns {Promise<void>}
 */
const removeNotification = async (req, res, next) => {
  try {
    const { notificationId } = req.params;

    const deletedNotification = await deleteNotification(notificationId);

    res.json(deletedNotification);
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to handle updating a notification by ID.
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const updateNotification = async (req, res, next) => {
  try {
    const { notificationId } = req.params;
    const updateBody = req.body;

    const updatedNotification = await updateNotificationById(notificationId, updateBody);

    res.status(httpStatus.OK).json(updatedNotification);
  } catch (error) {
    next(error); // Pass the error to the next middleware
  }
};

export { addNotification, getNotifications, removeNotification,updateNotification };
