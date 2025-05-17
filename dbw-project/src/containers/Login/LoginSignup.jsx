import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginSignup.css';

import user_icon from '../../assets/user.png';
import password_icon from '../../assets/password.png';
import email_icon from '../../assets/email.png';
import brain_image from '../../assets/imagemCerebro.png';

function LoginSignup() {
    const [action, setAction] = useState('Login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const  goToLostPassword = () => {
        navigate('/lost-password');
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email.endsWith('@gmail.com')) {
            alert('Por favor, insira um email válido do formato @gmail.com.');
            return;
        }

        try {
            const endpoint = action === 'Sign Up'
                ? 'http://localhost:3001/api/Users'
                : 'http://localhost:3001/api/Users/login';

            const requestData = {
                email,
                password,
                ...(action === 'Sign Up' && { username }), // Adiciona "username" apenas no "Sign Up"
            };

            const response = await axios.post(endpoint, requestData);
            console.log('Resposta da API:', response.data);
            
            if (response.status === 201 && action === 'Sign Up') {
                if (response.data.user) {
                    console.log('Usuário registrado:', response.data.user);
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                }
                navigate('/home');
            } else if (response.status === 200 && action === 'Login') {
                if (response.data.user) {
                    console.log('Usuário logado:', response.data.user);
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                } else {
                    console.error('Nenhum dado de usuário retornado pelo backend.');
                }
                navigate('/home');
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                alert(error.response.data.error);
            } else if (error.response && error.response.status === 404) {
                alert('Usuário não encontrado ou credenciais inválidas!');
            } else {
                console.error('Erro:', error);
                alert('Ocorreu um erro. Tente novamente.');
            }
        }
    };
    return (
        <div className="login-signup-wrapper">
            <div className="container2"> {/* Alterei para 'container' para corresponder ao seu CSS original */}
                <div className="header">
                    <div className="text"> {action} </div>
                    <div className="underline"></div>
                </div>
                <form className='inputs' onSubmit={handleSubmit}>
                    <div className="inputs">
                        {action === 'Login' ? null : ( // Use 'null' em vez de <div></div> para renderizar condicionalmente
                            <div className="input">
                                <img src={user_icon} alt="" />
                                <input
                                    type="text"
                                    placeholder="UserName"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    onFocus={(e) => (e.target.placeholder = '')}
                                    onBlur={(e) => (e.target.placeholder = 'UserName')}
                                    required
                                />
                            </div>
                        )}

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
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onFocus={(e) => (e.target.placeholder = '')}
                                onBlur={(e) => (e.target.placeholder = 'Password')}
                                required
                            />
                        </div>
                    </div>
                    {action === 'Sign Up' ? null : ( // Use 'null' para renderizar condicionalmente
                        <div className="forgot-password">
                            Lost password? <span onClick={goToLostPassword}>Click Here!</span>
                        </div>
                    )}
                    {action === 'Sign Up' ? (
                        <div className="sinup">
                            Already have an account?{' '}
                            <span onClick={() => setAction('Login')}>Login!</span>
                        </div>
                    ) : (
                        <div className="login">
                            New here? <span onClick={() => setAction('Sign Up')}>Sign UP!</span>
                        </div>
                    )}


                    <button type="submit" className="submit-container" >
                        {action}
                    </button>

                </form>
            </div>
            <div className="image-container">
                <img src={brain_image} alt="imagem da direita" />
            </div>
        </div>
    );
}

export default LoginSignup;