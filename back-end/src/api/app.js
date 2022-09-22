const express = require('express');
const cors = require('cors');
const LoginRoute = require('../routes/login.route');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/coffee', (_req, res) => res.status(418).end());
app.use(LoginRoute);

module.exports = app;
