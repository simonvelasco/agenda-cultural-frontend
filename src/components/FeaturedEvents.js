import { useEffect, useState } from "react";
import { TopMenu } from "./topMenu";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";


export function FeaturedEvents() {
  const [data, setData] = useState([]);
  const [events, setEvents] = useState([]); // Inicializamos events como null

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3, // Muestra tres imágenes a la vez
    slidesToScroll: 1,
    prevArrow: <button>Previous</button>, // Personaliza las flechas de navegación
    nextArrow: <button>Next</button>,
  };

  useEffect(() => {
    findEvents();
  }, []);

  const findEvents = () => {
    fetch(`http://127.0.0.1:8000/eventos/eventos-destacados/`)
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
      <h1>Eventos destacados</h1>
      <Slider {...settings}>
        {events.map((evento) => (
          <Link to={`/event-details/${evento.id}`}>
          <div className="card">
            <img
              className="rowImg"
              src={`http://127.0.0.1:8000${evento.imagen}`}
              alt={evento.nombre}
            />
            <div key={evento.id}>{evento.fecha}</div>
            <div key={evento.id}>{evento.nombre}</div>
            <div key={evento.id}>{evento.hora}</div>
            <div key={evento.id}>{evento.precio}</div>
          </div>
        </Link>
        ))}
      </Slider>
    </>
  );
}
