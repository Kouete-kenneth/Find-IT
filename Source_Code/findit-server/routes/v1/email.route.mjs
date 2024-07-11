import express from 'express';
import { createEmail } from '../../controllers/email.controller.mjs';
import auth from '../../middlewares/auth.mjs';
 

const router = express.Router();

router.post('/', createEmail);

export default router;