import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Import Routes instead of Switch

import Home from './components/Home';
import Persona from './components/Persona';
import Carrera from './components/Carrera';
import Proyecto from './components/Proyecto';
import CarreraPersona from './components/CarreraPersona';
import ProyectoPersona from './components/ProyectoPersona'; // Import ProyectoPersona component

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/persona" element={<Persona />} />
          <Route path="/carrera" element={<Carrera />} />
          <Route path="/proyecto" element={<Proyecto />} />
          <Route path="/carrera/:id" element={<CarreraPersona />} /> {/* Ruta dinámica con parámetro id */}
          <Route path="/proyecto-persona/:id" element={<ProyectoPersona />} /> {/* Nueva ruta para ProyectoPersona con parámetro de id */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
