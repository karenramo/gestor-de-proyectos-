import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faGraduationCap, faProjectDiagram } from '@fortawesome/free-solid-svg-icons'; // Añade el icono faProjectDiagram
import './Home.css'; // Importa el archivo CSS para los estilos específicos de Home

const Home = () => {
  return (
    <div className="container">
      {/* Header with logo */}
      <div className="header">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXv7VH-gUOu6_iV74N6_GA7WKRBXcTiDr3Hg&s"
          alt="Logo"
          className="logo"
        />
      </div>

      {/* Content with background image */}
      <div
        className="content"
        style={{
          backgroundImage: `url('https://elcomercio.pe/resizer/7-iNW2CrOv38iypONlsVPBZTIs0=/580x330/smart/filters:format(jpeg):quality(75)/arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/VE5OEES6CJDQHEVJWWSKRPDOJE.jpg')`,
          backgroundSize: 'cover',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Link to="/persona" className="button">
          <button className="home-button">
            <FontAwesomeIcon icon={faUsers} size="lg" color="#fff" />
            <span className="button-text">Persona</span>
          </button>
        </Link>
        <Link to="/carrera" className="button">
          <button className="home-button">
            <FontAwesomeIcon icon={faGraduationCap} size="lg" color="#fff" />
            <span className="button-text">Carrera</span>
          </button>
        </Link>
        <Link to="/proyecto" className="button"> {/* Añade un nuevo Link para la vista de Proyecto */}
          <button className="home-button">
            <FontAwesomeIcon icon={faProjectDiagram} size="lg" color="#fff" />
            <span className="button-text">Proyecto</span>
          </button>
        </Link>
      </div>

      <div className="footer">
        <p className="footer-text">© 2024 Proyecto Final</p>
      </div>
    </div>
  );
};

export default Home;
