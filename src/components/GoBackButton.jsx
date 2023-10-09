// GoBackButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function GoBackButton() {
  let navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate('/')} 
      className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-4"
    >
      Regresar al Menú Principal
    </button>
  );
}

export default GoBackButton;
