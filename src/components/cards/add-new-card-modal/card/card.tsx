import React, {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";
import s from "../../../../table.module.css";
import {Rating} from "../../../rating/Rating";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../../bll/store";
import {updatedCardQuestion} from "../../../../bll/cardsReducer";
import {CardsType} from "../../../../api/api";

type CardPropsType = {
    card: CardsType;
    removeCard: (id: string) => void;
    cardsPack_id: string;

}

export const Card = (props: CardPropsType) => {


    const userId = useSelector<AppStoreType, string | null>((state) => state.auth._id);
    const [editMode, setEditMode] = useState(false);
    const [newQuestion, setNewQuestion] = useState(props.card.question);
    const dispatch = useDispatch()


    const changeQuestion = (e: ChangeEvent<HTMLInputElement>) => {
        setNewQuestion(e.currentTarget.value);
    };
    const activeViewMode = () => {
        setEditMode(!editMode);
        if (newQuestion && newQuestion.trim() !== "") {
            addNewQuestion(newQuestion);
        }
    };
    let addNewQuestion = useCallback(
        (newQuestion: string) => {
            dispatch(updatedCardQuestion(props.cardsPack_id, props.card._id, newQuestion));
        },
        [dispatch]
    );
    const addTaskOnKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            activeViewMode();
        }
    };

    const onClickHandler = () => {
        setEditMode(!editMode);
        setNewQuestion(props.card.question);
    };

    const removeCardHandler = useCallback(() => {
        props.removeCard(props.card._id);
    }, [props]);
    const stars = [1, 1, 1, 1, 1];

    return <div className={s.table_container_card }>

        <div className={s.table_body_card + " " + s.table_line_card}>

            <span>{props.card.question}</span>
            <span>{props.card.answer}</span>
            <div className={s.grade}>
                {stars.map((star, i) => (
                    <Rating key={i} blue={props.card.grade > i}/>
                ))}
            </div>
            <div className={s.table_line_card}>
                {editMode ? (
                    <input
                        onChange={changeQuestion}
                        autoFocus
                        onBlur={activeViewMode}
                        onKeyPress={addTaskOnKeyPressHandler}
                        value={newQuestion}
                    />
                ) : (
                    <div>
                        {" "}
                    </div>
                )}

                {userId === props.card.user_id && (
                    <span className={s.btns}>
                    <button className={s.delete} onClick={removeCardHandler}>
                      Delete
                    </button>
                    <button className={s.edit} onClick={onClickHandler}>
                      Edit
                    </button>
                  </span>
                )}
            </div>
        </div>

    </div>
}