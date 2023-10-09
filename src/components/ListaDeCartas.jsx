import React, { useState, useEffect } from 'react';
import GoBackButton from './GoBackButton';
// Usar axios o fetch para cargar los datos de las cartas desde un servidor/API

function ListaDeCartas() {
  const [cartas, setCartas] = useState([]);

  console.log('mariana');

  useEffect(() => {
    // Aquí tu lógica para cargar las cartas desde tu servidor/API
  
    // axios.get('/api/cartas').then((response) => setCartas(response.data));
  }, []);

  return (
    <div className="p-4">
        <GoBackButton/>
      <h2 className="text-2xl mb-4">Lista de Cartas de Instrucción</h2>
      <ul>
        {cartas.map((carta) => (
          <li key={carta.id} className="mb-2">
            {carta.nombre} - Enviado a: {carta.destinatario}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaDeCartas;
