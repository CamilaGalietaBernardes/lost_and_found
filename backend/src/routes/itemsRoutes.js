const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemsController');

router.get('/items', itemsController.getItems);
router.get('/items/:id', itemsController.getItemById);
router.post('/items/new', itemsController.createItem);
router.put('/items/update/:id', itemsController.updateItem);
router.delete('/items/delete/:id', itemsController.deleteItem);
router.get('/items/report/local', itemsController.reportByLocal);
router.get('/items/recovered/report', itemsController.recoveredItemsReport)

module.exports = router;