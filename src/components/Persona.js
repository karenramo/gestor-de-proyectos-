import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { Link } from 'react-router-dom'; // Importar Link desde React Router
import './Carrera.css'; // Importar el archivo CSS

const Persona = () => {
  const [personas, setPersonas] = useState([]); // Estado para almacenar la lista de personas
  const [carreras, setCarreras] = useState([]); // Estado para almacenar la lista de carreras
  const [showForm, setShowForm] = useState(false);
  const [newPersona, setNewPersona] = useState({ nombre: '', carrera_id: '', semestre: '' });

  useEffect(() => {
    const obtenerPersonas = async () => {
      try {
        const personasRef = collection(db, 'personas');
        const personasSnapshot = await getDocs(personasRef);
        const personasData = personasSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPersonas(personasData);
      } catch (error) {
        console.error('Error al obtener las personas:', error);
      }
    };

    obtenerPersonas();
  }, []); // Este efecto se ejecuta solo una vez al montar el componente

  useEffect(() => {
    const obtenerCarreras = async () => {
      try {
        const carrerasRef = collection(db, 'carreras');
        const carrerasSnapshot = await getDocs(carrerasRef);
        const carrerasData = carrerasSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setCarreras(carrerasData);
      } catch (error) {
        console.error('Error al obtener las carreras:', error);
      }
    };

    obtenerCarreras();
  }, []); // Este efecto se ejecuta solo una vez al montar el componente

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Asegurarse de que el campo carrera_id sea válido
      const carreraExistente = carreras.find(carrera => carrera.id === newPersona.carrera_id);
      if (!carreraExistente) {
        console.error('La carrera seleccionada no es válida.');
        return;
      }

      const docRef = await addDoc(collection(db, 'personas'), newPersona);
      const persona = { id: docRef.id, ...newPersona };
      setPersonas([...personas, persona]);
      setShowForm(false);
      setNewPersona({ nombre: '', carrera_id: '', semestre: '' }); // Limpiar el formulario después de la creación exitosa
    } catch (error) {
      console.error('Error al crear la persona:', error);
    }
  };

  const handleInputChange = (event) => {
    setNewPersona({ ...newPersona, [event.target.name]: event.target.value });
  };

  return (
    <div className="table-container">
      <h1>Listado de Personas</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Semestre</th>
            <th>Carrera</th>
            <th></th> {/* Celda vacía para el ícono o elemento visual */}
          </tr>
        </thead>
        <tbody>
          {personas.map((persona) => (
            <tr key={persona.id}>
              <td>{persona.nombre}</td>
              <td>{persona.semestre}</td>
              <td>
                {/* Mostrar el nombre de la carrera en lugar del ID */}
                {carreras.find(carrera => carrera.id === persona.carrera_id)?.nombre || 'Carrera no especificada'}
              </td>
              <td>
                {/* Enlace a la vista ProyectoPersona con el id de la persona como parámetro */}
                <Link to={`/proyecto-persona/${persona.id}`} className="circle-icon">●</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn-agregar" onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancelar' : 'Agregar Persona'}
      </button>
      {showForm && (
        <form onSubmit={handleSubmit} className="form-persona">
          <label>
            Nombre:
            <input type="text" name="nombre" value={newPersona.nombre} onChange={handleInputChange} />
          </label>
          <label>
            Semestre:
            <input type="number" name="semestre" value={newPersona.semestre} onChange={handleInputChange} />
          </label>
          <label>
            Carrera:
            <select name="carrera_id" value={newPersona.carrera_id} onChange={handleInputChange}>
              <option value="">Seleccione una carrera</option>
              {carreras.map(carrera => (
                <option key={carrera.id} value={carrera.id}>{carrera.nombre}</option>
              ))}
            </select>
          </label>
          <button type="submit" className="btn-crear">Crear persona</button>
        </form>
      )}
    </div>
  );
};

export default Persona;
