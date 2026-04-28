import React, { Component } from "react";
import { useState } from 'react';
import API_URL from "../config";

function Checkbox(props) {
  const [isChecked, setIsChecked] = useState(props.initiallyChecked);

  const handleCheckboxChange = () => {
    if(!isChecked){
        destacarEvento()
    }else{
        publicarEvento()
    }
    setIsChecked(!isChecked);
  };

  const destacarEvento = () => {
    fetch(
      `${API_URL}/eventos/destacar-evento/${props.id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Puedes incluir encabezados de autenticación si es necesario
        },
      }
    )
      .then((response) => {})
      .catch((error) => {
        console.error("Error de red al publicar el local:", error);
      });
  };

  const publicarEvento = () => {
    fetch(
      `${API_URL}/eventos/publicar-evento/${props.id}/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Puedes incluir encabezados de autenticación si es necesario
        },
      }
    )
      .then((response) => {
        if (response.status === 200) {
          console.log("Local publicado con éxito.");
        } else if (response.status === 404) {
          console.error("Local no encontrado.");
        } else {
          console.error("Error al publicar el local.");
        }
      })
      .catch((error) => {
        console.error("Error de red al publicar el local:", error);
      });
  };
  
  return (
    <div>
      <input
        className="checkbox"
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
    </div>
  );
}

export default Checkbox;
