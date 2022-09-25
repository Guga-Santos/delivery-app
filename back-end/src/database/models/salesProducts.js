'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SalesProducts extends Model {
    static associate(models) {
      this.belongsTo(models.products, { foreignKey: 'productId', as: 'product' });
      this.belongsTo(models.sales, { foreignKey: 'saleId', as: 'sale' });
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