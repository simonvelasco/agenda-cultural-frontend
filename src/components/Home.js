import { EventsRow } from "./EventsRow";
import { useEffect, useState } from "react";
import moment from "moment";
import { FeaturedEvents } from "./FeaturedEvents";
import { TopMenu } from "./topMenu";
import API_URL from "../config";

export function Home() {
  const [datesArray, setDatesArray] = useState([]);
  const [days, setDays] = useState(0);

  useEffect(() => {
    const currentDate = moment();
    const next4Days = [];

    for (let i = 0 + days; i < 5 + days; i++) {
      next4Days.push(currentDate.clone().add(i, "days").format("YYYY-MM-DD"));
    }
    setDatesArray(next4Days);
  }, [days]);

  const deletePastEvents = (date) => {
    fetch(`${API_URL}/eventos/eliminar-eventos-anteriores/${date}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al eliminar eventos anteriores: ${response.statusText}`);
        }
        console.log("Eventos anteriores eliminados con éxito");
      })
      .catch((error) => {
        console.error("Error al hacer la solicitud:", error);
      });
  };

  return (
    <>
      <TopMenu />
      {datesArray.map((date, index) => (
        <EventsRow key={index} date={date} />
      ))}
      <FeaturedEvents />
    </>
  );
}