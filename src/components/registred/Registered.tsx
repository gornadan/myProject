import { ChangeEvent, useState } from "react";
import s from "./Registred.module.css";
import { useDispatch, useSelector } from "react-redux";
import { checkInThunk } from "../../bll/registredReduser";
import { useCallback } from "react";
import { AppStoreType } from "../../bll/store";
import { Preloader } from "../Preloader/Preloader";
import { AuthRedirectComponent } from "../../hoc/AuthRedirectComponent";

const Registered = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorEmailMessage, setErrorEmailMessage] = useState<string | null>(null);
  const [errorPasswordMessage, setErrorPasswordMessage] = useState<string | null>(null);

  const dispatch = useDispatch();

  const setEmailHandle = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const setEmailError = () => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{1,4}$/i.test(email)) {
      setErrorEmailMessage("Invalid email address");
    } else {
      setErrorEmailMessage(null);
    }
  };

  const setPasswordHandle = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const setPasswordError = () => {
    if (password !== confirmPassword || password.length !== confirmPassword.length) {
      setErrorPasswordMessage("Password mismatch");
    } else if (password.length < 7 || confirmPassword.length < 7) {
      setErrorPasswordMessage("Password must be more than 7 characters...");
    } else {
      setErrorPasswordMessage(null);
    }
  };

  const setConfirmPassHandle = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.currentTarget.value);
  };

  const error = useSelector<AppStoreType, string | null>((state) => state.register.error);
  const isFetching = useSelector<AppStoreType, boolean>((state) => state.register.isFetching);

  const onSubmitForm = useCallback(() => {
    dispatch(checkInThunk(email, password));
  }, [email, password, dispatch]);

  return (
    <>
      {isFetching ? <Preloader /> : null}
      <div className={s.container}>
        <div className={s.form}>
          <h3>Sing up</h3>
          <input
            type="email"
            className={s.inputs}
            value={email}
            onChange={setEmailHandle}
            onBlur={setEmailError}
            placeholder={"Email"}
          />
          {errorEmailMessage && <span className={s.error}>{errorEmailMessage}</span>}
          <input
            type="password"
            className={s.inputs}
            value={password}
            onChange={setPasswordHandle}
            placeholder={"Password"}
          />
          <input
            type="password"
            className={s.inputs}
            value={confirmPassword}
            onChange={setConfirmPassHandle}
            onBlur={setPasswordError}
            placeholder={"Confirm password"}
          />
          {error && <span className={s.error}>{error}</span>}
          {errorPasswordMessage && <span className={s.error}>{errorPasswordMessage}</span>}

          <div className={s.btn_wrap}>
            <button className={s.cancel_btn}>Cancel</button>
            <button className={s.register_btn} onClick={onSubmitForm}>
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthRedirectComponent(Registered);
