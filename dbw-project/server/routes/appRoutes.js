import express from 'express';
import { registerUser,getUsers, getOnlineUsers, updateUser, resetPassword } from '../controllers/userController.js';
import {getThemes,getSessions} from '../controllers/themesController.js';
import {salvarBrainstormFinalizado,analyzeBrainstorm} from '../controllers/brainstormController.js';
const router = express.Router();

// Rota para registrar um usuário
router.post('/Users', registerUser); //rota para registar usuario na base de dados(sign in)
router.post('/Users/login',getUsers); //rota para verificar se o usuario existe na base de dadsos (login)
router.post('/Users/online', getOnlineUsers); //rota para buscar mais 2 usuarios online para o brainstorming
router.put('/Users/:userId', updateUser); // rota para editar o nome de usuario
router.post('/Users/reset-password',resetPassword);
router.get('/themes', getThemes);
router.get('/sessions/:id',getSessions);




router.post('/brainstorm/analyze',analyzeBrainstorm);
router.post('/brainstorm/salvar', salvarBrainstormFinalizado);

export default router; 