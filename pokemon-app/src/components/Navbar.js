import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <h1 style={styles.title}>Pokédex</h1>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>
          Inicio
        </Link>
        <Link to="/favorites" style={styles.link}>
          Favoritos
        </Link>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#1ab4cf',
    color: 'white',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  },
  title: {
    fontSize: '24px',
    margin: 0,
  },
  links: {
    display: 'flex',
    gap: '15px',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '18px',
  },
};

export default Navbar;
