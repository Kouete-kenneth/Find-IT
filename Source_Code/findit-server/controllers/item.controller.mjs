
import httpStatus from "http-status";
import { 
    createItem,
    getAllItems,
    getItemById,
    updateItemById,
    deleteItemById,
    searchItemsByDescription
 } from "../services/item.service.mjs";
 import catchAsync from "../utils/catchAsync.mjs";

 /**
 * Controller function to create a new item.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const createItemController = catchAsync(async (req, res) => {
    try {
        const itemData = req.body;
        const newItem = await createItem(itemData);
        res.status(httpStatus.CREATED).send(newItem);
    } catch (error) {
      // Check if it's a validation error
      if (error.name === 'ValidationError') {
        // Handle validation error
        const errors = Object.values(error.errors).map((val) => val.message);
        return res.status(httpStatus.BAD_REQUEST).json({ error: errors });
      }
      // Handle other errors
      console.error('Error creating user:', error);
      res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Internal Server Error');
    }
  });

/**
 * Controller function to get all items.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const getAllItemsController = catchAsync(async (req, res) => {
    try {
        const items = await getAllItems();
        res.send(items);
    } catch (error) {
        console.error('Error getting items:', error);
        res.status(500).send({ error: 'Failed to retrieve items' });
    }
})

/**
 * Controller function to get an item by ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const getItemByIdController = catchAsync(async (req, res) => {
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
})

/**
 * Controller function to update an item by ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const updateItemByIdController = catchAsync(
    async (req, res) => {
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
    }
)

/**
 * Delete an item by ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
const deleteItemByIdController = catchAsync(async (req, res) => {
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
});

const searchItemsByDescriptionController = catchAsync( async (req, res) => {
    const description  = req.query.description;
const desc=description.toLowerCase();

    try {
        const items = await searchItemsByDescription(desc);
        if (items) {
          res.status(200).send(items);
        } else {
          res.status(404).send({ message: 'No items found with the given description.' });
        }
      } catch (error) {
        res.status(500).send({ message: error.message });
      }
})



export {
    createItemController,
    getItemByIdController,
    updateItemByIdController,
    getAllItemsController,
    deleteItemByIdController,
    searchItemsByDescriptionController
};
