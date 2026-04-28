import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TopMenu } from "./topMenu";
import API_URL from "../config";


export function Locals() {
  const [locals, setLocals] = useState([]);

  useEffect(() => {
    findLocals();
  }, []);

  const findLocals = () => {
    fetch(`${API_URL}/locales/locales-publicados/`)
      .then((response) => response.json())
      .then((data) => setLocals(data))
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <TopMenu/>
      <div className="title">LOCALES</div>
      <div className="container">
      {locals.map((local) => (
        <Link key={local.nombre} className="card" to={`/local-details/${local.nombre}`}>
          <img  className="rowImg" src={local.imagen} alt={local.nombre}/>
          <div className="centered-text">{local.nombre}</div>
        </Link>
      ))}
      </div>
    </>
  );
}
