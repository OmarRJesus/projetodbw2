import React, { useState } from 'react';
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

    const handleSubmit = (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário
        if (action === 'Login') {
            // dados a serem enviados para a BD no login
            console.log('Login:', { email, password });
            // Aqui você faria a chamada para a sua API de login
        } else {
            // dados a serrem enviados para a BD no signup
            console.log('Sign Up:', { username, email, password });
            // Aqui você faria a chamada para a sua API de signup
        }
    };

    return (
        <div className="login-signup-wrapper">
            <div className="container2"> {/* Alterei para 'container' para corresponder ao seu CSS original */}
                <div className="header">
                    <div className="text"> {action} </div>
                    <div className="underline"></div>
                </div>
                <form onSubmit={handleSubmit}>
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
                            />
                        </div>
                    </div>
                    {action === 'Sign Up' ? null : ( // Use 'null' para renderizar condicionalmente
                        <div className="forgot-password">
                            Lost password? <span>Click Here!</span>
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

                
                        <button type="submit" className="submit-container">  
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