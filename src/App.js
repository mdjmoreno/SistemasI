import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import ListaDeCartas from "./components/ListaDeCartas";
import CrearCarta from "./components/CrearCarta";
import SignUp from "./components/SignUp";

function AppContent() {
  const [isLogged, setIsLogged] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = localStorage.getItem("currentUser");

  useEffect(() => {
    if (currentUser) {
      setIsLogged(true);
      navigate("/");
    } else {
      setIsLogged(false);
    }
  }, []);
  return (
    <>
      {/* Renderizar NavBar solo si la ruta no es '/login' */}
      {location.pathname !== "/login" && location.pathname !== "/register" && <NavBar setisLogged={setIsLogged} />}
      <Routes>
        {isLogged ? (
          <>
            <Route path="/lista-cartas" element={<ListaDeCartas />} />
            <Route path="/crear-carta" element={<CrearCarta />} />
          </>
        ) : (
          <>
            <Route
              path="/login"
              element={
                <Login
                  onLogged={(user) => {
                    setIsLogged(true);
                    localStorage.setItem("currentUser", user);
                  }}
                />
              }
            />
            <Route path="/register" element={<SignUp />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </>
        )}
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
