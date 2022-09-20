'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sales_products extends Model {
    sale_id;
    product_id;
    quantity;
    static associate(models) {
      this.belongsTo(models.products, { foreignKey: 'product_id', as: 'product' });
      this.belongsTo(models.sales, { foreignKey: 'sale_id', as: 'sale' });
    }
  }
  sales_products.init({
    sale_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'sales_products',
  });
  return sales_products;
};