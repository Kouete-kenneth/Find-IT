// item.service.js
import Item from "../models/items.model.mjs";

/**
 * Create a new item.
 * @param {Object} itemData - Item data to be saved.
 * @returns {Promise<Object>} - The created item object.
 */
const createItem = async (itemData) => {
    try {
        const newItem = new Item(itemData);
        return await newItem.save();
    } catch (error) {
        throw error;
    }
};

/**
 * Get all items.
 * @returns {Promise<Array>} - Array of all items.
 */
const getAllItems = async () => {
    try {
        return await Item.find().populate('userId', 'username'); // Assuming 'userId' is a reference to the 'User' model
    } catch (error) {
        throw error;
    }
};

/**
 * Get item by ID.
 * @param {string} itemId - The ID of the item to fetch.
 * @returns {Promise<Object|null>} - The item object if found, or null if not found.
 */
const getItemById = async (itemId) => {
    try {
        return await Item.findById(itemId);
    } catch (error) {
        throw error;
    }
};

/**
 * Update an existing item by ID.
 * @param {string} itemId - The ID of the item to update.
 * @param {Object} updateData - Updated data for the item.
 * @returns {Promise<Object|null>} - The updated item object if successful, or null if not found.
 */
const updateItemById = async (itemId, updateData) => {
    try {
        return await Item.findByIdAndUpdate(itemId, updateData, { new: true });
    } catch (error) {
        throw error;
    }
};

/**
 * Delete an item by ID.
 * @param {string} itemId - The ID of the item to delete.
 * @returns {Promise<Object|null>} - The deleted item object if successful, or null if not found.
 */
const deleteItemById = async (itemId) => {
    try {
        return await Item.findByIdAndDelete(itemId);
    } catch (error) {
        throw error;
    }
};

/**
 * Search items by exact description match.
 * @param {string} description - The exact description to search for.
 * @returns {Promise<Object|null>} - The item object if found, or null if not found.
 */
const searchItemsByDescription = async (description) => {
    try {
        return await Item.findOne({ description: description });
    } catch (error) {
        throw error;
    }
};

export {
    createItem,
    getAllItems,
    getItemById,
    updateItemById,
    deleteItemById,
    searchItemsByDescription
};
