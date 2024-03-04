import { useEffect } from "react";

import "./style.css";

const SecondaryInput = (props) => {
  const { text, InputName, placeholder, value, type } = props;

  const changeHandler = (e) => {
      const { name, value } = e.target;
  };
  return (
    <div className="secondaryInput">
      <label htmlFor={InputName}>{text}</label>
      <input
        name={InputName}
        onChange={changeHandler}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SecondaryInput;
