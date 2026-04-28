import React, { useState } from "react";
import axios from "axios";
import "../styles/EventForm.css";
import { TopMenu } from "./topMenu";
import { useNavigate } from 'react-router-dom';


export function Form() {
  const [nombre, setNombre] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [message, setMessage] = useState('');

  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(contraseña)
    try {
      const response = await axios.post('http://127.0.0.1:8000/usuarios/login/', {
        username: nombre,
        password: contraseña,
      });

      if (response.status === 200) {
        setMessage('Usuario autenticado');
        navigate('/solicitudes');

      }
    } catch (error) {
      setMessage('Credenciales incorrectas');
    }
  };

  return (
    <div>
      <TopMenu />
      <div className="title">Autentificación</div>
      <div className="center">
      <form onSubmit={handleSubmit}>
        <div className="rowForm">
          <div className="column">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="rowForm">
          <div className="column">
            <label htmlFor="contraseña">Contraseña:</label>
            <input
              type="password"
              id="contraseña"
              name="contraseña"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="saveButton">
          <button type="submit">Guardar Local</button>
        </div>
      </form>
      </div>
    </div>
  );
}
