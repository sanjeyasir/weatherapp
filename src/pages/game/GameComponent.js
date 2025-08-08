// src/Card.js
import React from 'react';

export default function GameComponent({ emoji, isFlipped, onClick, isMatched }) {
  return (
    <div
      onClick={onClick}
      style={{
        width: 80,
        height: 80,
        margin: 10,
        fontSize: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isFlipped || isMatched ? '#fff' : '#333',
        color: isFlipped || isMatched ? '#000' : '#333',
        borderRadius: 8,
        cursor: isFlipped || isMatched ? 'default' : 'pointer',
        userSelect: 'none',
        boxShadow: isMatched ? '0 0 10px 3px #4caf50' : 'none',
        transition: 'background-color 0.3s',
      }}
    >
      {isFlipped || isMatched ? emoji : ''}
    </div>
  );
}
