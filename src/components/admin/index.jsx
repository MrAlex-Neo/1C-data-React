import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ListElem from "../../elements/forMenu";
import AllForms from "./all";
import CreateForm from "./create";

import { useAtom } from "jotai";
import { isAuth } from "../login";
import "./style.css";

const AdminPage = () => {
  const list = ["Все категории", "Создать категорию", "Выход"];
  const [create, setCreate] = useState(false)
  const [auth, setAuth] = useAtom(isAuth)
  const navigate = useNavigate()

  const clickHandler = (e) => {
    console.log(e)
    if (e === "Все категории") {
      setCreate(false)
    } else if(e === "Создать категорию") {
      setCreate(true)
    }else if (e === "Выход"){
      localStorage.removeItem("token");
      navigate('/')
      setAuth(false)
    }
  }
  return (
    <div className="adminPage">
      <div className="adminList">
        {list.map((elem, i) => {
          return (
              <ListElem key={i} id={i} title={elem} clickElem={clickHandler} />
          );
        })}
      </div>
      <div className="adminContent">
        {
          create ? <CreateForm /> : <AllForms />
        }
      </div>
    </div>
  );
};
export default AdminPage;
