// PokemonCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './PokemonCard.css';

const PokemonCard = ({ id, name, image, types }) => {
  return (
    <div className="pokemon-card">
      <Link to={`/pokemon/${id}`}>
        <img src={image} alt={name} />
        <p>{name}</p>
        <div className="types">
          {types.map((type, index) => (
            <span key={index} className={`type ${type}`}>
              {type}
            </span>
          ))}
        </div>
      </Link>
    </div>
  );
};

export default PokemonCard;
