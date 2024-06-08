import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/config';
import './Carrera.css'; // Importa el archivo CSS

const CarreraPersona = () => {
  const { id } = useParams(); // Obtener el parámetro de la URL
  const [carrera, setCarrera] = useState(null);
  const [personas, setPersonas] = useState([]);

  useEffect(() => {
    const obtenerCarrera = async () => {
      try {
        const carreraRef = doc(db, 'carreras', id); // Referencia al documento específico en la colección 'carreras'
        const docCarrera = await getDoc(carreraRef);

        if (docCarrera.exists()) {
          setCarrera({ id: docCarrera.id, ...docCarrera.data() });
        } else {
          console.log('No se encontró la carrera');
        }
      } catch (error) {
        console.error('Error al obtener la carrera:', error);
      }
    };

    const obtenerPersonasPorCarrera = async () => {
      try {
        const personasRef = collection(db, 'personas');
        const q = query(personasRef, where('carrera_id', '==', id));
        const querySnapshot = await getDocs(q);

        const personasData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPersonas(personasData);
      } catch (error) {
        console.error('Error al obtener las personas:', error);
      }
    };

    if (id) {
      obtenerCarrera();
      obtenerPersonasPorCarrera();
    }
  }, [id]);

  if (!carrera) {
    return <div className="container">Cargando carrera...</div>;
  }

  return (
    <div className="container">
    <h1>Detalles de la Carrera: {carrera.nombre}</h1>
    <p><strong>Código:</strong> {carrera.codigo}</p>
    <h2>Personas en esta carrera:</h2>
    <table className="table-container">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Semestre</th>
        </tr>
      </thead>
      <tbody>
        {personas.map((persona) => (
          <tr key={persona.id}>
            <td>{persona.nombre}</td>
            <td>{persona.semestre}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default CarreraPersona;
