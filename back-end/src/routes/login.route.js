const { Router } = require('express');
const LoginController = require('../controllers/login.controller');

const login = Router();

login
.post('/login', LoginController.login);

module.exports = login;
