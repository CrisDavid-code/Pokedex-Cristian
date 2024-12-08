import axios from "axios";

const API_URL = "https://pokeapi.co/api/v2";

export const getPokemonList = async (offset, limit) => {
  const response = await axios.get(`${API_URL}/pokemon?offset=${offset}&limit=${limit}`);
  return response.data;
};

export const getPokemonDetails = async (url) => {
  const response = await axios.get(url);
  return response.data;
};
