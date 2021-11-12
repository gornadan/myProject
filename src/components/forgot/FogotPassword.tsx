import photo from "./logo.png";
import s from "./../registred/Registred.module.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { isSend } from "../../bll/forgotReduser";

export const CheckEmail = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const close = setTimeout(() => {
      dispatch(isSend(false));
    }, 8000);

    return () => {
      clearTimeout(close);
    };
  }, [dispatch]);

  return (
    <div className={s.container}>
      <div className={s.form}>
        <h3>It-incubator</h3>

        <div>
          <img src={photo} alt="" />
        </div>
        <h3> Check Email</h3>
        <p className={s.block}>
          We’ve sent an Email with instructions to
          <br /> example@mail.com
        </p>
      </div>
    </div>
  );
};
