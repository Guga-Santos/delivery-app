const { Router } = require('express');
const UsersController = require('../controllers/users.controller');
const Auth = require('../middleware/auth');

const users = Router();

users
.get('/users', UsersController.getAll)
.post('/users/admin/create', UsersController.validateBody, Auth.validateAdmin, UsersController.createUser);

module.exports = users;