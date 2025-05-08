import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import './StyleBrainStormPage.css';
import brain_image from '../../assets/imagemCerebro.png';

const BrainstormingPage = () => {
  const location = useLocation();
  const { selectedTime, topic } = location.state || {};
  const [timer, setTimer] = useState(selectedTime || 60);
  const [isRunning, setIsRunning] = useState(true);
  const [words, setWords] = useState('');
  const wordsArray = words.split(/[,\n\r\s]+/).filter(word => word.trim() !== '');
  const timerInterval = useRef(null);
  const [onlineUsers, setOnlineUsers] = useState(['User1', 'User2', 'User3']); // Exemplo

  useEffect(() => {
    if (selectedTime === undefined || topic === undefined) {
      console.warn("No selected time or topic received. Using default values.");
    }
  }, [selectedTime, topic]);

  useEffect(() => {
    if (isRunning || timer > 0) {
      timerInterval.current = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(timerInterval.current);
      setIsRunning(false);
      console.log("Brainstorming session ended. Words:", wordsArray);
      // Implement your save logic here.
    }

    return () => clearInterval(timerInterval.current);
  }, [isRunning, timer, wordsArray]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const handleInputChange = (event) => {
    setWords(event.target.value);
  };

  const handlePauseResume = () => {
    setIsRunning(prevIsRunning => !prevIsRunning);
  };

  const handleEndSession = () => {
    clearInterval(timerInterval.current);
    setIsRunning(false);
    setTimer(0);
    // aqui tambem vai retornar as palavras que foram escritas
    // Implement your save logic here or navigation.
  };

  return (
    <div className="brainstorming-page" style={{ backgroundImage: `url(${brain_image})` }}>
      <div className="top-bar">
        <div className="logo">br<span className="logo-i">A</span>in</div>
       
      </div>

      <div className="topic-section">
        <h2 className="topic-title">Brainstorm!</h2>
        <p className="topic-text">{topic || "No topic selected"}</p>
        <p className="instructions">Brainstorm your ideas on the box until the time is over!</p>
      </div>


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
          <button className="control-button" onClick={handlePauseResume}>
            {isRunning ? 'Pause' : 'Resume'}
          </button>
          <button className="control-button end-button" onClick={handleEndSession}>
            End Session
          </button>
        </div>
      </div>

      
    </div>
  );
};

export default BrainstormingPage;