import { Router } from 'express';
import LoginController from '../controllers/login.controller';


const login = Router();

login
.get('/login', LoginController.login);

export default login;
