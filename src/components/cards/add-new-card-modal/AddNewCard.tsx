import {ChangeEvent, useCallback, useState} from "react";
import {useDispatch} from "react-redux";
import {addNewCard} from "../../../bll/cardsReducer";
import s from "../../registred/Registred.module.css";

type PropsType = {
    id: string;
    closeModal: () => void
};

export const AddNewCard = (props: PropsType) => {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const dispatch = useDispatch();

    const setQuestionHandle = (e: ChangeEvent<HTMLInputElement>) => {
        setQuestion(e.currentTarget.value);
    };
    const setAnswerHandle = (e: ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.currentTarget.value);
    };

    let addNewCards = useCallback(
        (question: string, answer: string) => {
            dispatch(addNewCard(props.id, question, answer));
        },
        [props.id, dispatch]
    );

    const addCardHandler = () => {
        if (question.trim() !== "" && answer.trim() !== "") {
            addNewCards(question, answer);
        }
    };

    return (
        <div className={s.modal} onClick={props.closeModal}>
            <div className={s.form} onClick={e => e.stopPropagation()}>
      <span>
        <h3>Add new card</h3>
          <label>Name card</label>
          <button className={s.closeButton} onClick={props.closeModal}>&#10006;</button>
      </span>

                <div>
                    <input type="text"
                           placeholder={"Question"}
                           value={question}
                           onChange={setQuestionHandle}
                           className={s.inputs}
                    />
                    <input type="text"
                           placeholder={"Answer"}
                           value={answer}
                           onChange={setAnswerHandle}
                           className={s.inputs}
                    />
                </div>
                <div className={s.btn_wrap}>
                    <button className={s.cancel_btn} onClick={props.closeModal}>Cancel</button>
                    <button className={s.register_btn} onClick={addCardHandler}>Save</button>
                </div>
            </div>
        </div>
    );
};
