import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LostPassword.css';

import password_icon from '../../assets/password.png';
import email_icon from '../../assets/email.png';
import brain_image from '../../assets/imagemCerebro.png';

function LostPassword() {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.endsWith('@gmail.com')) {
            setMessage('Por favor, insira um email válido do formato @gmail.com.');
            return;
        }

        if (newPassword !== confirmNewPassword) {
            setMessage('As novas palavras-passe não coincidem.');
            return;
        }

        if (newPassword.length < 3) {
            setMessage('A nova palavra-passe deve ter pelo menos 3 caracteres.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3001/api/Users/reset-password', {
                email,
                newPassword,
            });

            console.log('Resposta da API:', response.data);
            setMessage(response.data.message || 'Palavra-passe alterada com sucesso!');

            setTimeout(() => {
                navigate('/');
            }, 2000);

        } catch (error) {
            console.error('Erro ao redefinir a palavra-passe:', error);
            if (error.response && error.response.status === 404) {
                setMessage('Email não encontrado.');
            } else {
                setMessage('Ocorreu um erro ao redefinir a palavra-passe. Tente novamente.');
            }
        }
    };

    return (
        <div className="login-signup-wrapper">
            <div className="container2">
                <div className="header">
                    <div className="text">Redefinir Palavra-passe</div>
                    <div className="underline"></div>
                </div>
                <form className="inputs" onSubmit={handleSubmit}>
                    <div className="inputs">
                        <div className="input">
                            <img src={email_icon} alt="" />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={(e) => (e.target.placeholder = '')}
                                onBlur={(e) => (e.target.placeholder = 'Email')}
                                required
                            />
                        </div>
                        <div className="input">
                            <img src={password_icon} alt="" />
                            <input
                                type="password"
                                placeholder="Nova Palavra-passe"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                onFocus={(e) => (e.target.placeholder = '')}
                                onBlur={(e) => (e.target.placeholder = 'Nova Palavra-passe')}
                                required
                            />
                        </div>
                        <div className="input">
                            <img src={password_icon} alt="" />
                            <input
                                type="password"
                                placeholder="Confirmar Nova Palavra-passe"
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                onFocus={(e) => (e.target.placeholder = '')}
                                onBlur={(e) => (e.target.placeholder = 'Confirmar Nova Palavra-passe')}
                                required
                            />
                        </div>
                    </div>
                    {message && <div className="message">{message}</div>}
                    <button type="submit" className="submit-container">
                        Redefinir Palavra-passe
                    </button>
                    <div className="login-link">
                        Lembrou-se da palavra-passe? <span onClick={() => navigate('/')}>Login!</span>
                    </div>
                </form>
            </div>
            <div className="image-container">
                <img src={brain_image} alt="imagem da direita" />
            </div>
        </div>
    );
}

export default LostPassword;