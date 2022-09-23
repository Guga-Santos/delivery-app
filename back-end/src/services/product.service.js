const Model = require('../database/models');

const ProductService = {
  getAll: async () => {
    const products = await Model.products.findAll();

    return products;
  },
};

module.exports = ProductService;