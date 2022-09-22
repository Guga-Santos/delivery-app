const express = require('express');
import LoginRoute from '../routes/login.route';

const app = express();

app.get('/coffee', (_req, res) => res.status(418).end());
app.use(LoginRoute);

module.exports = app;
