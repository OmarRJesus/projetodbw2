import React, { useState, useEffect } from 'react';
import './ProfileDetails.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importe useNavigate

const EditProfilePage = () => {
    const [user, setUser] = useState({
        username: '',
        email: ''
    });

    const [isEditing, setIsEditing] = useState(true);
    const [newUsername, setNewUsername] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const navigate = useNavigate(); // Inicialize useNavigate

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
            setNewUsername(storedUser.username);
            setNewEmail(storedUser.email);
        }
    }, []);

    const handleSave = async () => {
        try {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (!storedUser || !storedUser._id) {
                alert('ID do usuário não encontrado!');
                return;
            }
            const response = await axios.put(
                `http://localhost:3001/api/Users/${storedUser._id}`,
                {
                    email: newEmail,
                    username: newUsername
                }
            );

            // Atualizar o estado e localStorage com os novos dados recebidos do backend
            localStorage.setItem('user', JSON.stringify(response.data.user));
            setUser(response.data.user);
            setIsEditing(false);
            alert('Perfil atualizado com sucesso!');
            navigate('/profile'); // Redireciona de volta para a página de perfil para forçar uma atualização
        } catch (error) {
            console.error('Erro ao atualizar os dados:', error);
            alert('Erro ao atualizar perfil!');
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setNewUsername(user.username);
        setNewEmail(user.email);
        navigate('/profile'); // Redireciona de volta para a página de perfil sem salvar
    };

    return (
        <div className="user-profile-page">
            <div className="profile-container">
                <h2 className="profile-title">Editar Perfil</h2>

                <div className="profile-info">
                    <div className="info-item">
                        <span className="info-label">Novo Nome de Utilizador:</span>
                        <input
                            type="text"
                            className="info-value"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                        />
                    </div>
                    <div className="info-item">
                        <span className="info-label">Novo Email:</span>
                        <input
                            type="email"
                            className="info-value"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                        />
                    </div>
                </div>

                <div className="profile-actions">
                    <button className="edit-profile-button" onClick={handleSave}>Salvar Alterações</button>
                    <button className="back-button" onClick={handleCancel}>Cancelar</button>
                </div>
            </div>
        </div>
    );
};

export default EditProfilePage;