import React, { useState, useEffect } from 'react';
import './Details.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const DetailsPage = () => {
    const { id } = useParams();
    const [sessionDetails, setSessionDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSessionDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/api/sessions/${id}`); 
                setSessionDetails(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message || 'Ocorreu um erro ao buscar os detalhes da sessão.');
                setLoading(false);
            }
        };

        fetchSessionDetails();
    }, [id]);

    const handleBackHome = () => {
        navigate('/home');
    };

    if (loading) {
        return <p>Carregando detalhes da sessão...</p>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    if (!sessionDetails) {
        return <p>Detalhes da sessão não encontrados.</p>;
    }

    return (
        <div className="details-page-container">
            <header className="main-header">
                <button className="logo2" onClick={handleBackHome}>br<span className="logo-i">A</span>in</button>
            </header>
            <div className="details-content-area">
                <section className="details-section">
                    <h2 className="details-title">{sessionDetails.tema}</h2>

                    <div className="details-info">
                        <p><strong>Duração:</strong> {sessionDetails.tempo}</p>
                        <p>
                            <strong>Participantes:</strong>{' '}
                            {sessionDetails.participantes && sessionDetails.participantes.length > 0
                                ? sessionDetails.participantes.map(user => user.username).join(', ')
                                : 'Nenhum participante'}
                        </p>
                        {sessionDetails.palavras && sessionDetails.palavras.length > 0 && (
                            <p><strong>Palavras do Brainstorm:</strong> {sessionDetails.palavras.join(', ')}</p>
                        )}
                        {sessionDetails.aiGeradoText && (
                            <div className="ai-generated-text-container">
                                <h3>Texto que foi gerado pela IA:</h3>
                                <textarea
                                    className="ai-generated-text"
                                    value={sessionDetails.aiGeradoText}
                                    readOnly
                                />
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default DetailsPage;