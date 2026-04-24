import { EventsRow } from "./EventsRow";
import { useEffect, useState } from "react";
import moment from "moment";
import { FeaturedEvents } from "./FeaturedEvents";
import { TopMenu } from "./topMenu";

export function Home() {
  const [datesArray, setDatesArray] = useState([]);
  const [days, setDays] = useState(0);
  const [data, setData] = useState([]);


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
    fetch(`http://127.0.0.1:8000/eventos/eliminar-eventos-anteriores/${date}/`,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json', // Si es necesario, ajusta el tipo de contenido
      },})
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error al eliminar eventos anteriores: ${response.statusText}`);
        }
        console.log('Eventos anteriores eliminados con éxito');
      })
      .catch((error) => {
        console.error('Error al hacer la solicitud:', error);
        // Aquí puedes manejar el error si ocurre
      });
    }

  return (
    <>
      <TopMenu/>
      {datesArray.map((date, index) => (
        <EventsRow key={index} date={date} />
      ))}
      
      <FeaturedEvents/>
    </>
  );
  
}
