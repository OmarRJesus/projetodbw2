import React, { useState, useEffect } from 'react';
import './ProfileDetails.css'; // Crie este arquivo CSS para estilização
import { useNavigate } from 'react-router-dom';

const UserProfilePage = () => {

    const navigate = useNavigate();
  // Dados do usuário (simulados - em uma aplicação real, você buscaria esses dados de um backend)
  const [userData, setUserData] = useState({
    username: 'NomeDeUsuarioExemplo',
    email: 'email.exemplo@dominio.com',
    totalBrainstormTime: 365400, // Tempo total em segundos (ex: 101 horas e 30 minutos)
  });

  // Função para formatar o tempo total de brainstorm em um formato legível
  const formatTotalBrainstormTime = (totalSeconds) => {
    const totalMinutes = Math.floor(totalSeconds / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours} horas e ${String(minutes).padStart(2, '0')} minutos`;
  };

  const handleSair = () => { 
    // Aqui você pode adicionar a lógica para sair do usuário, como limpar o token de autenticação
    navigate('/home'); // Redireciona para a página de login após sair
  }
const handleLogout = () => {
    
    navigate('/login'); // Redireciona para a página de login após sair
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
         <button className="edit-profile-button">Editar Perfil</button> 
         <button className="back-button" onClick={handleSair}>Voltar</button>
         <button className="logout-button" onClick={handleLogout}>Sair</button> 
         
      </div>
    </div>
  );
};

export default UserProfilePage;