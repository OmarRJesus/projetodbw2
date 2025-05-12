import React, { useState } from 'react';
import './time_theme.css';
import brain_image from '../../assets/imagemCerebro.png';
import { useNavigate } from 'react-router-dom';

// TODO: fazer a pagina de selecao do tema e do tempo que vamos poder estar na sala
// para isso vamos criar um input onde vamos poder escrever o tema e posteriormente guardar esse valor do tipo String na nossa BD, depois criamos uma caixa de selecao onde vamos poder escolher o tempo que vamos estar na sala, e depois guardamos esse valor do tipo int na nossa BD

const ThemeSelector = () => {
  const [theme, setTheme] = useState('');   // usamos esta variavel para guardar o tema que vamos escolher
  const [time, setTime] = useState(''); // usamos esta variavel para guardar o tempo que vamos escolher
  const navigate = useNavigate(); // Usado para navegar entre páginas
  const handleSubmit = (e) => {
    e.preventDefault();
    //alert(`Tema escolhido: ${theme}\nTempo escolhido: ${time}`);
    
    // aqui temos de adiconar a logica para guardar os dados na BD, quer do tema quer do tempo
    console.log('Dados a serem enviados para a BD:', { theme, time }); // assim conseguimos ver os dados que estamos a enviar para a BD
    navigate('/brainstorm', { state: { selectedTime: time, topic: theme } }); // Redireciona para a página de brainstorming com os dados do tema e do tempo

  };

//
  const hadleBackHome = () => {
    // Redirecionar para a página inicial
    navigate('/home');
  }
  return (
    <div className='time-theme-container'>
      <header className="main-header">
        <button className="logo2" onClick={hadleBackHome}>br<span className="logo-i">A</span>in</button> 
        
      </header>
    <div className="main-container"> {/* Novo container principal */}
      
      <div className="container">
        
        <div className="form-section">
          <h2 className="title">Seleção do Tema e do tempo</h2>
          <form onSubmit={handleSubmit}> {/* Adicionando o evento de submit */}
            <div className="input-group">
              <span className="icon">🧠</span>
              <input
                type="text"
                placeholder="Digite o tema"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                onFocus={(e) => (e.target.placeholder = '')} // Remove o placeholder ao focar
                onBlur={(e) => (e.target.placeholder = 'Digite o tema')} // Retorna o placeholder ao desfocar (corrigido)
                required // assim garantimos que o elemento é obrigatório e nao comecamos o brainstorm sem que tenhamos um tema e tambem o tempo no caso abaixo
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
          <img src={brain_image} alt="imagem-cerebro-login" /> {/* Alt text mais descritivo */}
        </div>
    </div>
</div>  );
};

export default ThemeSelector;