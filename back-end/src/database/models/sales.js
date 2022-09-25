'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sales extends Model {
    static associate(models) {
      this.belongsTo(models.users, 
      { foreignKey: 'userId', as: 'user' },
      { foreignKey: 'sellerId', as: 'seller' })

      this.hasMany(models.salesProducts, { foreignKey: 'id', as: 'saleId' });
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
