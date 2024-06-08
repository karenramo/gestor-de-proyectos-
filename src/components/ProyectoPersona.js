// ProyectoPersona.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

const ProyectoPersona = () => {
  const { id } = useParams(); // Obtener el parámetro de la URL

  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    const obtenerProyectosPersona = async () => {
      try {
        const proyectosRef = collection(db, 'proyectos');
        const q = query(proyectosRef, where('persona_id', '==', id));
        const querySnapshot = await getDocs(q);

        const proyectosData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setProyectos(proyectosData);
      } catch (error) {
        console.error('Error al obtener los proyectos:', error);
      }
    };

    obtenerProyectosPersona();
  }, [id]); // Ejecutar efecto cuando cambia el ID de la persona

  return (
    <div>
      <h1>Proyectos de la Persona</h1>
      <ul>
        {proyectos.map(proyecto => (
          <li key={proyecto.id}>{proyecto.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProyectoPersona;
