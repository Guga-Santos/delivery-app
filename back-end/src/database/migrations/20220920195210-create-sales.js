'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        alowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      seller_id: {
        alowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      total_price: {
        alowNull: false,
        type: Sequelize.INTEGER
      },
      delivery_address: {
        alowNull: false,
        type: Sequelize.STRING
      },
      delivery_number: {
        alowNull: false,
        type: Sequelize.STRING
      },
      sale_date: {
        alowNull: false,
        type: Sequelize.DATE
      },
    }, { timestamps: false });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('sales');
  }
};