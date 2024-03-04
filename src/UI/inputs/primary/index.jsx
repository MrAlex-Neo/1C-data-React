import { useEffect } from "react";
import { atom, useAtom } from "jotai";

import "./style.css";

export const authData = atom({
  login: "",
  password: "",
});
export const formData = atom({
  title: "",
  data: [],
});
const PrimaryInput = (props) => {
  const [, setAuth] = useAtom(authData);
  const { text, InputName, placeholder, value, type, key, valueHandler } = props;

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setAuth((prevAuth) => ({
      ...prevAuth,
      [name]: value,
    }));
  };
  return (
    <div className="primaryInput" key={key}>
      <label htmlFor={InputName}>{text}:</label>
      <input
        name={InputName}
        placeholder={placeholder}
        onChange={changeHandler}
        value={value}
        type={type}
      />
    </div>
  );
};

export default PrimaryInput;
