import React from "react";
import { Link, useNavigate } from "react-router-dom";

function NavBar({ setisLogged }) {
  const navigate = useNavigate();
  return (
    <nav className="bg-blue-500 p-4 flex justify-between w-full">
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
      <button
        className="group h-fit relative w-fit flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={() => {
          localStorage.removeItem("currentUser");
          navigate("/login");
          setisLogged(false);
        }}
      >
        log out
      </button>
    </nav>
  );
}

export default NavBar;
