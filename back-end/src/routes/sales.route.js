const { Router } = require('express');
const SalesController = require('../controllers/sales.controller');
const Auth = require('../middleware/auth');

const sales = Router();

sales
.get('/sales/:id', SalesController.getOne)
.get('/sales/userId/:userId', SalesController.findByUserId)
.get('/sales', SalesController.getAll)
.post('/sales', Auth.validateUser, SalesController.create);

module.exports = sales;
