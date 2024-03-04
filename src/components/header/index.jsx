import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { isAuth } from "../login";
import { useAtom } from "jotai";
import { useSelector, useDispatch } from "react-redux";
import { fetchAuthMe } from "../../redux/slices/auth";
import { selectIsAuth } from "../../redux/slices/auth";
import userImg from "./img/user.svg";
import logImg from "./img/log.svg";
import collect from "./img/collection.svg";
import "./style.css";

const Header = () => {
  const [user, setUser] = useAtom(isAuth);

  useEffect(() => {
    setUser(isAuth)
  }, [isAuth])
  if (localStorage.getItem('token')) {
    setUser(true)
  }else{
    setUser(false)
  }

  return (
    <div className="headerBox">
      {user ? (
      <Link style={{ all: 'unset'}} to='/'>
        <div className="headerCollection firstBox">
          <img src={collect} alt="" />
          <p>Пользователь</p>
        </div>
      </Link>
      ) : null}
      <Link style={{ all: 'unset'}} to={user ? '/admin' : '/log'}>
        <div className="headerUser firstBox">
          <img src={user ? userImg : logImg} alt="" />
          <p>{user ? "Администратор" : "Войти"}</p>
        </div>
      </Link>
    </div>
  );
};

export default Header;
