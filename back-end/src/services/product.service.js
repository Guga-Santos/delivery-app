const Model = require('../database/models');

const ProductService = {
  getAll: async () => {
    const products = await Model.products.findAll();

    return products;
  },

  getByPk: async (id) => {
      const products = await Model.products.findByPk(id);

      return products;
  },
};

module.exports = ProductService;