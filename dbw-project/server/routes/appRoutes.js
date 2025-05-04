import express from 'express';

const router = express.Router();

//rota para login
router.post('/login', (req, res) => {
      res.send("Login!")
});

//rota para theme
router.post('/theme', (req, res) => {
      res.send("Theme!")
});

