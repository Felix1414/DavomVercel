import React from 'react';
import ReactDOM from 'react-dom';
import ChatInterface from './path/to/chat-interface';
import './styles.css'; // Si tienes estilos globales

ReactDOM.render(
  <React.StrictMode>
    <ChatInterface />
  </React.StrictMode>,
  document.getElementById('root')
);
