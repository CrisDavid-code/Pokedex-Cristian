// NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <h1>404 - Página No Encontrada</h1>
      <p>Lo sentimos, no pudimos encontrar lo que buscas.</p>
      <Link to="/">Volver a la Página Principal</Link>
    </div>
  );
};

export default NotFound;
