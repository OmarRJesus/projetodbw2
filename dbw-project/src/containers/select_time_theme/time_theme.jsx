import React, { useState } from 'react';
import './time_theme.css';
import brain_image from '../../assets/imagemCerebro.png';
import { useNavigate } from 'react-router-dom';



const ThemeSelector = () => {
  const [theme, setTheme] = useState('');   
  const [time, setTime] = useState(''); 
  const navigate = useNavigate(); 
  const handleSubmit = (e) => {
    e.preventDefault();
    
    
    
    console.log('Dados a serem enviados para a BD:', { theme, time }); 
    navigate('/brainstorm', { state: { selectedTime: time, topic: theme } }); 

  };

//
  const hadleBackHome = () => {
    
    navigate('/home');
  }
  return (
    <div className='time-theme-container'>
      <header className="main-header">
        <button className="logo2" onClick={hadleBackHome}>br<span className="logo-i">A</span>in</button> 
        
      </header>
    <div className="main-container"> 
      
      <div className="container">
        
        <div className="form-section">
          <h2 className="title">Seleção do Tema e do tempo</h2>
          <form onSubmit={handleSubmit}> 
            <div className="input-group">
              <span className="icon">🧠</span>
              <input
                type="text"
                placeholder="Digite o tema"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                onFocus={(e) => (e.target.placeholder = '')} 
                onBlur={(e) => (e.target.placeholder = 'Digite o tema')} 
                required 
              />
            </div>

            <div className="input-group">
              <span className="icon">⏰</span>
              <select
                value={time}
                onChange={(e) => setTime(e.target.value)}
                required
              >
                <option value="">Selecione o tempo</option>
                <option value="15">15 segundos</option>
                <option value="30">30 segundos</option>
                <option value="45">45 segundos</option>
                <option value="60">1 minuto</option>
              </select>
            </div>

            <button className="submit-btn" type="submit">Confirmar</button>
          </form>
        </div>

        
      </div>
      <div className="image-section">
          <img src={brain_image} alt="imagem-cerebro-login" /> 
        </div>
    </div>
</div>  );
};

export default ThemeSelector;