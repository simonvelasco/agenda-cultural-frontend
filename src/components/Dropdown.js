import React, { useState } from 'react';
import '../styles/Dropdown.css';
import { Link } from "react-router-dom";
import '../styles/Detail.css'


function Dropdown({ items, onSelect, links, title }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div className={`dropdown ${isOpen ? 'open' : ''}`}>
      <button onClick={toggleDropdown} className="dropdown-toggle">
        {selectedItem || title}
      </button>
      <ul className="dropdown-menu">
        {items.map((item, index) => (
          <li key={item} >
            <Link to={links[index]}>
            {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dropdown;
