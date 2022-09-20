'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    name;
    price;
    url_image;

    static associate(models) {
      this.hasMany(models.sales_products, { foreignKey: 'id', as: 'product_id' });
    }
    }
  }
  products.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
  },
    price: DataTypes.INTEGER,
    url_image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'products',
    timestamps: false,
    underscored: true,
  });
  return products;
};