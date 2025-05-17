import express from 'express';
import { registerUser } from '../controllers/userController.js';

const router = express.Router();

// Rota para login
router.post('/login', (req, res) => {
    res.send("Login!");
});

// Rota para theme
router.post('/theme', (req, res) => {
    res.send("Theme!");
});

// Rota para registrar um usuário
router.post('/Users', registerUser);

export default router; // Exportação padrão