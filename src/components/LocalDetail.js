import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/EventsRow.css";
import { TopMenu } from "./topMenu";
import API_URL from "../config";


export function LocalDetail() {
  const [local, setLocal] = useState(undefined);
  const { localName } = useParams();
  const [eventsLocal, setEventsLocal] = useState([]);

  useEffect(() => {
    console.log(local);
    findLocal();
  }, [localName]);

  useEffect(() => {
    console.log("despues BOL",local);
    if (local != undefined) {
      findEventsByLocal();
    }
  }, [local]);

  const findLocal = () => {
    fetch(`${API_URL}/locales/locales_viewset/${localName}`)
      .then((response) => response.json())
      .then((data) => setLocal(data))
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const findEventsByLocal = () => {
    fetch(`${API_URL}/eventos/eventos-local/${local.nombre}`)
      .then((response) => response.json())
      .then((data) => setEventsLocal(data))
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  if (local !== undefined) {
    return (
      <>
        <TopMenu />
        {local !== undefined ? (
          <div className="containerDet">
            <img
              className="imgDetail"
              src={`${local.imagen}`}
              alt={local.imagen}
            />
            <h1>{local.nombre}</h1>
            <div className="separator">
              <div>UBICACIÓN:</div>
              <div className="blue">{local.ubicacion}</div>
            </div>
            <div className="separator">
              <div>TELÉFONO:</div>
              <div className="blue">{local.telefono}</div>
            </div>
            <div className="separator">
              <div>WEB:</div>
              <a className="blue" href={local.url}>
                {local.web}
              </a>
            </div>
          </div>
        ) : (
          <div>La variable es undefined.</div>
        )}

        <h1 className="topLine">Mas eventos en este local</h1>
        <div className="cardContainer">
          {eventsLocal.map((evento) => (
            <Link to={`/event-details/${evento.id}`}>
              <div className="card">
                <img
                  className="rowImg"
                  src={evento.imagen}
                  alt={evento.nombre}
                />
                <div className="level2">{evento.fecha}</div>
                <div className="level1">{evento.nombre}</div>
                <div className="level3">{evento.hora}</div>
                <div className="level3">{evento.precio}</div>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  } else {
    return <div>Render this when condition is false</div>;
  }
}
