const Model = require('../database/models');

const SalesProductsService = {
  create: async (data) => {
    await Model.salesProducts.create(data);
  }, 

  getAll: async () => {
    try {
      const sales = await Model.salesProducts.findAll();
      // if (sales.length < 1) return null;
      return sales;
    } catch (err) {
      return null;
    }
  },
};

module.exports = SalesProductsService;