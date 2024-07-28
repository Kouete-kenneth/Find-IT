import express from 'express';
import { addNotification, getNotifications, removeNotification, updateNotification } from '../../controllers/notification.controller.mjs';
import * as notificationValidation from '../../validations/notification.validation.mjs'
import validate from '../../middlewares/validate.mjs';
const router = express.Router();

// Route to create a new notification
router.post('/',validate(notificationValidation.createNotification), addNotification);

// Route to fetch all notifications for a user
router.get('/:userId',validate(notificationValidation.getAllNotifications), getNotifications);

// Route to update a notifications
router.put('/:notificationId',validate(notificationValidation.updateNotification), updateNotification);

// Route to delete a notification
router.delete('/:notificationId',validate(notificationValidation.deleteNotification), removeNotification);

export default router;
