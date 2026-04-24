import { useEffect, useState } from "react";
import "../styles/Detail.css";
import "../styles/Controlpanel.css";

export function ControlPanel() {
  const [events, setEvents] = useState([]);
  const [locals, setLocals] = useState([]);
  const [localsInd, setLocalsInd] = useState(0);
  const [eventsInd, setEventsInd] = useState(0);

  useEffect(() => {
    findEvents();
    findLocals();
  }, []);

  const findEvents = () => {
    fetch(`http://127.0.0.1:8000/eventos/eventos-solicitados/`)
      .then((response) => response.json())
      .then((data) => setEvents(JSON.parse(JSON.stringify(data))))
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const findLocals = () => {
    fetch(`http://127.0.0.1:8000/locales/locales-solicitados/`)
      .then((response) => response.json())
      .then((data) => setLocals(JSON.parse(JSON.stringify(data))))
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const eliminarLocal = () => {
    fetch(
      `http://127.0.0.1:8000/locales/locales_viewset/${locals[localsInd].nombre}/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.status === 204) {
          console.log("Local eliminado con éxito.");
          setLocalsInd(localsInd + 1);
        } else {
          console.error("Error al eliminar el local.");
        }
      })
      .catch((error) => {
        console.error("Error de red al eliminar el local:", error);
      });
  };

  const eliminarEvento = () => {
    fetch(
      `http://127.0.0.1:8000/eventos/eventos_viewset/${events[eventsInd].id}/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (response.status === 204) {
          console.log("Local eliminado con éxito.");
          setEventsInd(eventsInd + 1);
        } else {
          console.error("Error al eliminar el local.");
        }
      })
      .catch((error) => {
        console.error("Error de red al eliminar el local:", error);
      });
  };

  const publicarLocal = () => {
    fetch(
      `http://127.0.0.1:8000/locales/publicar-local/${locals[localsInd].nombre}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Puedes incluir encabezados de autenticación si es necesario
        },
      }
    )
      .then((response) => {
        if (response.status === 200) {
          console.log("Local publicado con éxito.");
          setLocalsInd(localsInd + 1);
        } else if (response.status === 404) {
          // Local no encontrado
          console.error("Local no encontrado.");
        } else {
          // Otro error
          console.error("Error al publicar el local.");
        }
      })
      .catch((error) => {
        console.error("Error de red al publicar el local:", error);
      });
  };

  const publicarEvento = () => {
    fetch(
      `http://127.0.0.1:8000/eventos/publicar-evento/${events[eventsInd].id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Puedes incluir encabezados de autenticación si es necesario
        },
      }
    )
      .then((response) => {
        if (response.status === 200) {
          console.log("Local publicado con éxito.");
          setEventsInd(eventsInd + 1);
        } else if (response.status === 404) {
          console.error("Local no encontrado.");
        } else {
          console.error("Error al publicar el local.");
        }
      })
      .catch((error) => {
        console.error("Error de red al publicar el local:", error);
      });
  };

  return (
    <div>
      {locals && localsInd < locals.length ? (
        <div>
          <h1>Solicitudes de locales</h1>
          <div>{locals[localsInd].nombre}</div>
          <div className="containerDet">
            <img
              className="imgDetail"
              src={`http://127.0.0.1:8000${locals[localsInd].imagen}`}
              alt={locals[localsInd].imagen}
            />
            <h1>{locals[localsInd].nombre}</h1>
            <div className="separator">
              <div>UBICACIÓN:</div>
              <div>{locals[localsInd].ubicacion}</div>
            </div>
            <div className="separator">
              <div>TELÉFONO:</div>
              <div>{locals[localsInd].telefono}</div>
            </div>
            <div className="separator">
              <div>WEB:</div>
              <a href={locals[localsInd].url}>{locals[localsInd].web}</a>
            </div>
          </div>
          <div className="alingLeft">
              <button className="btnok" onClick={publicarLocal}>
                ACEPTAR
              </button>
              <button className="btncancel" onClick={eliminarLocal}>
                RECHAZAR
              </button>
            </div>
        </div>
      ) : events && eventsInd < events.length ? (
        <div>
          <h1>Solicitudes de eventos</h1>
          <div className="containerSoli">
            <img
              className="soliImg"
              src={`http://127.0.0.1:8000${events[eventsInd].imagen}`}
              alt={events[eventsInd].nombre}
            />
            <h1>{events[eventsInd].nombre}</h1>
            <div className="separator">{events[eventsInd].descripcion}</div>
            <div className="separator">
              <div>FECHA:</div>
              <div className="blue">{events[eventsInd].fecha}</div>
            </div>
            <div className="separator">
              <div>PRECIO:</div>
              <div className="blue">{events[eventsInd].precio}</div>
            </div>
            <div className="separator">
              <div>LOCAL:</div>
              <div className="localLink">{events[eventsInd].local.nombre}</div>
            </div>
            <div className="alingLeft">
              <button className="btnok" onClick={publicarEvento}>
                ACEPTAR
              </button>
              <button className="btncancel" onClick={eliminarEvento}>
                RECHAZAR
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>No hay ninguna solicitud de local ni evento pendiente</p>
      )}
    </div>
  );
}
