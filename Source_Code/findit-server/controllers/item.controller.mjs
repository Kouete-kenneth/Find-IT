
import { 
    createItem,
    getAllItems,
    getItemById,
    updateItemById,
    deleteItemById,
    searchItemsByDescription
 } from "../services/item.service.mjs";

 /**
 * Controller function to create a new item.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const createItemController = async (req, res) => {
    try {
        const itemData = req.body;
        const newItem = await createItem(itemData);
        res.status(201).json(newItem);
    } catch (error) {
        console.error('Error creating item:', error);
        res.status(500).json({ error: 'Failed to create item' });
    }
};

/**
 * Controller function to get all items.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const getAllItemsController = async (req, res) => {
    try {
        const items = await getAllItems();
        res.send(items);
    } catch (error) {
        console.error('Error getting items:', error);
        res.status(500).send({ error: 'Failed to retrieve items' });
    }
};

/**
 * Controller function to get an item by ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const getItemByIdController = async (req, res) => {
    const itemId = req.params.id;
    try {
        const item = await getItemById(itemId);
        if (!item) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json(item);
    } catch (error) {
        console.error('Error getting item by ID:', error);
        res.status(500).json({ error: 'Failed to retrieve item' });
    }
};

/**
 * Controller function to update an item by ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const updateItemByIdController = async (req, res) => {
    const itemId = req.params.id;
    const updateData = req.body;
    try {
        const updatedItem = await updateItemById(itemId, updateData);
        if (!updatedItem) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.json(updatedItem); // Send the updated item as JSON response
    } catch (error) {
        console.error('Error updating item by ID:', error);
        res.status(500).json({ error: 'Failed to update item' });
    }
};

/**
 * Delete an item by ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const deleteItemByIdController = async (req, res) => {
    const itemId = req.params.id;

    try {
        const deletedItem = await deleteItemById(itemId);

        if (!deletedItem) {
            return res.status(404).json({ error: 'Item not found' });
        }

        res.json(deletedItem);
    } catch (error) {
        console.error('Error deleting item by ID:', error);
        res.status(500).json({ error: 'Failed to delete item' });
    }
};

const searchItemsByDescriptionController = async (req, res) => {
    const description  = req.query.description;

    try {
        const items = await searchItemsByDescription(description);
        if (items) {
          res.status(200).send(items);
        } else {
          res.status(404).send({ message: 'No items found with the given description.' });
        }
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
};



export {
    createItemController,
    getItemByIdController,
    updateItemByIdController,
    getAllItemsController,
    deleteItemByIdController,
    searchItemsByDescriptionController
};
