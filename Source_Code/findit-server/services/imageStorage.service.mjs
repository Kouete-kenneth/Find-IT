import initializeStorage from "../config/storage.mjs";
import config from "../config/config.mjs";
import { ID } from "node-appwrite";

const storage = initializeStorage();

/**
 * Uploads an image to Appwrite storage.
 * @param {Buffer} fileBuffer - The file buffer to be uploaded.
 * @param {string} fileName - The name of the file.
 * @returns {Promise<string>} - The file ID of the uploaded image.
 */
const uploadImage = async (fileBuffer, fileName) => {
    try {
        const response = await storage.createFile(
            config.appwriteStorage.bucketID,
            ID.unique(),
            fileBuffer, // Ensure fileBuffer is directly passed as Uint8Array or Buffer
            fileName
        );
        return response.$id;
    } catch (error) {
        console.error('Error uploading image to Appwrite:', error);
        throw error;
    }
};

export {
    uploadImage
};
