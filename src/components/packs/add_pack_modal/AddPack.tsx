import { ChangeEvent, KeyboardEvent, useState } from "react";
import s from "../../registred/Registred.module.css";

type PropsType = {
  addPack: (title: string) => void;
  closeModal: () => void;
};

export const AddPack = (props: PropsType) => {
  const [packTitle, setPackTitle] = useState("");

  const setNewPackTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setPackTitle(e.currentTarget.value);
  };

  const addPackHandler = () => {
    if (packTitle.trim() !== "") {
      props.addPack(packTitle);
      setPackTitle("");
      props.closeModal();
    }
  };

  const addPackOnKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    // if (error !== null) setError(null);
    if (e.charCode === 13) {
      addPackHandler();
    }
  };

  return (
    <div className={s.modal} onClick={props.closeModal}>
      <div className={s.form} onClick={(e) => e.stopPropagation()}>
        <span>
          <h3>Add new pack</h3>
          <label>Name pack</label>
          <button className={s.closeButton} onClick={props.closeModal}>
            &#10006;
          </button>
        </span>
        <div>
          <input
            type="text"
            value={packTitle}
            onChange={setNewPackTitle}
            onKeyPress={addPackOnKeyPressHandler}
            placeholder={"Name pack"}
            className={s.inputs}
          />
        </div>
        <div className={s.btn_wrap}>
          <button className={s.cancel_btn} onClick={props.closeModal}>
            Cancel
          </button>
          <button className={s.register_btn} onClick={addPackHandler}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
