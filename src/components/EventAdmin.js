import { CategorysRow } from "./CategorysRow";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Checkbox from "./Checkbox";
import icon from "../trash_icon.png";
import { TopMenuAdmin } from "./topMenuAdmin";
import "../styles/EventAdmin.css";
import axios from "axios";


export function EventAdmin() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    findEvents();
  }, []);

  const findEvents = () => {
    fetch(`http://127.0.0.1:8000/eventos/eventos-publicados/`)
      .then((response) => response.json())
      .then((data) => setEvents(JSON.parse(JSON.stringify(data))))
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const deleteEvent = (id) => {
    console.log(id)
    axios
    .delete(`http://127.0.0.1:8000/eventos/eventos_viewset/${id}/`)
    .then((response) => {
      if (response.status === 204) {
        console.log('La instancia se eliminó correctamente.');
        // Realiza alguna acción adicional si es necesario
        findEvents()
      } else {
        console.error('No se pudo eliminar la instancia. Código de estado:', response.status);
      }
    })
    .catch((error) => {
      console.error('Error al eliminar la instancia:', error);
    });
  }

  return (
    <>
      <TopMenuAdmin />
      {events.map((event) => (
        <div className="rowEvent">
          <div className="subRow">
            <div>{event.nombre}</div>
            <div>{event.fecha}</div>
            <div>{event.local.nombre}</div>
          </div>
          <div className="subRow">
            <button onClick={() => deleteEvent(event.id)} className="trash"><img width={30} src={icon} alt="trash" /></button>
            {event.estado == "destacado" ? (
              <Checkbox id={event.id} initiallyChecked={true} />
            ) : (
              <Checkbox id={event.id} initiallyChecked={false} />
            )}
          </div>
        </div>
      ))}
    </>
  );
}
