import { useCallback, useState } from "react";
import { ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { setNewPasswordThunk } from "../bll/forgotReduser";
import { AppStoreType } from "../bll/store";
import s from "../components/registred/Registred.module.css";
import { Preloader } from "./Preloader/Preloader";

function EnteringNewPassword() {
  const { token } = useParams<{ token: string }>();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [errorPasswordMessage, setErrorPasswordMessage] = useState<string | null>(null);
  const dispatch = useDispatch();

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
    dispatch(setNewPasswordThunk(password, token));
  }, [dispatch, password, token]);

  const isNewPasswordSet = useSelector<AppStoreType, boolean>((state) => state.forgot.isNewPasswordSet);
  if (isNewPasswordSet) {
    return <Redirect to={"/login"} />;
  }
  return (
    <>
      {isFetching ? <Preloader /> : null}
      <div className={s.container}>
        <div className={s.form}>
          <h3>Set new password</h3>
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
            <button className={s.register_btn} onClick={onSubmitForm}>
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EnteringNewPassword;
