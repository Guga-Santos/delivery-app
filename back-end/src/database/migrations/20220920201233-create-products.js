'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      price: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      url_image: {
        allowNull: false,
        type: Sequelize.STRING
      },
    }, { timestamps: false });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('products');
  }
};