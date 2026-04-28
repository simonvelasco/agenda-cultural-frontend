import React, { useState } from 'react';
import '../styles/Dropdown.css';
import { Link } from "react-router-dom";
import '../styles/Detail.css'
import { useLocation } from "react-router-dom";



function Dropdown({ items, onSelect, links, title }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const location = useLocation();


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleReload = (e) => {
    // Verifica si el enlace apunta a la ubicación actual
    if (e.currentTarget.pathname === location.pathname) {
      // Forza la recarga de la página si es la misma ubicación
      window.location.reload();
    }
  };

  return (
    <div className={`dropdown ${isOpen ? 'open' : ''}`}>
      <button onClick={toggleDropdown} className="dropdown-toggle">
        {selectedItem || title}
      </button>
      <ul className="dropdown-menu">
        {items.map((item, index) => (
          <li key={item} >
            <Link to={links[index]} onClick={handleReload}>
            {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dropdown;
