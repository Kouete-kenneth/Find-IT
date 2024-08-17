import Notification from '../models/notification.model.mjs';
import ApiError from '../utils/ApiError.mjs'
import httpStatus from 'http-status';
/**
 * Create a new notification
 * @param {object} notificationBody
 * @returns {Promise<object>}
 */
const createNotification = async (notificationBody) => {
  try {
    const notification = await Notification.create(notificationBody);
    return notification;
  } catch (error) {
    console.error('Error saving notification:', error.message);
    throw new Error('Error saving notification');
  }
};

/**
 * Get all notifications for a user
 * @param {string} userId
 * @returns {Promise<Array>}
 */
const getAllNotifications = async (userId) => {
  try {
    const notifications = await Notification.find({
      // $or: [
      //   { userId }, // User is the direct recipient
        recipientType: 'everyone' // Notification is sent to everyone
         // User is in the chosen recipients list
      // ],
    });
    
    return notifications; // Always return the notifications array, even if it's empty
  } catch (error) {
    console.error('Error fetching notifications:', error.message);
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Error fetching notifications');
  }
};

/**
 * Update notification by id
 * @param {ObjectId} notificationId
 * @param {Object} updateBody
 * @returns {Promise<Notification>}
 */
const updateNotificationById = async (notificationId, updateBody) => {
  const notification = await Notification.findById(notificationId);
  if (!notification) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Notification not found');
  }

  Object.assign(notification, updateBody);
  await notification.save();
  return notification;
};

/**
 * Delete a notification
 * @param {string} notificationId
 * @returns {Promise<object>}
 */
const deleteNotification = async (notificationId) => {
  try {
    const deletedNotification = await Notification.findOneAndDelete({ _id: notificationId });
    if (deletedNotification) {
      return deletedNotification;
    } else {
      throw new Error(`Could not find notification with id: ${notificationId}`);
    }
  } catch (error) {
    console.error('Error saving notification:', error.message);
    throw new Error('Error deleting notification');
  }
};

export { createNotification, getAllNotifications,updateNotificationById, deleteNotification };
