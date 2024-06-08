import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

const Proyecto = () => {
  const [proyectos, setProyectos] = useState([]);
  const [nombreProyecto, setNombreProyecto] = useState('');

  useEffect(() => {
    const obtenerProyectos = async () => {
      try {
        const proyectosSnapshot = await getDocs(collection(db, 'proyectos'));
        const proyectosData = proyectosSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProyectos(proyectosData);
      } catch (error) {
        console.error('Error al obtener proyectos:', error);
      }
    };

    obtenerProyectos();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const nuevoProyecto = { nombre: nombreProyecto };
      const docRef = await addDoc(collection(db, 'proyectos'), nuevoProyecto);
      setProyectos([...proyectos, { id: docRef.id, ...nuevoProyecto }]);
      setNombreProyecto('');
    } catch (error) {
      console.error('Error al crear proyecto:', error);
    }
  };

  const handleInputChange = (event) => {
    setNombreProyecto(event.target.value);
  };

  return (
    <div className="container">
      <h1>Listado de Proyectos</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre del Proyecto:
          <input
            type="text"
            value={nombreProyecto}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit">Crear Proyecto</button>
      </form>
      <ul>
        {proyectos.map(proyecto => (
          <li key={proyecto.id}>{proyecto.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

export default Proyecto;
