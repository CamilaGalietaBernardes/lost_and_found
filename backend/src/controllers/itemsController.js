const sequelize = require('sequelize')
const {Op} = require('sequelize');
const {Items} = require('../models/itemsModel')


const getItems = (req, res) => {   
    Items.findAll({
        where: {
            recovery_date: null,
        },
    }).then((items) => {
            res.json(items);
    })
        .catch((error) => {
            console.error('Failed to load items!', error);
            res.status(500).json({message: 'Failed to load items!'});
        });
};

const getItemById = (req, res) => {
    const itemsId = req.params.id;
    Items.findByPk(itemsId)
    .then((items) => {
        res.json(items);
    })
    .catch((error) => {
        console.error('Item not found!', error)
        res.status(500).json({message: 'Failed to load item!'})
    });
};

const createItem = (req, res) => {
    const item = req.body;
    item.recovery_date = null
    Items.create(item).then(() => {
        res.json(item);
    }).catch((erro) => {
        console.error('Failed to register item!', erro);
        res.status(500).json({message: 'Failed to register items!'})
    });
};

const updateItem = (req, res) => {
    const itemId = req.params.id;

    const updatedItem = req.body;
    Items.update(updatedItem, {
        where: {
            item_id: itemId
        }
    }).then(() => {
        res.json(updatedItem);
        console.log('Item updated successfully!');
    }).catch((erro) => {
        console.error('Failed to update item!', erro);
        res.status(500).json({message: 'Failed to update items!'})
    });
};

const deleteItem = (req, res) => {
    const itemId = req.params.id;
    Items.destroy({
        where: {
            item_id: itemId
        }
    }).then(() => {
            res.json('Item deleted successfully!');
    }).catch((erro) => {
        console.error('Failed to delete item!', erro);
        res.status(500).json({message: 'Failed to delete items!'})
    });
};


const reportByLocal = (req, res) => {
    Items.findAll({
        attributes: ['location_found', 
        [sequelize.fn('COUNT', sequelize.col('item_id')), 'count']],
        group: ['location_found']
    }).then((result) => {
        res.json(result);
    }).catch((error) => {
        console.error('Error generating item report!', error);
        res.status(500).json({message: 'Failed to generate report!'})
    });
};

const recoveredItemsReport = (req, res) => {
    Items.findAll({
        where: {[Op.not]: [{ recovery_date: null }]}
      }).then((recovered_items) => {
        res.json(recovered_items);
      }).catch((error) => {
        console.error('Failed to locate recovered items!', error);
        res.status(500).json({message: 'Failed to locate recovered items!'})
      });
};

module.exports = {
    getItems, getItemById, createItem, updateItem,
    deleteItem, reportByLocal, recoveredItemsReport 
}