const SalesProductsService = require('../services/salesProducts.service');

const SalesProductsController = {
  create: async (req, res) => {
    // const { saleId, data } = req.body;
    const sale = SalesProductsService.create();
    // Promise.all(data.map((product) => SalesProductsService
    //     .create({
    //       saleId,
    //       productId: product.id,
    //       quantity: +product.quantity,
    //     })));
    res.status(201).json(sale);
  },

  getAll: async (_req, res) => {
    const sales = await SalesProductsService.getAll();

    if (!sales) {
      return res.status(401).json({ message: 'No sales found!' });
    } 
    
    res.status(200).json(sales);
  },
};

module.exports = SalesProductsController;