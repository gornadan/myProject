import { ChangeEvent, useCallback, useState } from "react";
import SuperCheckbox from "../common/checkbox/Checkbox";
import SuperButton from "../common/button/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppStoreType } from "../../bll/store";
import { Redirect } from "react-router-dom";
import s from "./../registred/Registred.module.css";
import { onClickLoginThunk } from "../../bll/loginReducer";
import { Preloader } from "../Preloader/Preloader";

export const Login = () => {
  const isLoggedIn = useSelector<AppStoreType, boolean>((state) => state.login.isLogined);
  const error = useSelector<AppStoreType, string | null>((state) => state.register.error);
  const isFetching = useSelector<AppStoreType, boolean>((state) => state.login.isFetching);
  const [email, setEmail] = useState("gorna@inbox.ru");
  const [password, setPassword] = useState("11111111");
  const [checked, setChecked] = useState(false);
  const [errorEmailMessage, setErrorEmailMessage] = useState<string | null>(null);
  const [errorPasswordMessage, setErrorPasswordMessage] = useState<string | null>(null);

  const dispatch = useDispatch();
  const setEmailHandle = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };
  const setPasswordHandle = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const setEmailError = () => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{1,4}$/i.test(email)) {
      setErrorEmailMessage("Invalid email address");
    } else {
      setErrorEmailMessage(null);
    }
  };

  const setPasswordError = () => {
    if (password.length < 7 || password.length < 7 || !password) {
      setErrorPasswordMessage("Password must be more than 7 characters...");
    } else {
      setErrorPasswordMessage(null);
    }
  };

  const onClickHandler = useCallback(() => {
    dispatch(onClickLoginThunk(email, password, checked));
  }, [email, password, checked, dispatch]);

  if (isLoggedIn) {
    return <Redirect to={"/packs"} />;
  }

  return (
    <>
      {isFetching ? <Preloader /> : null}
      <div className={s.container}>
        <div className={s.form}>
          <input
            className={s.inputs}
            type={"email"}
            value={email}
            placeholder={"email"}
            onChange={setEmailHandle}
            onBlur={setEmailError}
          />
          {errorEmailMessage && <span className={s.error}>{errorEmailMessage}</span>}

          <input
            className={s.inputs}
            type={"password"}
            value={password}
            placeholder={"password"}
            onBlur={setPasswordError}
            onChange={setPasswordHandle}
          />
          {error && <span className={s.error}>{error}</span>}
          {errorPasswordMessage && <span className={s.error}>{errorPasswordMessage}</span>}

          <SuperCheckbox checked={checked} onChangeChecked={setChecked} />
          <div className={s.btn_wrap}>
            <SuperButton className={s.register_btn} onClick={onClickHandler}>
              Sign in
            </SuperButton>
          </div>
        </div>
      </div>
    </>
  );
};
