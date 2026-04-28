import React from "react";
import { useEffect, useState } from "react";

import "../styles/Dropdown.css";
import { Link } from "react-router-dom";
import "../styles/Detail.css";
import { useLocation } from "react-router-dom";

function OptionDropdown({ items, selectedItems, title, onItemSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const location = useLocation();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    onItemSelect(item);
  };

  const handleReload = (e) => {
    // Verifica si el enlace apunta a la ubicación actual
    if (e.currentTarget.pathname === location.pathname) {
      // Forza la recarga de la página si es la misma ubicación
      window.location.reload();
    }
  };

  useEffect(() => {
  }, [items]);

  return (
    <>
    {items != [] ? (
      <div className={`dropdown ${isOpen ? "open" : ""}`}>
      <button onClick={toggleDropdown} className="dropdown-toggle">
        {selectedItem || title}
      </button>
      <ul className="dropdown-menu">
        {items.map((item, index) => (
          <li key={item}>
            <label className="labelRow">
              {item}
              <input
                className="miniCheck"
                type="checkbox"
                checked={selectedItems.includes(item)}
                onChange={() => handleItemClick(item)}
              />
            </label>{" "}
          </li>
        ))}
      </ul>
    </div>
    ) : (
      <div>Este es el mensaje que se muestra si mostrarMensaje es falso.</div>
    )}
    </>
  );
}

export default OptionDropdown;
