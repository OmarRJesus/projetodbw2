import React from 'react';
import './LoadingIndicator.css'; 

const LoadingIndicator = () => {
    return (
        <div className="loading-indicator">
            <div className="loading-spinner"></div>
            <p>Analyzing...</p>
        </div>
    );
};

export default LoadingIndicator;