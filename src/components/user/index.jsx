import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchForms, fetchForm } from "../../redux/slices/forms";
import { useNavigate } from "react-router-dom";
import Dropdown from "../../elements/Dropdown";
import PrimaryBtn from "../../UI/buttons/primary";
import img from './forms-document-svgrepo-com.svg'
import "./style.css";

const MainPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const data = useSelector((state) => state.prod.forms.items);
    const [formId, setFormId] = useState(null)

    useEffect(()=>{
        dispatch(fetchForms())
    },[])
    useEffect(()=>{
        console.log(formId)
    },[formId])
    
    const createFormHandler = async () => {
        if (formId !== null) {
            navigate(`/create/${formId}`)
        }else{
            alert("Выберите категорию")
        }
    };
    const categoryIdHandler = (e) => {
        setFormId(e)
    }
  return (
    <div className="mainPage">
      <div className="mainHeader">
        <h1>Добро пожаловать!</h1>
        <div className="mainImg">
            <img src={img} alt="" />
        </div>
        <h3>Тут вы можете заполнить формы и отослать...куда надо</h3>
        <h3>Выберите категорию:</h3>
      </div>
      <Dropdown categoryId={categoryIdHandler} category={true} options={data} />
      <div className="completeBtn" onClick={createFormHandler}>
        <PrimaryBtn type="button" text="Заполнить форму" name="formComplete" />
      </div>
    </div>
  );
};

export default MainPage;
