const Model = require('../database/models');

const SalesProductsService = {
  create: async (data) => {
    const sale = await Model.salesProducts.create(data);

    return sale;
  }, 
  getAll: async () => {
    const sales = await Model.salesProducts.findAll();
    
    if (sales.length < 1) return null;

    return sales;
  },
};

module.exports = SalesProductsService;