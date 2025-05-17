import React, { useState } from 'react'
import './LoginSignup.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import user_icon from '../../assets/user.png'
import password_icon from '../../assets/password.png'
import email_icon from '../../assets/email.png'

function LoginSignup() {
    const [action, setAction] = useState('Login');
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post('http://localhost:3001/api/Users', {
                username: name,
                email: email,
                password: password,
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }

        
        console.log(response.data.message);
        alert('Usuário registrado com sucesso!');
        navigate('/theme'); // Redireciona após sucesso
    } catch (error) {
        console.error('Erro ao registrar o usuário:', error);
        alert('Erro ao registrar o usuário. Verifique os dados e tente novamente.');
    }
};

    return (
        <div className='container'>
            <div className='header'>
                <div className='text'>{action}</div>
                <div className='underline'></div>
            </div>

            <form className='inputs' onSubmit={handleSubmit}>
                {action === 'Login' ? null : (
                    <div className='input'>
                        <img src={user_icon} alt="" />
                        <input
                            type='text'
                            placeholder='UserName'
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                )}

                <div className='input'>
                    <img src={email_icon} alt="" />
                    <input
                        type='email'
                        placeholder='Email'
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className='input'>
                    <img src={password_icon} alt="" />
                    <input
                        type='password'
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                {action === 'Sign Up' ? null : (
                    <div className="forgot-password">Lost password? <span>Click Here!</span></div>
                )}

                <div className="submit-container">
                    {action === 'Sign Up' ? (
                        <button type="submit" className="submit" onClick={() => navigate('/theme')}>Sign Up</button>
                    ) : (
                        <div className="submit gray" onClick={() => setAction('Sign Up')}>Sign Up</div>
                    )}

                    {action === 'Login' ? (
                        <button
                            type="button"
                            className="submit"
                            onClick={() => navigate('/theme')}
                        >
                            Login
                        </button>
                    ) : (
                        <div className="submit gray" onClick={() => setAction('Login')}>Login</div>
                    )}
                </div>
            </form>
        </div>
    )
}

export default LoginSignup
