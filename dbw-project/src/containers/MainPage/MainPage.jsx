import React, { useState, useEffect } from 'react';
import './MainPage.css';
import brain_image from '../../assets/imagemCerebro.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importe o axios para fazer a requisição

const MainPage = () => {
  const [themes, setThemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/themes'); // Substitua pela sua rota para buscar os temas
        setThemes(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Ocorreu um erro ao buscar os temas.');
        setLoading(false);
      }
    };

    fetchThemes();
  }, []);

  const handleStartBrainstorm = () => {
    console.log('Brainstorm started!');
    navigate('/select_time_theme');
  };

  const handleDetails = (themeId) => {
    console.log(`Details for theme ${themeId}`);
    navigate(`/details/${themeId}`); 
  };

  const handleProfileClick = () => {
    console.log('Going to profile page');
    navigate('/profile');
  };

  return (
    <div className="main-page-layout">
      <header className="main-header">
        <div className="logo">br<span className="logo-i">A</span>in</div>
        <button className="profile-button" onClick={handleProfileClick}>👤</button>
      </header>

      <div className="content-area">
        <section className="last-brainstorms-section-compact">
          <h2>Temas e Tempos</h2>
          {loading ? (
            <p>Carregando temas...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : themes.length > 0 ? (
            <ul className="brainstorm-list-compact">
              {themes.map(themeItem => (
                <li key={themeItem._id || themeItem.id} className="brainstorm-item-compact">
                  <div className="brainstorm-info-compact">
                    <p><strong>Tema:</strong> {themeItem.tema.substring(0, 40)}{themeItem.tema.length > 40 ? '...' : ''}</p>
                    <p><strong>Tempo:</strong> {themeItem.tempo}</p>
                  </div>
                  <button className="details-button-compact" onClick={() => handleDetails(themeItem._id || themeItem.id)}>Details</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Nenhum tema encontrado.</p>
          )}
        </section>
      </div>

      <section className="start-brainstorm-section-bottom">
        <button className="start-button-large" onClick={handleStartBrainstorm}>Começar Brainstorm</button>
      </section>
    </div>
  );
};

export default MainPage;