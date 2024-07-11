import backendBaseURL from "../utils/backendBaseURL";
import { uploadFile } from "./appWrite";

/**
 * Creates a new item via API.
 * @param {Object} newItem - The item data to be created.
 * @returns {Promise<Object>} - The created item data.
 */
const createNewItem = async (newItem) => {
    try {
        const response = await backendBaseURL.post('/items', newItem);
        return response.data;
    } catch (error) {
        console.error('Error creating item:', error);
        throw new Error
    }
};

export {
    createNewItem

};
