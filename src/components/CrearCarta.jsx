import React, { useState } from "react";
import GoBackButton from "./GoBackButton";

function CrearCarta() {
  const [formData, setFormData] = useState({
    peso: "",
    nombreMercancia: "",
    direccion: "",
    compania: "",
    personaEnvia: "",
    personaRecibe: "",
    caracteristicas: "",
    regulacion: "",
    valorAprox: "",
    tamano: "",
    esVivo: false,
    precioEstimado: "",
    datosRecepcion: "",
  });

  const handleChange = (e) => {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de envío de formulario
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
    <div className="w-full max-w-md bg-white p-6 rounded-lg flex flex-col items-center">
      <GoBackButton/>
      <h2 className="text-2xl mb-4 text-gray-800 mt-4">
          Crear Nueva Carta de Instrucción
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Campo: Peso */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="peso">
              Peso
            </label>
            <input
              type="text"
              id="peso"
              name="peso"
              onChange={handleChange}
              value={formData.peso}
              className="w-full p-2 border rounded bg-white text-black"
            />
          </div>

          {/* Campo: Nombre Mercancía */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="nombreMercancia"
            >
              Nombre de la Mercancía
            </label>
            <input
              type="text"
              id="nombreMercancia"
              name="nombreMercancia"
              onChange={handleChange}
              value={formData.nombreMercancia}
              className="w-full p-2 border rounded bg-white text-black"
            />
          </div>

          {/* Campo: Es Vivo */}
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              id="esVivo"
              name="esVivo"
              onChange={handleChange}
              checked={formData.esVivo}
              className="mr-2"
            />
            <label className="block text-sm font-medium" htmlFor="esVivo">
              ¿Es vivo?
            </label>
          </div>

          {/* Campo: Datos de Recepción */}
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="datosRecepcion"
            >
              Datos de Recepción
            </label>
            <textarea
              id="datosRecepcion"
              name="datosRecepcion"
              onChange={handleChange}
              value={formData.datosRecepcion}
              className="w-full p-2 border rounded bg-white text-black"
            />
          </div>

          {/* Botón de Envío */}
          <button
            type="submit"
            className="w-full p-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Crear Carta
          </button>
        </form>
      </div>
    </div>
  );
}

export default CrearCarta;
