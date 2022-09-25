'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SalesProducts extends Model {
    static associate(models) {
      SalesProducts.belongsTo(models.products, { foreignKey: 'productId', as: 'product' });
      SalesProducts.belongsTo(models.sales, { foreignKey: 'saleId', as: 'sale' });
    }
  }
  SalesProducts.init({
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    saleId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'sales',
        key: 'id',
      },
    },
    productId: {
      allowNull: false,
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
    tableName: 'sales_products',
    timestamps: false,
    underscored: true,
  });
  return SalesProducts;
};