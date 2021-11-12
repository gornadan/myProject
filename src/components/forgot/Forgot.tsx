import React, { ChangeEvent, useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotThunk } from "../../bll/forgotReduser";
import s from "./../registred/Registred.module.css";
import { CheckEmail } from "./FogotPassword";
import { AppStoreType } from "../../bll/store";
import { Preloader } from "../Preloader/Preloader";

export const Forgot = () => {
  const dispatch = useDispatch();
  const error = useSelector<AppStoreType, string | null>((state) => state.register.error);
  const isSend = useSelector<AppStoreType, boolean>((state) => state.forgot.isSend);
  const isFetching = useSelector<AppStoreType, boolean>((state) => state.register.isFetching);

  const [emailValue, setEmailValue] = useState("");
  const [errorEmailMessage, setErrorEmailMessage] = useState<string | null>(null);
  const onSubmitForm = useCallback(() => {
    dispatch(forgotThunk(emailValue));
  }, [dispatch, emailValue]);

  const setEmailHandle = (e: ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.currentTarget.value);
  };
  const setEmailError = () => {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{1,4}$/i.test(emailValue)) {
      setErrorEmailMessage("Invalid email address");
    } else {
      setErrorEmailMessage(null);
    }
  };

  return (
    <>
      {isFetching ? <Preloader /> : null}
      {!isSend && (
        <div className={s.container}>
          <div className={s.form}>
            <h3>It-incubator</h3>
            <p>Forgot your password?</p>
            <input
              type="email"
              value={emailValue}
              onChange={setEmailHandle}
              className={s.inputs}
              onBlur={setEmailError}
              placeholder={"Email"}
            />
            {errorEmailMessage && <span className={s.error}>{errorEmailMessage}</span>}
            <button onClick={onSubmitForm} className={s.register_btn}>
              Send
            </button>
            {error && <span className={s.error}>{error}</span>}
            <p>Did you remember your password?</p>
            <h4>Try logging in</h4>
          </div>
        </div>
      )}
      {isSend && <CheckEmail />}
    </>
  );
};
