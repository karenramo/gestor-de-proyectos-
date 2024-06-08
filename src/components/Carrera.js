import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Link } from 'react-router-dom'; // Importa Link de react-router-dom
import './Carrera.css';

const Carrera = () => {
  const [carreras, setCarreras] = useState([]);

  useEffect(() => {
    const obtenerCarreras = async () => {
      try {
        const carrerasRef = collection(db, 'carreras');
        const querySnapshot = await getDocs(carrerasRef);

        const carrerasData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          nombre: doc.data().nombre,
          codigo: doc.data().codigo,
        }));

        setCarreras(carrerasData);
      } catch (error) {
        console.error('Error al obtener las carreras:', error);
      }
    };

    obtenerCarreras();
  }, []);

  return (
    <div className="table-container">
      <h1>Listado de Carreras</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Código</th>
          </tr>
        </thead>
        <tbody>
          {carreras.map((carrera) => (
            <tr key={carrera.id}>
              <td>
                <Link to={`/carrera/${carrera.id}`}>{carrera.nombre}</Link>
              </td>
              <td>{carrera.codigo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Carrera;
