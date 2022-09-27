const SalesService = require('../services/sales.service');

const SalesController = {
  getAll: async (_req, res) => {
    const sales = await SalesService.getAll();

    if (!sales) {
      res.status(401).json({ message: 'No sales found!' });
    } 

    res.status(200).json(sales);
  },

  getOne: async (req, res) => {
    const { id } = req.params;

    const sale = await SalesService.getOne(+id);
    if (!sale) {
      return res.status(404).json({ message: 'Sale not found!' });
    }
    res.status(200).json(sale);
  },

  findByUserId: async (req, res) => {
    const { userId } = req.params;

    const sales = await SalesService.findByUserId(userId);

    res.status(200).json(sales);
  },

  create: async (req, res) => {
    const saled = await SalesService.create(req.body);

    res.status(201).json(saled);
  },
};

module.exports = SalesController;
