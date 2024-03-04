import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchForm } from "../../../redux/slices/forms";
import { useParams } from "react-router-dom";
import PrimaryInput from "../../../UI/inputs/primary";
import arrow from "./back-svgrepo-com.svg";
import "./style.css";

const Create = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.prod.form.item);
  const { id } = useParams();
  const [num, setNum] = useState(0);

  useEffect(() => {
    dispatch(fetchForm(id));
  }, []);

  const inputValue =
    data && data.data && data.data.length > 0 ? data.data[num] : "";

  const clickHandler = (e) => {
    console.log(e.target.id);
    if (e.target.id === "next") {
      if (num + 1 < data.data.length) {
        setNum((e) => e + 1);
      }
    } else {
      if (num > 0) {
        setNum((e) => e - 1);
      } else {
        
        const result = window.confirm(
          "Вы действительно хотите прервать заполнение формы?"
        );
        if (result) {
          navigate("/");
        }
      }
    }
  };
  return (
    <div className="createBox">
      <h1>Категория : {data.title}</h1>
      {data.data && data.data.length > 0 ? (
        <div className="createBoxBody">
          <PrimaryInput
            text="Название параметра"
            placeholder="введите имя..."
            InputName="login"
            value={inputValue}
            type="default"
          />
          <div>
            <textarea
              name={inputValue}
              cols="30"
              rows="10"
              placeholder="писать можно тутъ..."
            ></textarea>
          </div>
          <div className="createBoxBtn">
            <div className="backBtn arrow" onClick={clickHandler}>
              <img id="back" src={arrow} alt="" />
            </div>
            <p>
              {num + 1}/{data.data.length}
            </p>
            <div className="nextBtn arrow" onClick={clickHandler}>
              <img id="next" src={arrow} alt="" />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Create;
