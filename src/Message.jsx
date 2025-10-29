import './App.css';
import React from 'react';

const Message = ({ message, isPositive }) => {
  return (
    <div className={`message ${isPositive ? 'positive' : 'negative'}`}>
      {message}
    </div>
  );
};

export default Message;