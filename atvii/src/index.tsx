import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Inclua o arquivo de estilos do Tailwind
import Roteador from './componentes/roteador';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Roteador />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
