import React, { useEffect } from "react";
import "./App.css";
import { HashRouter } from "react-router-dom";
import Routes from "./components/routes/Routes";
import Header from "./components/header/Header";
import { useDispatch } from "react-redux";
import { authThunk } from "./bll/authReducer";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authThunk());
  });

  return (
    <div className="App">
      {/*в gh-pages лучше работает HashRouter*/}
      <HashRouter>
        <Header />
        <div className="container">
          <Routes />
        </div>
      </HashRouter>
    </div>
  );
}

export default App;
