import User from '../models/user.js';
import mongoose from 'mongoose';
mongoose.connection.once('open', async () => {
    console.log('Conexão com o MongoDB está aberta');

    try {
        const users = await User.find();
        console.log('Usuários encontrados:', users);
    } catch (err) {
        console.error('Erro ao acessar a coleção Users:', err);
    }
});
export async function registerUser(req, res) {
    try {
        const { username, email, password } = req.body;

        //console.log('Dados recebidos:', req.body);

        if (!username || !email || !password) {
            console.log('Campos obrigatórios ausentes');
            return res.status(400).json({ error: 'Todos os campos são obrigatórios!' });
        }
        
        const newUser = new User({ username, email, password });
        console.log('Instância newUser criada:', newUser);
        const result = await newUser.save();
        console.log('Usuário salvo com sucesso!', result);

        res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    } catch (error) {
        console.error('Erro ao registrar o usuário:', error);

        if (error.code === 11000) {
            console.log('Erro de duplicidade de email');
            return res.status(400).json({ error: 'Email já está em uso!' });
        }

        res.status(500).json({ error: `Erro ao registrar o usuário: ${error.message}` });
    }
}