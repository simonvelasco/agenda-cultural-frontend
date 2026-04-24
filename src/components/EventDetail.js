import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/EventsRow.css";
import { TopMenu } from "./topMenu";

export function EventDetail() {
  const [event, setEvent] = useState(undefined);
  const { eventId } = useParams();
  const [eventsCategory, setEventsCategory] = useState([]);
  const [eventsLocal, setEventsLocal] = useState([]);

  useEffect(() => {
    findEvent();
  }, [eventId]);

  useEffect(() => {
    if (event != undefined) {
      findEventsByCategory();
    }
  }, [event]);

  const findEvent = () => {
    fetch(`http://127.0.0.1:8000/eventos/evento-local/${eventId}`)
      .then((response) => response.json())
      .then((data) => setEvent(data))
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const findEventsByCategory = () => {
    fetch(`http://127.0.0.1:8000/eventos/eventos-categoria/${event.categoria}/`)
      .then((response) => response.json())
      .then((data) => setEventsCategory(data))
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <TopMenu />
      <div className="flex">
        <div className="">
          {event !== undefined ? (
            <div className="containerDet">
              <img
                className="imgDetail"
                src={`http://127.0.0.1:8000${event.imagen}`}
                alt={event.nombre}
              />
              <h1>{event.nombre}</h1>
              <div className="separator">{event.descripcion}</div>
              <div className="separator">
                <div>FECHA:</div>
                <div className="blue">{event.fecha}</div>
              </div>
              <div className="separator">
                <div>PRECIO:</div>
                <div className="blue">{event.precio}</div>
              </div>
              <div className="separator">
                <div>LOCAL:</div>
                <Link to={`/local-details/${event.local.nombre}`}>
                  <div className="localLink">{event.local.nombre}</div>
                </Link>
              </div>
            </div>
          ) : (
            <div>La variable es undefined.</div>
          )}
        </div>
        <div>
          <h1 style={{ "margin-top": "4rem" }}>Eventos Relacionados</h1>
          {eventsCategory.map((evento) =>
            evento.id != event.id ? (
              <Link to={`/event-details/${event.id}`}>
                <div className="card">
                  <img
                    className="rowImg"
                    src={`http://127.0.0.1:8000${event.imagen}`}
                    alt={event.nombre}
                  />
                  <div className="level2" key={event.id}>{event.fecha}</div>
                  <div className="level1" key={event.id}>{event.nombre}</div>
                  <div className="level3"key={event.id}>{event.hora}</div>
                  <div className="level3" style={{ "margin-bottom": "1rem" }} key={event.id}>
                    {event.precio}
                  </div>
                </div>
              </Link>
            ) : (
              <></>
            )
          )}
        </div>
      </div>
    </>
  );
}
