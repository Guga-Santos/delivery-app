const Model = require('../database/models');

const SalesService = {
  create: async (sale) => {
    const newSale = await Model.sales.create(sale);

    return newSale;
  },

  getAll: async () => {
    const sales = await Model.sales.findAll();
    if (sales.length < 1) return null; 

    return sales;
  },

  getOne: async (id) => {
    const sale = await Model.sales.findOne({ where: { id } });

    if (!sale) return null;

    return sale;
  },

  findByUserId: async (userId) => {
    const sales = await Model.sales.findAll({ where: { userId } });

    return sales;
  },

  update: async (id, status) => {
    const updatedSale = await Model.sales.update({ status }, {
      where: {
        id,
      },
    });

    return updatedSale;
  },
};

module.exports = SalesService;
