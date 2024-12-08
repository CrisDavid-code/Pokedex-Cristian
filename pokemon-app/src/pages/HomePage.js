import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
        setPokemonList(response.data.results);
      } catch (error) {
        console.error('Error fetching Pokemon data', error);
      }
    };

    fetchPokemon();
  }, []);

  return (
    <div>
      <h1>Pokemon List</h1>
      <ul>
        {pokemonList.map((pokemon, index) => (
          <li key={index}>
            <Link to={`/pokemon/${index + 1}`}>{pokemon.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;