// Favorites.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Favorites.css';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [pokemonDetails, setPokemonDetails] = useState([]);

  useEffect(() => {
    // Recuperar los IDs de favoritos desde localStorage
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);

    const fetchFavoritesDetails = async () => {
      try {
        const promises = storedFavorites.map((id) =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.json())
        );
        const results = await Promise.all(promises);
        setPokemonDetails(results);
      } catch (error) {
        console.error('Error al obtener detalles de favoritos:', error);
      }
    };

    fetchFavoritesDetails();
  }, []);

  const handleRemoveFavorite = (id) => {
    const updatedFavorites = favorites.filter((favId) => favId !== id);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
    setPokemonDetails(pokemonDetails.filter((pokemon) => pokemon.id !== id));
  };

  return (
    <div>
      <h1>Favoritos</h1>
      {pokemonDetails.length > 0 ? (
        <div className="pokemon-grid">
          {pokemonDetails.map((pokemon) => (
            <div key={pokemon.id} className="pokemon-card">
              <Link to={`/pokemon/${pokemon.id}`}>
                <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                <p>{pokemon.name}</p>
              </Link>
              <button
                onClick={() => handleRemoveFavorite(pokemon.id)}
                className="remove-button"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No tienes Pokémon en favoritos.</p>
      )}
    </div>
  );
};

export default Favorites;
