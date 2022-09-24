const { Router } = require('express');
const AdminController = require('../controllers/admin.controller');
const Auth = require('../middleware/validate');

const admin = Router();

admin
.post('/admin/register', 
AdminController.validateBody, 
Auth.validateAdmin, 
AdminController.createUser);

module.exports = admin;