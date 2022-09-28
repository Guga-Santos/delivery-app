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

  getBySaleId: async (saleId) => {
    const salesProducts = await Model.salesProducts.findAll({ where: { saleId } });

    const products = await Promise.all(salesProducts.map(async ({ productId, quantity }) => {
      const { id, name, price } = await Model.products.findByPk(productId);

      const result = {
        id,
        name,
        quantity,
        unitPrice: price,
        subTotal: price * quantity,
      };

      return result;
    }));

    return products;
  },
};

module.exports = SalesProductsService;