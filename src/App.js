import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/Login';
import NavBar from './components/NavBar';
import ListaDeCartas from './components/ListaDeCartas';
import CrearCarta from './components/CrearCarta';


function AppContent() {
 
  const location = useLocation();

  return (
    <>
      {/* Renderizar NavBar solo si la ruta no es '/login' */}
      {location.pathname !== '/login' && <NavBar />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/lista-cartas" element={<ListaDeCartas />} />
        <Route path="/crear-carta" element={<CrearCarta />} />
      </Routes>
    </>
  );
}


function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
