const { Router } = require('express');
const UsersController = require('../controllers/users.controller');

const users = Router();

users
.get('/users', UsersController.getAll);

module.exports = users;
