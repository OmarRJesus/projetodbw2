import { get } from 'mongoose';
import User from '../models/user.js';
import { compareSync } from 'bcrypt';


export async function registerUser(req, res) {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Todos os campos são obrigatórios!' });
        }

        const newUser = new User({ username, email, password });
        const result = await newUser.save();
        console.log('Usuário salvo com sucesso!', result);


        res.status(201).json({
            message: 'Usuário registrado com sucesso!',
            user: {
                _id: result._id,
                username: result.username,
                email: result.email,
                totalBrainstormTime: 0,
            },
        });
    } catch (error) {
        compareSync(error);
        console.error('Erro ao registrar o usuário:', error);

        if (error.code === 11000) {
            return res.status(400).json({ error: 'Email já está em uso!' });
        }

        res.status(500).json({ error: `Erro ao registrar o usuário: ${error.message}` });
    }
}




export const getUsers = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email, password });

        if (!user) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        res.status(200).json({
            message: 'Login bem-sucedido',
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                totalBrainstormTime: user.totalBrainstormTime || 0
            }
        });
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        res.status(500).json({ message: 'Erro no servidor', error: error.message });
    }
};


export async function getOnlineUsers(req, res) {
    try {

        const allUsers = await User.find({}, 'username email').lean();


        const loggedInUser = req.query.loggedInUser;


        const otherUsers = allUsers.filter(user => user.username !== loggedInUser);
        const randomUsers = otherUsers.sort(() => 0.5 - Math.random()).slice(0, 2);


        res.status(200).json({
            onlineUsers: [loggedInUser, ...randomUsers.map(user => user.username)],
        });
    } catch (error) {
        console.error('Erro ao buscar usuários online:', error);
        res.status(500).json({ error: 'Erro ao buscar usuários online' });
    }
}


export const updateUser = async (req, res) => {
    try {
        const { email, username } = req.body;
        const { userId } = req.params;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }


        user.username = username || user.username;
        user.email = email || user.email;

        const updatedUser = await user.save();

        res.status(200).json({
            message: 'Perfil atualizado com sucesso!',
            user: {
                username: updatedUser.username,
                email: updatedUser.email,
                totalBrainstormTime: updatedUser.totalBrainstormTime || 0
            }
        });
    } catch (error) {
        console.error('Erro ao atualizar perfil:', error);
        res.status(500).json({ message: 'Erro no servidor', error: error.message });
    }
};

export const resetPassword = async (req, res) => {
    const { email, newPassword } = req.body;

    try {

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'Email não encontrado.' });
        }

        user.password = newPassword;
        await user.save();

        res.status(200).json({ message: 'Palavra-passe alterada com sucesso!' });

    } catch (error) {
        console.error('Erro ao redefinir a palavra-passe:', error);
        res.status(500).json({ message: 'Ocorreu um erro ao redefinir a palavra-passe.' });
    }
};



