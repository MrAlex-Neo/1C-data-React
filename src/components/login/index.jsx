import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuth, fetchAuthMe } from "../../redux/slices/auth";
import { authData } from "../../UI/inputs/primary";
import { atom, useAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import PrimaryBtn from "../../UI/buttons/primary";
import SecondaryBtn from "../../UI/buttons/secondary";
import PrimaryInput from "../../UI/inputs/primary";
import "./style.css";

export const isAuth = atom(false);

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [authDataValue, setAuthDataValue] = useAtom(authData);
  const [auth, setAuth] = useAtom(isAuth);
  const [log, setLog] = useState(true);
  useEffect(() => {
    // console.log(authDataValue);
  }, [log, authDataValue]);
  const authOnclickHandler = async (e) => {
    // console.log(e.target.name);
    if (e.target.name === "authLog") {
      setLog(false);
    } else if (e.target.name === "backAuth") {
      setLog(true);
    } else if (e.target.name === "backLog") {
      navigate("/");
      setLog(false);
    } else if (e.target.name === "authClick") {
      try {
        const data = await dispatch(fetchAuth(authDataValue));
        if (!data || !data.payload) {
          return alert("Ошибка при авторизации");
        }
        if (data) {
          window.localStorage.setItem("token", data.payload.token);
          const user = await dispatch(fetchAuthMe());
          console.log(user);
          setAuth(true);
          setAuthDataValue({
            login: '',
            password: ''
          })
          navigate("/admin");
        }
      } catch (error) {
        console.error("An error occurred during authentication:", error);
      }
    }
  };
  return (
    <div className="loginBox">
      {log ? (
        <div className="loginBody">
          <h1>Авторизация</h1>
          <h3>Внимание!</h3>
          <p>
            Режим "Авторизации" доступен только для администора данного
            приложения. Если вы не являетесь администратором, то будьте так
            любезны, перейдите на начальную страницу с выбором категории.
          </p>
          <div className="btnLoginBox" onClick={authOnclickHandler}>
            <SecondaryBtn type="button" text="На главную" name="backLog" />
            <PrimaryBtn type="button" text="Я Админ" name="authLog" />
          </div>
        </div>
      ) : (
        <div className="loginForm">
          <h1>Авторизация</h1>
          <PrimaryInput
            text="Имя"
            placeholder="введите имя..."
            InputName="login"
            value={authDataValue.login}
            type="text"
          />
          <PrimaryInput
            text="Пароль"
            placeholder="введите пароль..."
            InputName="password"
            value={authDataValue.password}
            type="password"
          />
          <div className="btnLoginBox" onClick={authOnclickHandler}>
            <SecondaryBtn type="button" text="Назад" name="backAuth" />
            <PrimaryBtn type="button" text="Войти" name="authClick" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
