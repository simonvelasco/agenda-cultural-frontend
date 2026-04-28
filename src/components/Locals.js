import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TopMenu } from "./topMenu";


export function Locals() {
  const [locals, setLocals] = useState([]);

  useEffect(() => {
    findLocals();
  }, []);

  const findLocals = () => {
    fetch(`http://127.0.0.1:8000/locales/locales-publicados/`)
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
          <img  className="rowImg" src={`http://127.0.0.1:8000${local.imagen}`} alt={local.nombre}/>
          <div className="centered-text">{local.nombre}</div>
        </Link>
      ))}
      </div>
    </>
  );
}
