import { uploadImage } from "../services/imageStorage.service.mjs";

/**
 * Handles uploading an image.
 * @param {Buffer} fileBuffer - The file buffer to be uploaded.
 * @param {string} fileName - The name of the file.
 * @returns {Promise<string>} - The file ID of the uploaded image.
 */

const handleUploadImage = async (req, res) => {
    try {
        const file = req.file;
        const fileId = await uploadImage(file.buffer, file.originalname);
        res.json({ fileId });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(200).json({ message: 'image uploaded successfully'});
    }
};

export {
    handleUploadImage
}