import React from 'react'
import './LoginSignup.css'

import user_icon from '../../assets/user.png'
import password_icon from '../../assets/password.png'
import email_icon from '../../assets/email.png'
import brain_image from '../../assets/imagemCerebro.png'




function LoginSignup() {
    const [action, setAction] = React.useState('Login');
    return (
        <div className="login-signup-wrapper">
            <div className="container">
                <div className="header">
                    <div className="text"> {action} </div>
                    <div className="underline"></div>
                </div>
                <div className="inputs">
                    {action === 'Login' ? <div></div> : <div className="input">
                        <img src={user_icon} alt="" />
                        <input type="text" placeholder="UserName" 
                         onFocus={(e) => (e.target.placeholder = '')} // Remove o placeholder ao focar
                         onBlur={(e) => (e.target.placeholder = 'UserName')} // Retorna o placeholder ao desfocar
                        />
                    </div>}
    
                    <div className="input">
                        <img src={email_icon} alt="" />
                        <input type="email" placeholder="Email"
                         onFocus={(e) => (e.target.placeholder = '')} // Remove o placeholder ao focar
                         onBlur={(e) => (e.target.placeholder = 'Email')} />
                    </div>
    
                    <div className="input">
                        <img src={password_icon} alt="" />
                        <input type="password" placeholder="Password" 
                         onFocus={(e) => (e.target.placeholder = '')} // Remove o placeholder ao focar
                         onBlur={(e) => (e.target.placeholder = 'Password')}/>
                    </div>
                </div>
                {action === 'Sign Up' ? <div></div> : <div className="forgot-password">Lost password? <span>Click Here!</span></div>}
                {action === 'Sign Up' ? <div className="sinup">Already have an account? <span
                onClick={() => { setAction('Login') }}>Login!</span></div> : 
                <div className="login">New here? <span
                onClick={() => { setAction('Sign Up') }}>Sign UP!</span></div>}



                <div className="submit-container">
                    <div className={action === 'Login' ? 'submit gray' : 'submit gray'} onClick={() => {  }}>{action}</div>
                    
                </div>
            </div>
            <div className="image-container">
                <img src={brain_image} alt="Side Illustration" />
            </div>
        </div>
    )
}


export default LoginSignup  

