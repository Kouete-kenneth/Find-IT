import express from 'express';
import { matchDescriptionsController } from '../../controllers/matches.controller.mjs';

const router = express.Router();

/**
 * Route to handle matching descriptions.
 */
router.post('/', matchDescriptionsController);

export default router;