'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sales extends Model {
    user_id;
    seller_id;
    total_price;
    delivery_address;
    delivery_number;
    sale_date;

    static associate(models) {
      this.belongsTo(models.users, 
      { foreignKey: 'user_id', as: 'user' },
      { foreignKey: 'seller_id', as: 'seller' })

      this.hasMany(models.sales_products, { foreignKey: 'id', as: 'sale_id' });
    }
  }
  sales.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: DataTypes.NUMBER,
    seller_id: DataTypes.NUMBER,
    total_price: DataTypes.NUMBER,
    delivery_address: DataTypes.STRING,
    delivery_number: DataTypes.STRING,
    sale_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'sales',
    timestamps: false,
    underscored: true,
  });
  return sales;
};
