import { Routes, Route } from "react-router-dom";

import Create from "./components/user/create";
import MainPage from "./components/user";
import AdminPage from "./components/admin";
import Header from "./components/header";
import Login from "./components/login";
import "./UI/styles/style.css";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path={`/`} element={<MainPage />} />
        <Route path={`/log`} element={<Login />} />
        <Route path={`/create/:id`} element={<Create />} />
        <Route path={`/admin`} element={<AdminPage />} />
      </Routes>
    </div>
  );
}

export default App;
