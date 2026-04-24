import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/EventForm.css";
import { TopMenu } from "./topMenu";
import "../styles/EventsRow.css";


export function EventsForm() {
  const [evento, setEvento] = useState({
    nombre: "",
    fecha: "",
    hora: "",
    horario: "",
    precio: "",
    categoria: "",
    local: {
      nombre: "",
      ubicacion: "",
      telefono: "",
      web: "",
    },
    descripcion: "",
    imagen: null,
    estado: "solicitado",
  });

  const [data, setData] = useState([]);
  const [locals, setLocals] = useState([]);

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

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setEvento({
        ...evento,
        [name]: files[0],
      });
    } else {
      setEvento({
        ...evento,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    findLocals();
  }, []);

  useEffect(() => {
    if (data != undefined) {
      const objectsArray = JSON.parse(JSON.stringify(data));

      setLocals(objectsArray);
    }
  }, [data]);

  const findLocals = () => {
    fetch(`http://127.0.0.1:8000/locales/locales_viewset/`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(evento);
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/eventos/eventos_viewset/",
        evento,
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
      <h2>Crear Evento</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="rowForm">
          <div className="column">
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={evento.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="column">
            <label htmlFor="fecha">Fecha:</label>
            <input
              type="date"
              id="fecha"
              name="fecha"
              value={evento.fecha}
              onChange={handleChange}
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
              value={evento.hora}
              onChange={handleChange}
              required
            />
          </div>
          <div className="column">
            <label htmlFor="horario">Horario:</label>
            <input
              type="text"
              id="horario"
              name="horario"
              value={evento.horario}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="rowForm">
          <div className="column">
            <label htmlFor="precio">Precio:</label>
            <input
              type="text"
              id="precio"
              name="precio"
              value={evento.precio}
              onChange={handleChange}
              required
            />
          </div>
          <div className="column">
            <label htmlFor="categoria">Categoría:</label>
            <select
              id="categoria"
              name="categoria"
              value={evento.categoria}
              onChange={handleChange}
            >
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
            <select
              id="local"
              name="local"
              value={evento.local.nombre}
              onChange={handleChange}
            >
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
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="column">
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={evento.descripcion}
            onChange={handleChange}
            required
          />
        </div>
        <div className="saveButton">
          <button type="submit">Guardar</button>
        </div>
      </form>
    </div>
  );
}
