import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/EventsRow.css";

export function CategorysRow(props) {
    const [data, setData] = useState([]);
    const [events, setEvents] = useState([]); 

  useEffect(() => {
    if (props.date != undefined) {
      findEvents();
    }
  }, [props.date]);

  const findEvents = () => {
    fetch(`http://127.0.0.1:8000/eventos/eventos-categoria/${props.category}/`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    if (data != undefined) {
      const objectsArray = JSON.parse(JSON.stringify(data));
      setEvents(objectsArray);
    }
  }, [data]);

  return (
    <>
      <h1>{props.category}</h1>
      <div className="container">
        {events.map((event) => (
          <Link to={`/event-details/${event.id}`}>
            <div className="card">
              <img
                className="rowImg"
                src={`http://127.0.0.1:8000${event.imagen}`}
                alt={event.nombre}
              />
              <div className="level2" key={event.id}>{event.fecha}</div>
              <div className="level1" key={event.id}>{event.nombre}</div>
              <div className="level3" key={event.id}>{event.hora}</div>
              <div className="level3" key={event.id}>{event.precio}</div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
