const Model = require('../database/models');

const SalesProductsService = {
  create: async () => {
    const sale = await Model.salesProducts.create({
      saleId: 1,
      productId: 1,
      quantity: 1,
      });

    return sale;
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