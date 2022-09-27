const { Router } = require('express');
const ProductsController = require('../controllers/products.controller');

const products = Router();

products
.get('/products/:id', ProductsController.getByPk)
.get('/products', ProductsController.getAll);

module.exports = products;