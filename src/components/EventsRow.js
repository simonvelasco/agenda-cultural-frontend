import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/EventsRow.css";
import axios from "axios";

export function EventsRow(props) {
  const [data, setData] = useState([]);
  const [events, setEvents] = useState([]);
  const [categoriasQuery, setCategoriasQuery] = useState();
  const [horarioQuery, setHorarioQuery] = useState();
  const [preciosQuery, setPreciosQuery] = useState();
  const [localesQuery, setLocalesQuery] = useState();

  useEffect(() => {
    if (props.date != undefined) {
      findEvents();
    }
    if (props.filtros != undefined) {
      setCategoriasQuery(props.filtros.categorias.length == 0)
      setHorarioQuery(props.filtros.horarios.length == 0)
      setLocalesQuery(props.filtros.locales.length == 0)
      setPreciosQuery(props.filtros.precios.length == 0)

    }
  }, [props.date, props.filtros]);

  const findEvents = () => {
    fetch(`http://127.0.0.1:8000/eventos/eventos-fecha/${props.date}/`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const findFilteredEvents = () => {
    axios
      .get(`http://127.0.0.1:8000/eventos/eventos-fecha/${props.date}`, {
        params: props.filtros,
      })
      .then((response) => {
        // Maneja la respuesta aquí
        console.log("Eventos filtrados:", response.data);
      })
      .catch((error) => {
        // Maneja los errores aquí
        console.error("Error al obtener eventos filtrados:", error);
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
      <h1 className="date">{props.date}</h1>
      <div className="container">
        {events.map((event) => (
          <div>
            {(props.filtros.categorias.includes(event.categoria) || categoriasQuery) &&
            (props.filtros.horarios.includes(event.horario) || horarioQuery) &&
            (props.filtros.locales.includes(event.local.nombre) || localesQuery) &&
            (props.filtros.precios.includes(event.precio) || preciosQuery || (props.filtros.precios.includes("De pago") && event.precio!=="gratis")) 
            ? (
             <Link to={`/event-details/${event.id}`}>
             <div key={event.id} className="card">
               <div className="imgContainer">
                <img
                  key={event.id}
                  className="rowImg"
                  src={`http://127.0.0.1:8000${event.imagen}`}
                  alt={event.nombre}
                />
               </div>
               <div className="level2" key={event.id}>
                 {event.categoria}
               </div>
               <div className="level1" key={event.id}>
                 {event.nombre}
               </div>
               <div className="level3" key={event.id}>
                 {event.hora} {"/ "}
                 {event.local.nombre}
               </div>
               <div className="level3" key={event.id}>
                 {event.precio}
               </div>
             </div>
           </Link>
            ) : (
              <div className="">
              </div>
            )}
            
          </div>
        ))}
      </div>
    </>
  );
}
