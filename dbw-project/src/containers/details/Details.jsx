import React from 'react';
import './Details.css';
import brain_image from '../../assets/imagemCerebro3.png';
import { useNavigate } from 'react-router-dom';


const DetailsPage = () => {
  // Simulação dos dados do brainstorm (vamos ter que ir busar os dados à BD com base no id do brainstorm) vou usar isto so para ser mais facil de ver
  const navigate = useNavigate();

  const brainstormDetails = {
    title: 'Ideias para novos produtos aaaaaaa',
    duration: '30 segundos',
    users: ['User1', 'User2', 'User3'],
    words: ['inovação', 'tecnologia', 'futuro', 'criatividade', 'solução'],
    aiGeneratedText:
      'Com base nas palavras-chave inovação, tecnologia, futuro, criatividade e solução, podemos gerar um texto que explora a criação de produtos disruptivos para o mercado vindouro. A tecnologia será a espinha dorsal dessas inovações, impulsionando soluções criativas que atendam às necessidades futuras dos usuários.',
  };
 
  const hadleBackHome = () => {
    // Redirecionar para a página inicial
    navigate('/home');
  }



  return (
    <div className="details-page-container">
      <header className="main-header">
        <button className="logo2" onClick={hadleBackHome}>br<span className="logo-i">A</span>in</button> 
        
      </header>
        <div className="details-content-area">
      <section className="details-section">
        <h2 className="details-title">{brainstormDetails.title}</h2>

        <div className="details-info">
          <p><strong>Duração:</strong> {brainstormDetails.duration}</p>
          <p><strong>Participantes:</strong> {brainstormDetails.users.join(', ')}</p>
          <p><strong>Palavras do Brainstorm:</strong> {brainstormDetails.words.join(', ')}</p>
        </div>

        <div className="ai-generated-text-container">
          <h3>Texto que foi gerado pela IA:</h3>
          <textarea
            className="ai-generated-text"
            value={brainstormDetails.aiGeneratedText}
            readOnly
          />
        </div>
      </section>

      
      </div>
    </div>
  );
};

export default DetailsPage;