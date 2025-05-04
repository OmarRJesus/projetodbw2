import React from 'react'
import './LoginSignup.css'
import { useNavigate } from 'react-router-dom'

import user_icon from '../../assets/user.png'
import password_icon from '../../assets/password.png'
import email_icon from '../../assets/email.png'

function LoginSignup() {
    const [action, setAction] = React.useState('Login');
    const navigate = useNavigate();
    const handleLogin = () => {
        // Simular login e redirecionar para /theme
        navigate('/theme');
    };
    return (
        <div className='container'>
            <div className='header'>
                <div className='text'> {action} </div>
                <div className='underline'></div>
            </div>
            <div className='inputs'>
                {action === 'Login' ? <div></div> : <div className='input'>
                    <img src={user_icon} alt="" />
                    <input type='text' placeholder='UserName' />
                </div>}

                <div className='input'>
                    <img src={email_icon} alt="" />
                    <input type='email' placeholder='Email' />
                </div>

                <div className='input'>
                    <img src={password_icon} alt="" />
                    <input type='password' placeholder='Password' />
                </div>
            </div>
            {action === 'Sign Up' ? <div></div> : <div className="forgot-password">Lost password?  <span>Clik Here!</span></div>}
            <div className="submit-container">
            <div
                    className={action === 'Login' ? 'submit gray' : 'submit'}
                    onClick={() => {
                        if (action === 'Login') {
                            // Primeiro clique: muda para o estado "Sign Up"
                            setAction('Sign Up');
                        } else {
                            // Segundo clique: redireciona para /theme
                            navigate('/theme');
                        }
                    }}
                >
                    Sign Up
                </div>
                <div
                    className={action === 'Sign Up' ? 'submit gray' : 'submit'}
                    onClick={() => {
                        if (action === 'Sign Up') {
                            // Primeiro clique: muda para o estado "Login"
                            setAction('Login');
                        } else {
                            // Segundo clique: redireciona para /theme
                            navigate('/theme');
                        }
                    }}
                >
                    Login
                </div>

            </div>
        </div>
    )
}


export default LoginSignup  
