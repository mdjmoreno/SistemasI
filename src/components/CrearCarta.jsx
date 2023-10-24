import React, { useState } from "react";
import GoBackButton from "./GoBackButton";
import axios from "axios";
import { Oval } from "react-loader-spinner";

const url = "http://nowports-api.test/api/";

function CrearCarta() {
  const [formData, setFormData] = useState({
    weight: "",
    description: "",
    volume: "",
    price: "",
    type: "",
    email_sender: "",
    email_receiver: "",
    emission_date: new Date(),
    reception_date: new Date(),
    state: "",
    quantity: "",
  });
  const [loader, setLoader] = useState(false);

  const handleChange = (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const currentUser = localStorage.getItem("currentUser");
    const users = await axios.get(`${url}user/find`);
    const user_receiver = users.data.data.find((user) => user.email === formData.email_receiver);
    const user_sender = users.data.data.find((user) => user.email === currentUser);

    try {
      const resMerc = await axios.post(`${url}mercancias/create`, {
        description: formData.description,
        weight: formData.weight,
        volume: formData.volume,
        price: formData.price,
        type: formData.type,
      });

      const card = await axios.post(`${url}instruction-cards/create`, {
        id_sender_user: user_sender.id,
        id_receiver_user: user_receiver.id,
        emission_date: formData.emission_date,
        reception_date: formData.reception_date,
        state: "pending to deliver",
      });

      const letter = await axios.post(`${url}goods-by-letter/create`, {
        id_instruction_card: card.data.data.id,
        id_mercancia: resMerc.data.data.id,
        quantity: formData.quantity,
      });
      alert("Carta creada con exito.");
      console.log(letter);
    } catch (error) {
      alert("Problema creando la data.");
      console.log(error);
    }
    setLoader(false);

    // Lógica de envío de formulario
  };

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-6 rounded-lg flex flex-col items-center">
        <GoBackButton />
        <h2 className="text-2xl mb-4 text-gray-800 mt-4">Crear Nueva Carta de Instrucción</h2>
        <form className="w-full p-8" onSubmit={handleSubmit}>
          <p className="block text-base font-medium mb-2">Datos de la mercancia:</p>
          {/* Campo: Peso */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="peso">
              Peso
            </label>
            <input
              type="text"
              id="peso"
              name="weight"
              onChange={handleChange}
              value={formData.weight}
              className="w-full p-2 border rounded bg-white text-black"
            />
          </div>

          {/* Campo: Nombre Mercancía */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="nombreMercancia">
              Nombre de la Mercancía
            </label>
            <input
              type="text"
              id="nombreMercancia"
              name="description"
              onChange={handleChange}
              value={formData.description}
              className="w-full p-2 border rounded bg-white text-black"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="volume">
              Volumen
            </label>
            <input
              type="text"
              id="volume"
              name="volume"
              onChange={handleChange}
              value={formData.volume}
              className="w-full p-2 border rounded bg-white text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="price">
              Precio
            </label>
            <input
              type="text"
              id="price"
              name="price"
              onChange={handleChange}
              value={formData.price}
              className="w-full p-2 border rounded bg-white text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="type">
              Tipo
            </label>
            <input
              type="text"
              id="type"
              name="type"
              onChange={handleChange}
              value={formData.type}
              className="w-full p-2 border rounded bg-white text-black"
            />
          </div>
          {/* 
          Campo: Es Vivo
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
          </div> */}

          {/* Campo: Datos de Recepción */}
          <p className="block text-base font-medium mb-2">Datos del envio:</p>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email_receiver">
              Email del usuario que recibe
            </label>
            <input
              type="text"
              id="email_receiver"
              name="email_receiver"
              onChange={handleChange}
              value={formData.email_receiver}
              className="w-full p-2 border rounded bg-white text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="fecha">
              Fecha de recepcion
            </label>
            <input
              type="date"
              id="reception_date"
              name="reception_date"
              onChange={handleChange}
              value={formData.reception_date}
              className="w-full p-2 border rounded bg-white text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="quantity">
              Cantidad
            </label>
            <input
              type="text"
              id="quantity"
              name="quantity"
              onChange={handleChange}
              value={formData.quantity}
              className="w-full p-2 border rounded bg-white text-black"
            />
          </div>
          {/* Botón de Envío */}
          <button type="submit" className="w-full p-2 mt-4 bg-blue-500 text-white rounded hover:bg-blue-600">
            Crear Carta
          </button>
          <div className="w-full flex justify-center items-center mt-2">
            {loader && (
              <Oval
                height={50}
                width={50}
                color="#0000FF"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel="oval-loading"
                secondaryColor="#4fa94d"
                strokeWidth={2}
                strokeWidthSecondary={2}
              />
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CrearCarta;
