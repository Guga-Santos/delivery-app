'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sales extends Model {
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

      this.hasMany(models.salesProducts, { foreignKey: 'id', as: 'sale_id' });
    }
  }
  Sales.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: DataTypes.INTEGER,
    sellerId: DataTypes.INTEGER,
    totalPrice: DataTypes.DECIMAL,
    deliveryAddress: DataTypes.STRING,
    deliveryNumber: DataTypes.STRING,
    saleDate: {
      type: DataTypes.DATE,
      defaultValue: new Date()
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'Pendente',
    }
  }, {
    sequelize,
    modelName: 'sales',
    timestamps: false,
    underscored: true,
  });
  return Sales;
};
