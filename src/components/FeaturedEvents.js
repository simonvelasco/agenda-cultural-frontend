import { useEffect, useState } from "react";
import { TopMenu } from "./topMenu";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import API_URL from "../config";

export function FeaturedEvents() {
  const [data, setData] = useState([]);
  const [events, setEvents] = useState([]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <button>Previous</button>,
    nextArrow: <button>Next</button>,
  };

  useEffect(() => {
    findEvents();
  }, []);

  const findEvents = () => {
    fetch(`${API_URL}/eventos/eventos-destacados/`)
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
                src={evento.imagen}
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