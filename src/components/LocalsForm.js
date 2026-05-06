import React, { useState, useRef } from "react";
import axios from "axios";
import "../styles/EventForm.css";
import { TopMenu } from "./topMenu";
import "../styles/Controlpanel.css";
import API_URL from "../config";

export function LocalsForm() {
  const [isOpen, setIsOpen] = useState(false);
  const formRef = useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(formRef.current);
    formData.append("estado", "solicitado");

    try {
      const response = await axios.post(
        `${API_URL}/locales/locales_viewset/`,
        formData
      );
      console.log("Respuesta del servidor:", response.data);
      setIsOpen(true);
      formRef.current.reset();
    } catch (error) {
      console.error("Error al hacer la solicitud POST:", error);
    }
  };

  return (
    <div>
      <TopMenu />
      <div className="title">PUBLICAR LOCAL</div>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div className="rowForm">
          <div className="column">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              required
            />
          </div>
          <div className="column">
            <label htmlFor="ubicacion">Ubicación:</label>
            <input
              type="text"
              id="ubicacion"
              name="ubicacion"
              required
            />
          </div>
        </div>
        <div className="rowForm">
          <div className="column">
            <label htmlFor="telefono">Teléfono:</label>
            <input
              type="text"
              id="telefono"
              name="telefono"
              required
            />
          </div>
          <div className="column">
            <label htmlFor="web">Sitio Web:</label>
            <input
              type="text"
              id="web"
              name="web"
            />
          </div>
        </div>
        <div className="column">
          <label htmlFor="imagen">Imagen:</label>
          <input
            type="file"
            id="imagen"
            name="imagen"
            accept="image/*"
          />
        </div>
        <div className="saveButton">
          <button className="btnok" type="submit">ENVIAR</button>
        </div>
      </form>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-content">
              <div>Se ha enviado la solicitud correctamente!</div>
              <button className="btnok" onClick={() => setIsOpen(false)}>Aceptar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}