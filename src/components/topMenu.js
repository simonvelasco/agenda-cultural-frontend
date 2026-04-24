import { EventsRow } from "./EventsRow";
import { useEffect, useState } from "react";
import moment from "moment";
import { FeaturedEvents } from "./FeaturedEvents";
import Dropdown from "./Dropdown";
import { Link } from "react-router-dom";
import "../styles/topMenu.css";

export function TopMenu() {
  const [selectedPub, setSelectedPub] = useState(null);
  const [catLinks, setCatLinks] = useState([]);
  const [selectedCat, setSelectedCat] = useState(null);


  const categorias = [
    "Música",
    "Escénicas",
    "Arte",
    "Cine",
    "Literatura",
    "Infantiles",
    "Especiales",
    "Gastronómicos",
    "Entretenimiento",
    "Aire Libre",
    "Deportivos",
    "Ver todas"
  ];

  useEffect(() => {
    categorias.map((cat) => setCatLinks([...catLinks, `/category/${cat}`]));
  }, []);

  const handleSelectPub = (item) => {
    setSelectedPub(item);
  };

  const handleSelectCat = (item) => {
    setSelectedCat(item);
  };

  const itemsPublicar = ["Evento", "Local"];
  const linksPublicar = ["/add-event", "/add-local"];

  return (
    <div className="row">
      <Link to={`/`}>
        <img className="" src="src/logotipo.png" alt={"logo"} />
      </Link>
      <div className="rowButtn">
        <Dropdown
          items={categorias}
          links={catLinks}
          title="CATEGORIAS ▾"
          onSelect={handleSelectCat}
        />
        <Dropdown
          items={itemsPublicar}
          links={linksPublicar}
          title="PUBLICAR ▾"
          onSelect={handleSelectPub}
        />
        <Link to={"/locals"}>LOCALES</Link>
      </div>
    </div>
  );
}
