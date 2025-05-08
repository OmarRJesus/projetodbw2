import React, { useState, useEffect } from 'react';
import './MainPage.css';
import brain_image from '../../assets/imagemCerebro.png';

const MainPage = () => {
  const [lastBrainstorms, setLastBrainstorms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBrainstorms = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1500));

        const dataFromDatabase = [
          { id: 1, theme: 'Ideias para novos produtos', duration: '30 segundos', time: '12:00', date: '2025-05-06' },
          { id: 2, theme: 'Soluções para o problema X', duration: '1 minuto', time: '18:30', date: '2025-05-05' },
        ];

        setLastBrainstorms(dataFromDatabase);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Ocorreu um erro ao buscar os dados.');
        setLoading(false);
      }
    };

    fetchBrainstorms();
  }, []);

  const handleStartBrainstorm = () => {
    console.log('Brainstorm started!');
    // Redirecionar para a página de brainstorming
  };

  const handleDetailsClick = (brainstormId) => {
    console.log(`Details for brainstorm ${brainstormId}`);
    // Redirecionar para a página de detalhes
  };

  const handleProfileClick = () => {
    console.log('Going to profile page');
    // Redirecionar para a página de perfil
  };

  return (
    <div className="main-page-layout">
      <header className="main-header">
        <div className="logo">br<span className="logo-i">A</span>in</div>
        <button className="profile-button" onClick={handleProfileClick}>👤</button>
      </header>

      <div className="content-area">
        <section className="last-brainstorms-section-compact">
          <h2>Últimos Brainstorms</h2>
          {loading ? (
            <p>Carregando...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : lastBrainstorms.length > 0 ? (
            <ul className="brainstorm-list-compact">
              {lastBrainstorms.map(brainstorm => (
                <li key={brainstorm.id} className="brainstorm-item-compact">
                  <div className="brainstorm-info-compact">
                    <p><strong>Tema:</strong> {brainstorm.theme.substring(0, 15)}{brainstorm.theme.length > 15 ? '...' : ''}</p>
                    <p><strong>Tempo:</strong> {brainstorm.time.substring(0, 5)}</p>
                  </div>
                  <button className="details-button-compact" onClick={() => handleDetailsClick(brainstorm.id)}>Details</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Ainda não temos dados.</p>
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