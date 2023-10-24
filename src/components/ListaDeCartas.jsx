import React, { useState, useEffect } from "react";
import GoBackButton from "./GoBackButton";
import html2pdf from "html2pdf.js";
import axios from "axios";

const url = "http://nowports-api.test/api/instruction-cards";

const mockCartas = [
  {
    id: 1,
    nombre: "Carta 1",
    tipo: "empresa",
    direccion: "Calle 123, Ciudad X",
    telefono: "+1234567890",
    email: "carta1@ejemplo.com",
    ubicacion: "Puerto Y",
    tipoUbicacion: "puerto",
    horario: "9AM - 5PM",
    descripcion: "Instrucciones para importación de ropa.",
    peso: "10kg",
    volumen: "5m3",
    valor: "$1000",
    categoria: "ropa",
    fechaEmision: "2023-10-10",
    fechaValidez: "2023-12-10",
    estado: "pendiente",
    observaciones: "Revisar documentos adjuntos.",
  },
  {
    id: 2,
    nombre: "Carta 2",
    tipo: "individual",
    direccion: "Avenida 456, Ciudad Z",
    telefono: "+0987654321",
    email: "carta2@ejemplo.com",
    ubicacion: "Aduana A",
    tipoUbicacion: "aduana",
    horario: "10AM - 6PM",
    descripcion: "Instrucciones para exportación de electrónicos.",
    peso: "20kg",
    volumen: "10m3",
    valor: "$2000",
    categoria: "electrónico",
    fechaEmision: "2023-09-05",
    fechaValidez: "2023-11-05",
    estado: "aprobada",
    observaciones: "Validar con sello oficial.",
  },
  {
    id: 3,
    nombre: "Carta 3",
    tipo: "empresa",
    direccion: "Bulevar 789, Ciudad W",
    telefono: "+1122334455",
    email: "carta3@ejemplo.com",
    ubicacion: "Puerto B",
    tipoUbicacion: "puerto",
    horario: "8AM - 4PM",
    descripcion: "Instrucciones para importación de alimentos.",
    peso: "30kg",
    volumen: "15m3",
    valor: "$3000",
    categoria: "alimentos",
    fechaEmision: "2023-08-15",
    fechaValidez: "2023-10-15",
    estado: "rechazada",
    observaciones: "Falta certificado sanitario.",
  },
];

function ListaDeCartas() {
  const [cartas, setCartas] = useState([]);
  const [searchId, setSearchId] = useState("");
  const [selectedCarta, setSelectedCarta] = useState(null);

  const getLetters = async () => {
    try {
      const { data } = await axios.get(url);
      console.log(data.data);
      setCartas(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLetters();
  }, []);

  useEffect(() => {
    if (searchId) {
      const carta = cartas.find((carta) => carta.id.toString() === searchId);
      setSelectedCarta(carta);
    } else {
      setSelectedCarta(null);
    }
  }, [searchId, cartas]);

  function exportToPdf() {
    const element = document.getElementById("cartaDetalle");
    html2pdf().from(element).save();
  }

  return (
    <div className="flex flex-col justify-center items-center h-screen p-4 bg-gray-100">
      <div id="carta" className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <GoBackButton />
        <h2 className="text-2xl mb-4">Carta de Instrucción</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar por ID de Carta"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="p-2 border rounded-lg w-full"
          />
        </div>
        {selectedCarta && (
          <div id="cartaDetalle" className="divide-y divide-gray-200">
            <p>
              <strong>Tipo de ubicacion:</strong> {selectedCarta.type_location}
            </p>
            <p>
              <strong>Direccion del que envia:</strong> {selectedCarta.sender_location}
            </p>
            <p>
              <strong>Dirección del que recibe:</strong> {selectedCarta.receiver_location}
            </p>
            <p>
              <strong>Teléfono del que recibe:</strong> {selectedCarta.phone}
            </p>
            <p>
              <strong>Email del que recibe:</strong> {selectedCarta.receiver_email}
            </p>
            <p>
              <strong>Descripción:</strong> {selectedCarta.description}
            </p>
            <p>
              <strong>Peso:</strong> {selectedCarta.weight}
            </p>
            <p>
              <strong>Volumen:</strong> {selectedCarta.volume}
            </p>
            <p>
              <strong>Valor:</strong> {selectedCarta.price}
            </p>
            <p>
              <strong>Categoría:</strong> {selectedCarta.product_type}
            </p>
            <p>
              <strong>Fecha Emisión:</strong> {selectedCarta.emission_date}
            </p>
            <p>
              <strong>Fecha Validez:</strong> {selectedCarta.reception_date}
            </p>
            <p>
              <strong>Estado:</strong> {selectedCarta.state}
            </p>
          </div>
        )}
        {selectedCarta && (
          <button onClick={exportToPdf} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
            Exportar a PDF
          </button>
        )}
      </div>
    </div>
  );
}

export default ListaDeCartas;
