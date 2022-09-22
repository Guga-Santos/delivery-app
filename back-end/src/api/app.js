const express = require('express');
require('express-async-errors');
const LoginRoute = require('../routes/login.route');

const app = express();

app.get('/coffee', (_req, res) => res.status(418).end());
app.use(LoginRoute)


module.exports = app;
