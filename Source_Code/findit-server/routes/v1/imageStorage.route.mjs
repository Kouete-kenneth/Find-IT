import express from 'express';
import multer from 'multer';
import { handleUploadImage } from '../../controllers/imageStorage.controller.mjs';

const router = express.Router();
const upload = multer(); // Middleware for handling multipart/form-data

// Route to handle image upload
router.post('/upload', upload.single('image'), handleUploadImage);

export default router;