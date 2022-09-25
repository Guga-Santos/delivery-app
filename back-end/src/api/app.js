const express = require('express');
const cors = require('cors');
const LoginRoute = require('../routes/login.route');
const RegisterRoute = require('../routes/register.route');
const UserRoute = require('../routes/users.route');
const ProductsRoute = require('../routes/products.route');
const AdminRoute = require('../routes/admin.route');
const SalesRoute = require('../routes/sales.route');
const SalesProductsRoute = require('../routes/salesProducts.route');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/coffee', (_req, res) => res.status(418).end());
// https://www.geeksforgeeks.org/how-to-fetch-images-from-node-js-server/
// app.use(express.static('public')); 
app.use('/images', express.static('public/images'));
app.use(LoginRoute);
app.use(RegisterRoute);
app.use(UserRoute);
app.use(ProductsRoute);
app.use(AdminRoute);
app.use(SalesRoute);
app.use(SalesProductsRoute);

module.exports = app;
