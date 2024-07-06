import Notification from '../models/notification.model.mjs';

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
/**
 * Get all notifications for a user
 * @param {string} userId
 * @returns {Promise<Array>}
 */
const getAllNotifications = async (userId) => {
  try {
    const notifications = await Notification.find({
      $or: [
        { userId }, // User is the direct recipient
        { recipientType: 'everyone' }, // Notification is sent to everyone
        { recipientType: 'chosen', recipients: userId }, // User is in the chosen recipients list
      ],
    });
    
    if (notifications) {
      return notifications;
    } else {

      throw new Error(`Could not find notifications for userId: ${userId}`);
    }
  } catch (error) {
    console.error('Error saving notification:', error.message);
    throw new Error('Error fetching notifications');
  }
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

export { createNotification, getAllNotifications, deleteNotification };
