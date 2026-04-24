import { CategorysRow } from "./CategorysRow";
import { useEffect, useState } from "react";
import moment from "moment";
import { FeaturedEvents } from "./FeaturedEvents";
import { TopMenu } from "./topMenu";

export function Categorys(props) {
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
      ];

  useEffect(() => {
    if (props.category != undefined) {
        if(props.category != "Ver todas"){
            categorias = [props.category]
            console.log(categorias)
        }
    }
  }, []);
    
  return (
    <>
      <TopMenu/>
      {categorias.map((cat, index) => (
        <CategorysRow key={index} category={cat} />
      ))}
    </>
  );
  
}
