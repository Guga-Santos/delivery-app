'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    static associate(models) {
      this.hasMany(models.salesProducts, { foreignKey: 'id', as: 'productId' });
    }
    }
  
  
  Products.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
  },
    price: DataTypes.DECIMAL(4,2),
    urlImage: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'products',
    timestamps: false,
    underscored: true,
  });
  return Products;
};