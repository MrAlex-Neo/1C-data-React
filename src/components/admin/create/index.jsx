import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCreateForm } from "../../../redux/slices/forms";
import { useNavigate } from "react-router-dom";
import PrimaryInput from "../../../UI/inputs/primary";
import SecondaryInput from "../../../UI/inputs/secondary";
import PrimaryBtn from "../../../UI/buttons/primary";
import SecondaryBtn from "../../../UI/buttons/secondary";

import "./style.css";

const CreateForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [num, setNum] = useState(1);
  const [formData, setFormData] = useState({});
  const [sentForm, setSentForm] = useState(false);

  useEffect(() => {
    if (sentForm) {
      try {
        console.log(formData);
        const response = dispatch(fetchCreateForm(formData));
        console.log(response);
        alert(`Поздравляю! Вы успешно создали форму ${formData.title}`);
        const inputs = document.querySelectorAll(
          "input[name^='categoryCreateName']"
        );
        const inputTitle = document.querySelector(
          "input[name^='categoryCreateParams']"
        );
        inputTitle.value = "";
        inputs.forEach((input, index) => {
          input.value = "";
        });
        setNum(1);
        setSentForm(false);
      } catch (error) {
        setSentForm(false);
        console.log(error);
      }
    }
  }, [formData, sentForm]);

  const fetchCreateFormHandler = () => {
    setSentForm(true);
  };
  const createParamsHandler = () => {
    setNum((num) => num + 1);
  };

  const createFormHandler = () => {
    const inputs = document.querySelectorAll(
      "input[name^='categoryCreateName']"
    );
    const inputTitle = document.querySelector(
      "input[name^='categoryCreateParams']"
    );
    const data = [];
    inputs.forEach((input, index) => {
      data.push(input.value);
    });
    console.log("FormData:", data);
    setFormData((prev) => ({
      title: inputTitle.value,
      data: data,
    }));
    fetchCreateFormHandler();
  };

  const renderInputs = () => {
    const inputs = [];
    for (let i = 0; i < num; i++) {
      inputs.push(
        <div key={i}>
          <PrimaryInput
            text="Параметр для ввода информации"
            InputName={`categoryCreateName${i + 1}`}
            placeholder="Введите текст"
            type="text"
          />
        </div>
      );
    }
    return inputs;
  };

  return (
    <div className="createFormBox">
      <h2>Создание категории:</h2>
      <SecondaryInput
        text="Назовите вашу категорию:"
        InputName="categoryCreateParams"
        placeholder="Введите текст"
        type="text"
      />
      <h3>Параметры:</h3>

      {renderInputs()}
      <div className="createBtn" onClick={createParamsHandler}>
        <SecondaryBtn type="button" text="Добавить параметр" name="addParam" />
      </div>
      <div className="createBtn" onClick={createFormHandler}>
        <PrimaryBtn type="button" text="Создать форму" name="formFinish" />
      </div>
    </div>
  );
};

export default CreateForm;
