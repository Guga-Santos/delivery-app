const ProductService = require('../services/product.service');

const ProductsController = {
  getAll: async (req, res) => {
    const products = await ProductService.getAll();

    res.status(200).json(products);
  },

  getByPk: async (req, res) => {
    const { id } = req.params
    const products = await ProductService.getByPk(id); 

    res.status(200).json(products)
  }
};

module.exports = ProductsController;