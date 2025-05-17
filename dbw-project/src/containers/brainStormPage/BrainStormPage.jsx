import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './StyleBrainStormPage.css';
import brain_image from '../../assets/imagemCerebro.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingIndicator from "../LoadingProcess/loadingIndicator.jsx"; // Import the loading indicator component

const BrainStormingPage = () => {
  const location = useLocation();
  const { selectedTime, topic } = location.state || {};
  const [timer, setTimer] = useState(selectedTime || 60);
  const [isRunning, setIsRunning] = useState(true);
  const [words, setWords] = useState('');
  const [userData, setUserData] = useState({ username: '' });
  const [onlineUsers, setOnlineUsers] = useState([]);
  const wordsArray = words.split(/[,\n\r\s]+/).filter(word => word.trim() !== '');
  const timerInterval = useRef(null);
  const navigate = useNavigate();
  const [aiResponse, setAiResponse] = useState('');
  const [isSessionEnded, setIsSessionEnded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false); // New state for processing
  const [hasAnalysisBeenPerformed, setHasAnalysisBeenPerformed] = useState(false);

  useEffect(() => {
    const fetchOnlineUsers = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUserData(parsedUser);

          const response = await axios.post('http://localhost:3001/api/Users/online', {
            params: { loggedInUser: parsedUser.username },
          });
          setOnlineUsers(response.data.onlineUsers);
        }
      } catch (error) {
        console.error('Erro ao buscar usuários online:', error);
      }
    };

    fetchOnlineUsers();
  }, []);

  useEffect(() => {
    if (isRunning && timer > 0) {
      timerInterval.current = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(timerInterval.current);
      setIsRunning(false);
      setIsSessionEnded(true);
      console.log("Brainstorming session ended. Words:", wordsArray);
      if (wordsArray.length > 0 && !hasAnalysisBeenPerformed) {
        processBrainstorm(wordsArray, topic);
        setHasAnalysisBeenPerformed(true);
      } else if (wordsArray.length === 0 && !hasAnalysisBeenPerformed) {
        setAiResponse("Nenhum tópico foi inserido durante a sessão.");
        setHasAnalysisBeenPerformed(true);
      }
    }
    return () => clearInterval(timerInterval.current);
  }, [isRunning, timer, wordsArray, navigate, topic, hasAnalysisBeenPerformed]);

  const processBrainstorm = async (topics, currentTopic) => {
    setIsProcessing(true);
    setAiResponse('');
    try {
      console.log("Sending request to:", '/api/brainstorm/analyze');
      console.log("Data being sent:", { topics: topics, topic: currentTopic });

      const response = await fetch('http://localhost:3001/api/brainstorm/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topics: topics,
          topic: currentTopic,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          break;
        }
        const chunk = decoder.decode(value);
        setAiResponse((prevResponse) => prevResponse + chunk);
      }

      setHasAnalysisBeenPerformed(true);
      setIsProcessing(false);

    } catch (error) {
      console.error('Error processing brainstorm:', error);
      setAiResponse('Error processing brainstorm.');
      setIsProcessing(false);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const handleInputChange = (event) => {
    setWords(event.target.value);
  };

  const handlePauseResume = () => {
    if (timer > 0) {
      setIsRunning(prevIsRunning => !prevIsRunning);
    }
  };

  const handleEndSession = () => {
    clearInterval(timerInterval.current);
    setIsRunning(false);
    setTimer(0);
    setIsSessionEnded(true);
    if (wordsArray.length > 0 && !hasAnalysisBeenPerformed) {
      processBrainstorm(wordsArray, topic);
      setHasAnalysisBeenPerformed(true);
    } else if (wordsArray.length === 0 && !hasAnalysisBeenPerformed) {
      setAiResponse("Nenhum tópico foi inserido durante a sessão.");
      setHasAnalysisBeenPerformed(true);
    }
  };

const handleGoHome = async () => {
  if (isSessionEnded && hasAnalysisBeenPerformed) {
    try {
      const token = localStorage.getItem('authToken');
      const storedUser = localStorage.getItem('user');
      const userData = storedUser ? JSON.parse(storedUser) : null;
      const userId = userData?._id; // Assumindo que o _id do usuário está armazenado

      await axios.post('http://localhost:3001/api/brainstorm/salvar', {
        topic: topic,
        wordsArray: wordsArray,
        aiResponse: aiResponse,
        selectedTime: selectedTime,
        criadorId: userId, // Envie o userId
        username: userData?.username, // Opcional: envie o nome de usuário também
      }, {
        headers: {
          Authorization: `Bearer ${token}`, // Ainda pode enviar o token para outras finalidades
        },
      });
      navigate('/home');
    } catch (error) {
      console.error("Erro ao salvar o brainstorm:", error);
      navigate('/home');
    }
  } else {
    navigate('/home');
  }
};

  return (
    <div className="brainstorming-page" style={{ backgroundImage: `url(${brain_image})` }}>
      <div className="top-bar">
        <div className="logo">br<span className="logo-i">A</span>in</div>
        <div className="user-info">Bem-vindo, {userData.username || 'Usuário'}!</div>
      </div>

      <div className="topic-section">
        <h2 className="topic-title">Brainstorm!</h2>
        <p className="topic-text">{topic || "No topic selected"}</p>
        <p className="instructions">Brainstorm your ideas on the box until the time is over!</p>
      </div>

      {!isSessionEnded ? (
        <>
          <div className="users-online-container">
            <h3 className="users-online-title">Online Users</h3>
            <ul className="users-online-list">
              {onlineUsers.map((user, index) => (
                <li key={index}>{user}</li>
              ))}
            </ul>
          </div>

          <div className="input-container">
            <textarea
              className="words-input"
              placeholder="Enter your brainstormed words separated by commas, newlines, or spaces..."
              value={words}
              onChange={handleInputChange}
            />
          </div>

          <div className="timer-container">
            <div className="timer">{formatTime(timer)}</div>
            <div className="controls">
              <button className="control-button" onClick={handlePauseResume} disabled={isSessionEnded}>
                {isRunning ? 'Pause' : 'Resume'}
              </button>
              <button className="control-button end-button" onClick={handleEndSession} disabled={isSessionEnded}>
                End Session
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="ai-response-container">
          <h2 className="ai-response-title">Resultado da IA</h2>
          {isProcessing ? (
            <LoadingIndicator /> // Or some other loading display
          ) : (
            <div className="ai-response-text">{aiResponse}</div>
          )}
          <button className="control-button" onClick={handleGoHome}>Voltar para Home</button>
        </div>
      )}
    </div>
  );
};

export default BrainStormingPage;