const express = require('express');
const cors = require('cors');
const LoginRoute = require('../routes/login.route');
const RegisterRoute = require('../routes/register.route');
const UserRoute = require('../routes/users.route');
const ProductsRoute = require('../routes/products.route');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/coffee', (_req, res) => res.status(418).end());
app.use(LoginRoute);
app.use(RegisterRoute);
app.use(UserRoute);
app.use(ProductsRoute);

module.exports = app;
