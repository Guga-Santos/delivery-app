'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    name;
    email;
    password;
    role;
    static associate(models) {
      this.hasMany(models.sales, 
        { foreignKey: 'id', as: 'user' },
        { foreignKey: 'id', as: 'seller' });
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
    timestamps: false,
    underscored: true,
  });
  return User;
};