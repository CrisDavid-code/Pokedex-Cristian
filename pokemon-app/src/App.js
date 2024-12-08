import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import PokemonDetails from './pages/PokemonDetails';
import NotFound from './pages/NotFound'; // Importar el archivo

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/pokemon/:id" element={<PokemonDetails />} />
        <Route path="*" element={<NotFound />} /> {/* Ruta de error */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
