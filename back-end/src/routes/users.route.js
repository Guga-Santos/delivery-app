const { Router } = require('express');
const UsersController = require('../controllers/users.controller');

const users = Router();

users
.get('/users', UsersController.getAll)
.post('/users', UsersController.validateBody, UsersController.createUser);

module.exports = users;