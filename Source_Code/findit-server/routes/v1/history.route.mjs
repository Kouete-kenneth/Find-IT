import express from 'express';
import { createHistoryController, getHistoryByUserIdController } from '../../controllers/history.controller.mjs';
import { createHistoryValidation, getHistoryByUserIdValidation } from '../../validations/history.validation.mjs';
import validate from '../../middlewares/validate.mjs'; // Assumed validation middleware

const router = express.Router();

router.post('/', validate(createHistoryValidation), createHistoryController);
router.get('/user/:userId', validate(getHistoryByUserIdValidation), getHistoryByUserIdController);

export default router;
