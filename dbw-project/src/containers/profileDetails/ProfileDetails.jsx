import React, { useState, useEffect } from 'react';
import './ProfileDetails.css'; // Crie este arquivo CSS para estilização
import { useNavigate } from 'react-router-dom';

const UserProfilePage = () => {

  const navigate = useNavigate();
  // Dados do usuário (simulados - em uma aplicação real, você buscaria esses dados de um backend)

  const formatTotalBrainstormTime = (totalSeconds) => {
    if (isNaN(totalSeconds) || totalSeconds < 0) {
      return '0h 0m 0s'; // Valor padrão para casos inválidos
    }

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
  };


  const [userData, setUserData] = useState({
    username: '',
    email: '',
    totalBrainstormTime: 365400, // Tempo total em segundos (ex: 101 horas e 30 minutos)
  });

  // Recupera os dados do usuário do localStorage armazenados no frontend
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserData({
          ...parsedUser,
          totalBrainstormTime: parseInt(parsedUser.totalBrainstormTime || 0, 10), // Garante que seja um número
        });
      } catch (error) {
        console.error('Erro ao analisar os dados do usuário:', error);
        localStorage.removeItem('user'); // Remove dados inválidos
        setUserData({
          username: '',
          email: '',
          totalBrainstormTime: 0,
        });
      }
    } else {
      // Redefine o estado se não houver dados no localStorage
      setUserData({
        username: '',
        email: '',
        totalBrainstormTime: 0,
      });
    }
  }, []);

  const handleSair = () => {
    navigate('/home'); // Redireciona para a página de login após sair
  }
  const handleLogout = () => {
    localStorage.removeItem('user'); // Limpa os dados do usuário do localStorage
    navigate('/login'); // Redireciona para a página de login após sair
  }
  const handleEdit = () => { // Limpa os dados do usuário do localStorage
    navigate('/edit'); // Redireciona para a página de login após sair
  }

  return (
    <div className="user-profile-page">
      <div className="profile-container">
        <h2 className="profile-title">Profile</h2>

        <div className="profile-info">
          <div className="info-item">
            <span className="info-label">Nome de Utilizador:</span>
            <span className="info-value">{userData.username}</span>
          </div>

          <div className="info-item">
            <span className="info-label">Email:</span>
            <span className="info-value">{userData.email}</span>
          </div>

          <div className="info-item">
            <span className="info-label">Tempo Total de Brainstorms:</span>
            <span className="info-value">
              {formatTotalBrainstormTime(userData.totalBrainstormTime)}
            </span>
          </div>

          {/* Outras informações do perfil podem ser adicionadas aqui */}
        </div>

        {/* Adicione botões ou links para editar o perfil, sair, etc., se necessário */}
        <button className="edit-profile-button" onClick={handleEdit}>Editar Perfil</button>
        <button className="back-button" onClick={handleSair}>Voltar</button>
        <button className="logout-button" onClick={handleLogout}>Sair</button>

      </div>
    </div>
  );
};

export default UserProfilePage;