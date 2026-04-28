import { CategorysRow } from "./CategorysRow";
import { useEffect, useState } from "react";
import { TopMenu } from "./topMenu";
import { useParams } from "react-router-dom";

export function Categorys(props) {
  const [categorias, setCategorias] = useState(["Música",
  "Escénicas",
  "Arte",
  "Cine",
  "Literatura",
  "Infantiles",
  "Especiales",
  "Gastronómicos",
  "Entretenimiento",
  "Aire Libre",
  "Deportivos",]);

  const { category } = useParams();

  useEffect(() => {
    if (category != undefined) {
      if (category != "Ver todas") {
        setCategorias([category])
        console.log(categorias);
        console.log(props.category);
      }
    }
  }, [category]);

  return (
    <>
      <TopMenu />
      <div className="title2">Categorias</div>

      {categorias.map((cat, index) => (
        <CategorysRow key={index} category={cat} />
      ))}
    </>
  );
}
