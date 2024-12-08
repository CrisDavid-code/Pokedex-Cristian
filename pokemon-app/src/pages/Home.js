// Home.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/Home.css';

const Home = () => {
  const [pokemons, setPokemons] = useState([]);
  const [totalPokemons, setTotalPokemons] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [types, setTypes] = useState([]);
  const limit = 20;

  useEffect(() => {
    const fetchTypes = async () => {
      const response = await axios.get('https://pokeapi.co/api/v2/type');
      setTypes(response.data.results);
    };
    fetchTypes();
  }, []);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        if (search) {
          // Búsqueda individual
          const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`);
          setPokemons([
            {
              id: response.data.id,
              name: response.data.name,
              image: response.data.sprites.front_default,
              types: response.data.types.map((t) => t.type.name),
            },
          ]);
          setTotalPokemons(1); // Solo un Pokémon
        } else if (typeFilter) {
          // Filtro por tipo
          const response = await axios.get(`https://pokeapi.co/api/v2/type/${typeFilter}`);
          const allTypePokemons = response.data.pokemon.map((p) => p.pokemon);
          setTotalPokemons(allTypePokemons.length);

          const offset = (page - 1) * limit;
          const paginatedPokemons = allTypePokemons.slice(offset, offset + limit);

          const promises = paginatedPokemons.map(async (pokemon) => {
            const details = await axios.get(pokemon.url);
            return {
              id: details.data.id,
              name: details.data.name,
              image: details.data.sprites.front_default,
              types: details.data.types.map((t) => t.type.name),
            };
          });

          const pokemonData = await Promise.all(promises);
          setPokemons(pokemonData);
        } else {
          // Paginación normal
          const offset = (page - 1) * limit;
          const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
          setTotalPokemons(response.data.count);

          const promises = response.data.results.map(async (pokemon) => {
            const details = await axios.get(pokemon.url);
            return {
              id: details.data.id,
              name: pokemon.name,
              image: details.data.sprites.front_default,
              types: details.data.types.map((t) => t.type.name),
            };
          });

          const pokemonData = await Promise.all(promises);
          setPokemons(pokemonData);
        }
      } catch (error) {
        console.error('Error al obtener los Pokémon:', error);
        setPokemons([]); // Limpia los Pokémon si hay error
      }
    };

    fetchPokemons();
  }, [page, typeFilter, search]);

  const handleNextPage = () => {
    if (page < Math.ceil(totalPokemons / limit)) setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) setPage((prev) => prev - 1);
  };

  const handleTypeChange = (e) => {
    setTypeFilter(e.target.value);
    setPage(1); // Reinicia la página al cambiar de tipo
    setSearch(''); // Limpia la búsqueda
  };

  return (
    <div>
      <h1></h1>
      <div className="filters">
        <input
          type="text"
          placeholder="Buscar Pokémon..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1); // Reinicia la página al buscar
            setTypeFilter(''); // Limpia el filtro de tipo
          }}
          className="search-bar"
        />
        <select onChange={handleTypeChange} className="type-filter">
          <option value="">Todos los Tipos</option>
          {types.map((type, index) => (
            <option key={index} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
      </div>
      <div className="pokemon-grid">
        {pokemons.map((pokemon) => (
          <div key={pokemon.id} className="pokemon-card">
            <Link to={`/pokemon/${pokemon.id}`}>
              <img src={pokemon.image} alt={pokemon.name} />
              <p>{pokemon.name}</p>
              <div className="types">
                {pokemon.types.map((type, index) => (
                  <span key={index} className={`type ${type}`}>
                    {type}
                  </span>
                ))}
              </div>
            </Link>
          </div>
        ))}
      </div>
      {!search && (
        <div className="pagination">
          <button onClick={handlePrevPage} disabled={page === 1}>
            Anterior
          </button>
          <span>
            Página {page} de {Math.ceil(totalPokemons / limit)}
          </span>
          <button
            onClick={handleNextPage}
            disabled={page === Math.ceil(totalPokemons / limit)}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
