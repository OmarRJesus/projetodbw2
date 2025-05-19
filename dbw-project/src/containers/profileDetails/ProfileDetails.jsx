import React, { useState, useEffect } from 'react';
import './ProfileDetails.css'; 
import { useNavigate } from 'react-router-dom';

const UserProfilePage = () => {

  const navigate = useNavigate();


  const formatTotalBrainstormTime = (totalSeconds) => {
    if (isNaN(totalSeconds) || totalSeconds < 0) {
      return '0h 0m 0s';
    }

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
  };


  const [userData, setUserData] = useState({
    username: '',
    email: '',
    totalBrainstormTime: 365400, 
  });


  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUserData({
          ...parsedUser,
          totalBrainstormTime: parseInt(parsedUser.totalBrainstormTime || 0, 10), 
        });
      } catch (error) {
        console.error('Erro ao analisar os dados do usuário:', error);
        localStorage.removeItem('user');
        setUserData({
          username: '',
          email: '',
          totalBrainstormTime: 0,
        });
      }
    } else {
   
      setUserData({
        username: '',
        email: '',
        totalBrainstormTime: 0,
      });
    }
  }, []);

  const handleSair = () => {
    navigate('/home'); 
  }
  const handleLogout = () => {
    localStorage.removeItem('user'); 
    navigate('/login'); 
  }
  const handleEdit = () => { 
    navigate('/edit'); 
  }

  return (
    <div className="user-profile-page">
      <div className="profile-container">
        <h2 className="profile-title">Perfil</h2>

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

          
        </div>

        
        <button className="edit-profile-button" onClick={handleEdit}>Editar Perfil</button>
        <button className="back-button" onClick={handleSair}>Voltar</button>
        <button className="logout-button" onClick={handleLogout}>Sair</button>

      </div>
    </div>
  );
};

export default UserProfilePage;