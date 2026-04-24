import React, { useState } from "react";
import axios from "axios";
import "../styles/EventForm.css";
import { TopMenu } from "./topMenu";

export function LocalsForm() {
  const [local, setLocal] = useState({
    nombre: "",
    ubicacion: "",
    telefono: "",
    web: "",
    imagen: null,
    estado: "solicitado",
  });

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

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/locales/locales_viewset/",
        local,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Aquí puedes manejar la respuesta del servidor, como mostrar un mensaje de éxito o redirigir a otra página.
      console.log("Respuesta del servidor:", response.data);
    } catch (error) {
      // Aquí puedes manejar los errores, como mostrar un mensaje de error al usuario.
      console.error("Error al hacer la solicitud POST:", error);
    }
  };

  return (
    <div>
      <TopMenu />
      <h2>Formulario para Agregar un Local</h2>
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
          <button type="submit">Guardar Local</button>
        </div>
      </form>
    </div>
  );
}
