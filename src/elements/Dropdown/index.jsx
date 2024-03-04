import React, { useState } from "react";
import "./style.css";
const Dropdown = ({ options, category, categoryId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (e) => {
    setSelectedOption(e.target.textContent);
    setIsOpen(false);
    if (category) {
      categoryId(e.target.id)
    }
  };

  return (
    <div className="dropdown">
      <input
        type="text"
        value={selectedOption}
        placeholder={
          category ? "Просмотреть категории" : "Просмотреть параметры"
        }
        onClick={toggleDropdown}
        readOnly
      />
      {isOpen && (
        <div className="dropdown-list">
          {category
            ? options.map((option, index) => (
                <div key={index} className="dropText" id={option._id} onClick={handleSelect}>
                  <span >{option.title}</span>
                </div>
              ))
            : options.map((option, index) => (
                <div key={index} className="dropText" onClick={handleSelect}>
                  <span>{option}</span>
                </div>
              ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
