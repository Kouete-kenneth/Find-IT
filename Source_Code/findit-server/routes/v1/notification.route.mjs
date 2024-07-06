import express from 'express';
import { addNotification, getNotifications, removeNotification } from '../../controllers/notification.controller.mjs';

const router = express.Router();

// Route to create a new notification
router.post('/', addNotification);

// Route to fetch all notifications for a user
router.get('/:userId', getNotifications);

// Route to delete a notification
router.delete('/:notificationId', removeNotification);

export default router;
