'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    name;
    price;
    url_image;

    static associate(models) {
      this.hasMany(models.sales_products, { foreignKey: 'id', as: 'product_id' });
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
    url_image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'products',
    timestamps: false,
    underscored: true,
  });
  return Products;
};