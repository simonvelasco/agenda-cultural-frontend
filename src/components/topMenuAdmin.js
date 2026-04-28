
import { Link } from "react-router-dom";
import "../styles/topMenu.css";
import logo from "../logotipo.png"

export function TopMenuAdmin() {

  return (
    <div className="row">
      <Link to={`/`}>
        <img className="logo" src={logo} alt={"logo"} />
      </Link>
      <div className="rowButtn">
        <Link to={"/solicitudes"}>SOLICITUDES</Link>
        <Link to={"/admin-events"}>EVENTOS</Link>
      </div>
    </div>
  );
}
