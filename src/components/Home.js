import { EventsRow } from "./EventsRow";
import { useEffect, useState } from "react";
import moment from "moment";
import { FeaturedEvents } from "./FeaturedEvents";
import { TopMenu } from "./topMenu";
import OptionDropdown from "./OptionDropdown";

export function Home() {
  const [datesArray, setDatesArray] = useState([]);
  const [days, setDays] = useState(0);
  const [data, setData] = useState([]);
  const [selectedCat, setSelectedCat] = useState([]);
  const [selectedHorario, setSelectedHorario] = useState([]);
  const [selectedPrecio, setSelectedPrecio] = useState([]);
  const [selectedLocals, setSelectedLocals] = useState([]);
  const [locals, setLocals] = useState([]);
  const [localsNames, setLocalsNames] = useState([]);
  const [filtros, setFiltros] = useState({});

  const categories = [
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
  ];

  const horario = ["Mañana", "Tarde", "Noche", "Todo el dia"];

  const precio = ["Gratuito", "De pago"];

  useEffect(() => {
    findLocals();
  }, []);

  useEffect(() => {
    if (data != undefined) {
      const objectsArray = JSON.parse(JSON.stringify(data));
      setLocals(objectsArray);
      setLocalsNames(objectsArray.map((struct) => struct.nombre));
    }
  }, [data]);

  const findLocals = () => {
    fetch(`http://127.0.0.1:8000/locales/locales_viewset/`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleCatSelect = (item) => {
    if (selectedCat.length == categories.length) {
      selectedCat([]);
    }
    if (selectedCat.includes(item)) {
      setSelectedCat(selectedCat.filter((selectedCat) => selectedCat !== item));
    } else {
      setSelectedCat([...selectedCat, item]);
    }
  };

  const handleHorarioSelected = (item) => {
    if (selectedHorario.includes(item)) {
      setSelectedHorario(
        selectedHorario.filter((selectedHorario) => selectedHorario !== item)
      );
    } else {
      setSelectedHorario([...selectedHorario, item]);
    }
  };

  const handlePrecioSelected = (item) => {
    if (selectedPrecio.includes(item)) {
      setSelectedPrecio(
        selectedPrecio.filter((selectedPrecio) => selectedPrecio !== item)
      );
    } else {
      setSelectedPrecio([...selectedPrecio, item]);
    }
  };

  const handleLocalsSelected = (item) => {
    if (selectedLocals.includes(item)) {
      setSelectedLocals(
        selectedLocals.filter((selectedLocals) => selectedLocals !== item)
      );
    } else {
      setSelectedLocals([...selectedLocals, item]);
    }
  };

  useEffect(() => {
    setFiltros({
      categorias: selectedCat,
      horarios: selectedHorario,
      locales: selectedLocals,
      precios: selectedPrecio,
    });
  }, [selectedCat, selectedHorario, selectedPrecio, selectedLocals]);

  useEffect(() => {
    //fetchData();
    const currentDate = moment(); // Obtenemos la fecha actual
    const next4Days = [];

    for (let i = 0 + days; i < 5 + days; i++) {
      // Añadimos la fecha actual y las siguientes 4 fechas a nuestro array
      next4Days.push(currentDate.clone().add(i, "days").format("YYYY-MM-DD"));
    }
    setDatesArray(next4Days);
    //deletePastEvents(next4Days[0])
  }, [days]);

  const deletePastEvents = (date) => {
    fetch(
      `http://127.0.0.1:8000/eventos/eliminar-eventos-anteriores/${date}/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json", // Si es necesario, ajusta el tipo de contenido
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Error al eliminar eventos anteriores: ${response.statusText}`
          );
        }
        console.log("Eventos anteriores eliminados con éxito");
      })
      .catch((error) => {
        console.error("Error al hacer la solicitud:", error);
        // Aquí puedes manejar el error si ocurre
      });
  };

  if (localsNames.length > 0) {
    return (
      <>
        <TopMenu />
        <FeaturedEvents />
        <div className="title2">Programación</div>
        {localsNames != [] ? (
          <div>
            <OptionDropdown
              items={categories}
              selectedItems={selectedCat}
              title="CATEGORIAS ▾"
              onItemSelect={handleCatSelect}
            />
            <OptionDropdown
              items={horario}
              selectedItems={selectedHorario}
              title="HORARIO ▾"
              onItemSelect={handleHorarioSelected}
            />
            <OptionDropdown
              items={localsNames}
              selectedItems={selectedLocals}
              title="LOCALES ▾"
              onItemSelect={handleLocalsSelected}
            />
            <OptionDropdown
              items={precio}
              selectedItems={selectedPrecio}
              title="PRECIO ▾"
              onItemSelect={handlePrecioSelected}
            />
            {datesArray.map((date, index) => (
              <EventsRow key={index} date={date} filtros={filtros} />
            ))}

            <div className="spaceBtn">
              {days > 0 ? (
                <button style={{margin:"0px"}} className="btnok" onClick={() => setDays(days - 5)}>
                 ⇤ Mostrar los anteriores 5 dias
                </button>
              ): (<div></div>)}
              <button className="btnok" onClick={() => setDays(days + 5)}>
                Mostrar los siguientes 5 dias ⇥
              </button>
            </div>
            <div className="footer2"></div>
          </div>
        ) : (
          <div></div>
        )}
      </>
    );
  } else {
    return <div></div>;
  }
}
