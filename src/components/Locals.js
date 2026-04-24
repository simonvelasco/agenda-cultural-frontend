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
      <h1 className="center">LOCALES</h1>
      <div className="container">
      {locals.map((local) => (
        <Link className="card"c to={`/local-details/${local.nombre}`}>
          <img className="rowImg" src={`http://127.0.0.1:8000${local.imagen}`} alt={local.nombre}/>
          <div className="centered-text" key={local.nombre}>{local.nombre}</div>
        </Link>
      ))}
      </div>
    </>
  );
}
