import React, { useState } from "react";
import axios from "axios";
import "../styles/EventForm.css";
import { TopMenu } from "./topMenu";
import "../styles/Controlpanel.css";
import API_URL from "../config";



export function LocalsForm() {
  const [local, setLocal] = useState({
    nombre: "",
    ubicacion: "",
    telefono: "",
    web: "",
    imagen: null,
    estado: "solicitado",
  });

  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (event) => {
    const { name, value, type, files } = event.target;

    if (type === "file") {
      setLocal({
        ...local,
        [name]: files[0],
      });
    } else {
      setLocal({
        ...local,
        [name]: value,
      });
    }
  };

const handleSubmit = async (event) => {
  event.preventDefault();
  
  const formData = new FormData();
  formData.append("nombre", local.nombre);
  formData.append("ubicacion", local.ubicacion);
  formData.append("telefono", local.telefono);
  formData.append("web", local.web);
  formData.append("estado", local.estado);
  if (local.imagen) {
    formData.append("imagen", local.imagen);
  }

  try {
    const response = await axios.post(
      `${API_URL}/locales/locales_viewset/`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("Respuesta del servidor:", response.data);
    setIsOpen(true);
  } catch (error) {
    console.error("Error al hacer la solicitud POST:", error);
  }
};

  return (
    <div>
      <TopMenu />
      <div className="title">PUBLICAR LOCAL</div>
      <form onSubmit={handleSubmit}>
        <div className="rowForm">
          <div className="column">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={local.nombre}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="column">
            <label htmlFor="ubicacion">Ubicación:</label>
            <input
              type="text"
              id="ubicacion"
              name="ubicacion"
              value={local.ubicacion}
              onChange={handleInputChange}
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
              value={local.telefono}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="column">
            <label htmlFor="web">Sitio Web:</label>
            <input
              type="text"
              id="web"
              name="web"
              value={local.web}
              onChange={handleInputChange}
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
            onChange={handleInputChange}
          />
        </div>
        <div className="saveButton">
          <button  className="btnok" type="submit">ENVIAR</button>
        </div>
      </form>
      <div>
        {isOpen && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-content">
                <div>
                 Se ha enviado la solicitud correctamente!
                </div>
                <button className="btnok" onClick={closeModal}>Aceptar</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
