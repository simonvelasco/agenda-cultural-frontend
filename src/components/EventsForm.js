import { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../styles/EventForm.css";
import { TopMenu } from "./topMenu";
import "../styles/EventsRow.css";
import API_URL from "../config";

export function EventsForm() {
  const [data, setData] = useState([]);
  const [locals, setLocals] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const formRef = useRef(null);

  const categorias = [
    "Música",
    "Escénicas",
    "Arte",
    "Cine",
    "Literatura",
    "Infantiles",
    "Especiales",
    "Gastronómicos",
    "Entretenimiento",
    "Aire Libre",
    "Deportivos",
  ];

  const horarios = ["Mañana", "Tarde", "Noche", "Todo el dia"];

  useEffect(() => {
    findLocals();
  }, []);

  useEffect(() => {
    if (data !== undefined) {
      setLocals(JSON.parse(JSON.stringify(data)));
    }
  }, [data]);

  const findLocals = () => {
    fetch(`${API_URL}/locales/locales_viewset/`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(formRef.current);
    formData.append("estado", "solicitado");

    try {
      const response = await axios.post(
        `${API_URL}/eventos/eventos_viewset/`,
        formData
      );
      console.log("Respuesta del servidor:", response.data);
      setIsOpen(true);
      formRef.current.reset();
    } catch (error) {
      console.error("Error al hacer la solicitud POST:", error);
      setIsError(true);
    }
  };

  return (
    <div>
      <TopMenu />
      <div className="title">Publicar Evento</div>
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
            <label htmlFor="fecha">Fecha:</label>
            <input
              type="date"
              id="fecha"
              name="fecha"
              required
            />
          </div>
        </div>
        <div className="rowForm">
          <div className="column">
            <label htmlFor="hora">Hora:</label>
            <input
              type="text"
              id="hora"
              name="hora"
              required
            />
          </div>
          <div className="column">
            <label htmlFor="horario">Horario:</label>
            <select id="horario" name="horario">
              <option value="">Selecciona un horario</option>
              {horarios.map((hora, index) => (
                <option key={index} value={hora}>
                  {hora}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="rowForm">
          <div className="column">
            <label htmlFor="precio">Precio:</label>
            <input
              type="text"
              id="precio"
              name="precio"
              required
            />
          </div>
          <div className="column">
            <label htmlFor="categoria">Categoría:</label>
            <select id="categoria" name="categoria">
              <option value="">Selecciona una categoría</option>
              {categorias.map((cat, index) => (
                <option key={index} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="rowForm">
          <div className="column">
            <label htmlFor="local">Local:</label>
            <select id="local" name="local">
              <option value="">Selecciona un local</option>
              {locals.map((local, index) => (
                <option key={index} value={local.nombre}>
                  {local.nombre}
                </option>
              ))}
            </select>
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
        </div>
        <div className="column">
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            name="descripcion"
            required
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

      {isError && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-content">
              <div>Ha ocurrido un error al enviar la solicitud. Por favor inténtalo de nuevo.</div>
              <button className="btncancel" onClick={() => setIsError(false)}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}