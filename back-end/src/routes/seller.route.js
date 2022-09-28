const { Router } = require('express');
const SellerController = require('../controllers/seller.controller');

const seller = Router();

seller
.get('/seller/:id', SellerController.getSaleBySellerId);

module.exports = seller;
