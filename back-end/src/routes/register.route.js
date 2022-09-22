const { Router } = require('express');
const RegisterController = require('../controllers/register.controller');

const register = Router();

register
.post('/register', RegisterController.create);

module.exports = register;
