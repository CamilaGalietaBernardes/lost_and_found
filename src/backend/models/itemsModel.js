const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('lost_and_found', 'root', '', {
    host: 'localhost', 
    dialect: 'mysql', 
});

const Items = sequelize.define('items_tb', {
    item_id: {
        type: Sequelize.INTEGER, 
        allowNull: false, 
        autoIncrement: true, 
        primaryKey: true
    }, 
    item_name: {
        type: Sequelize.STRING, 
        allowNull: false
    },
    item_description: {
        type: Sequelize.STRING, 
        allowNull: false
    }, 
    location_found: {
        type: Sequelize.STRING, 
        allowNull: false
    },
    registration_date: {
        type: Sequelize.DATE, 
        allowNull: false 
    }, 
    recovered_by: {
        type: Sequelize.STRING, 
        allowNull: true
    }, 
    recovery_date: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
    }
}, {
    timestamps: false
},
{
    freezeTableName: true
});

sequelize.sync().then(() => {
    console.log('Conectado com o banco de dados!');
}).catch((erro) => {
    console.error('Falha ao conectar com o banco de dados!', erro);
});

module.exports = {Items};