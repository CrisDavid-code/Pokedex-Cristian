import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './PokemonDetails.css';

// Registrar componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const PokemonDetails = () => {
  const { id } = useParams();
  const [pokemonData, setPokemonData] = useState({
    pokemon: null,
    evolutions: [],
    isFavorite: false,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const speciesResponse = await axios.get(response.data.species.url);
        const evolutionResponse = await axios.get(speciesResponse.data.evolution_chain.url);

        const evolutions = extractEvolutions(evolutionResponse.data.chain);

        const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
        const isFavorite = favorites.includes(response.data.id);

        setPokemonData({
          pokemon: response.data,
          evolutions,
          isFavorite,
        });
      } catch (error) {
        console.error('Error al obtener detalles del Pokémon:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetails();
  }, [id]);

  const extractEvolutions = (chain) => {
    const evoChain = [];
    let current = chain;

    do {
      evoChain.push({
        name: current.species.name,
        id: current.species.url.split('/').filter(Boolean).pop(), // Extraer ID directamente
      });
      current = current.evolves_to[0];
    } while (current);

    return evoChain;
  };

  const handleFavoriteToggle = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const { pokemon, isFavorite } = pokemonData;

    if (isFavorite) {
      const updatedFavorites = favorites.filter((favId) => favId !== pokemon.id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      favorites.push(pokemon.id);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }

    setPokemonData((prevData) => ({
      ...prevData,
      isFavorite: !prevData.isFavorite,
    }));
  };

  const getBackgroundGradient = (types) => {
    const typeColors = {
      grass: '#78c850',
      fire: '#f08030',
      water: '#6890f0',
      electric: '#f8d030',
      normal: '#a8a878',
      poison: '#a040a0',
      flying: '#a890f0',
      bug: '#a8b820',
      ground: '#e0c068',
      psychic: '#f85888',
      rock: '#b8a038',
      ice: '#98d8d8',
      dragon: '#7038f8',
      dark: '#705848',
      steel: '#b8b8d0',
      fairy: '#ee99ac',
    };

    const primaryType = types[0].type.name;
    return typeColors[primaryType] || '#a8a878'; // Color por defecto
  };

  if (loading) return <p>Cargando...</p>;

  if (!pokemonData.pokemon) return <p>No se encontró el Pokémon.</p>;

  const { pokemon, evolutions, isFavorite } = pokemonData;

  const data = {
    labels: ['HP', 'Ataque', 'Defensa', 'Ataque Especial', 'Defensa Especial', 'Velocidad'],
    datasets: [
      {
        label: 'Estadísticas Base',
        data: pokemon.stats.map((stat) => stat.base_stat),
        backgroundColor: [
          'rgba(54, 162, 235, 0.5)', // Azul
          'rgba(255, 99, 132, 0.5)', // Rojo
          'rgba(255, 206, 86, 0.5)', // Amarillo
          'rgba(75, 192, 192, 0.5)', // Verde
          'rgba(153, 102, 255, 0.5)', // Morado
          'rgba(255, 159, 64, 0.5)', // Naranja
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)', // Azul
          'rgba(255, 99, 132, 1)', // Rojo
          'rgba(255, 206, 86, 1)', // Amarillo
          'rgba(75, 192, 192, 1)', // Verde
          'rgba(153, 102, 255, 1)', // Morado
          'rgba(255, 159, 64, 1)', // Naranja
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Estadísticas Base',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Atributos',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Valores',
        },
      },
    },
  };

  return (
    <div
      className="pokemon-details"
      style={{ background: `linear-gradient(135deg, ${getBackgroundGradient(pokemon.types)}, #f5f5f5)` }}
    >
      <h1>
        {pokemon.name} (#{pokemon.id})
      </h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>Altura: {(pokemon.height / 10).toFixed(1)} m</p>
      <p>Peso: {(pokemon.weight / 10).toFixed(1)} kg</p>
      <div className="types">
        {pokemon.types.map((type, index) => (
          <span key={index} className={`type ${type.type.name}`}>
            {type.type.name}
          </span>
        ))}
      </div>

      {/* Gráfico de estadísticas */}
      <h2>Estadísticas Base</h2>
      <div className="chart-container">
        <Bar data={data} options={options} />
      </div>

      {/* Evoluciones */}
      <h2>Evoluciones</h2>
      <div className="evolutions">
        {evolutions.map((evo, index) => (
          <div key={index} className="evolution">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evo.id}.png`}
              alt={evo.name}
              onError={(e) => (e.target.src = '/fallback.png')} // Fallback en caso de error
            />
            <p>{evo.name}</p>
          </div>
        ))}
      </div>

      <div className="button-container">
        <button
          onClick={handleFavoriteToggle}
          className={`favorite-button ${isFavorite ? 'remove' : 'add'}`}
        >
          {isFavorite ? 'Eliminar de Favoritos' : 'Agregar a Favoritos'}
        </button>
        <Link to="/" className="back-button">
          Volver
        </Link>
      </div>
    </div>
  );
};

export default PokemonDetails;