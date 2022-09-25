'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SalesProducts extends Model {
    sale_id;
    product_id;
    quantity;
    static associate(models) {
      this.belongsTo(models.products, { foreignKey: 'product_id', as: 'product' });
      this.belongsTo(models.sales, { foreignKey: 'sale_id', as: 'sale' });
    }
  }
  SalesProducts.init({
    saleId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      references: {
        model: 'sales',
        key: 'id',
      },
    },
    productId: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.INTEGER,
      references: {
        model: 'products',
        key: 'id',
      },
    },
    quantity: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'salesProducts',
  });
  return SalesProducts;
};