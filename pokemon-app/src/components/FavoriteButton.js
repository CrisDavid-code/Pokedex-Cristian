import React from 'react';

const FavoriteButton = ({ isFavorite, onClick }) => {
  return (
    <button
      style={{
        backgroundColor: isFavorite ? 'gold' : 'white',
        color: isFavorite ? 'black' : 'gold',
        border: '1px solid gold',
        borderRadius: '5px',
        cursor: 'pointer',
        padding: '5px 10px',
      }}
      onClick={onClick}
    >
      {isFavorite ? '★ Favorito' : '☆ Agregar'}
    </button>
  );
};

export default FavoriteButton;
