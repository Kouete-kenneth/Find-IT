import express from 'express';
import {
    createItemController,
    getItemByIdController,
    updateItemByIdController,
    deleteItemByIdController,
    getAllItemsController,
    searchItemsByDescriptionController
} from '../../controllers/item.controller.mjs';
const router = express.Router();

// Route to create a new item
router.post('/', createItemController);

// Route to get all items
router.get('/',getAllItemsController);

// Route to get a specific item by ID
router.get('/description', searchItemsByDescriptionController);

// Route to get a specific item by ID
router.get('/:id', getItemByIdController);

// Route to update an item by ID
router.put('/:id', updateItemByIdController);

// Route to delete an item by ID
router.delete('/:id', deleteItemByIdController);

export default router;
