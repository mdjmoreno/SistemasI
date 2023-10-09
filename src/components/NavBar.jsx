import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="bg-blue-500 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/lista-cartas" className="text-white">
            Lista de Cartas
          </Link>
        </li>
        <li>
          <Link to="/crear-carta" className="text-white">
            Crear Nueva Carta
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
