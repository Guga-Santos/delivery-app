const ProductService = require('../services/product.service');

const ProductsController = {
  getAll: async (req, res) => {
    const products = await ProductService.getAll();

    res.status(200).json(products);
  },
};

module.exports = ProductsController;