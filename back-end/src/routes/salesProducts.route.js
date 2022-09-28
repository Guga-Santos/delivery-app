const { Router } = require('express');
const SalesProductsController = require('../controllers/salesProducts.controller');
const Auth = require('../middleware/auth');

const salesProducts = Router();

salesProducts
.get('/salesProducts/:saleId', SalesProductsController.getBySaleId)
.get('/salesProducts', SalesProductsController.getAll)
.post('/salesProducts', Auth.validateUser, SalesProductsController.create);

module.exports = salesProducts;