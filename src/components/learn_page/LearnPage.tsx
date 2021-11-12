import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {CardsType} from "../../api/api";
import {fetchCardsThunk, setGradeCard} from "../../bll/cardsReducer";
import {AppStoreType} from "../../bll/store";
import s from "../registred/Registred.module.css";
import ModalQuestionCard from "../cards/add-new-card-modal/ModalQuestionCard";


const grades = ["не знал", "забыл", "долго думал", "перепутал", "знал"];

const getCard = (cards: CardsType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce(
        (acc: { sum: number; id: number }, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id};
        },
        {sum: 0, id: -1}
    );
    return cards[res.id + 1];
};

export const LearnPage = () => {
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [first, setFirst] = useState<boolean>(true);
    const cards = useSelector<AppStoreType, CardsType[]>((state) => state.cards.cards);
    const page = useSelector<AppStoreType, number>((state) => state.cards.page);
    const pageCount = useSelector<AppStoreType, number>((state) => state.cards.pageCount);
    const {id} = useParams<{ id: string }>();

    // const [show, setShow] = useState(false);
    // const [answer, setAnswer] = useState(false);

    const [card, setCard] = useState<CardsType>({
        __v: 0, user_id: "",
        _id: "fake",
        cardsPack_id: "",

        answer: "answer fake",
        question: "question fake",
        grade: 0,
        shots: 0,

        type: "",
        rating: 0,
        more_id: "",

        created: "",
        updated: ""
    });

    const dispatch = useDispatch();
    useEffect(() => {
        if (first) {
            dispatch(fetchCardsThunk(id, page, pageCount));
            setFirst(false);
        }

        if (cards.length > 0) setCard(getCard(cards));

        return () => {
        };
    }, [dispatch, id, cards, first]);

    //
    // const setTrue = () => {
    //     setAnswer(true);
    //     setShow(false);
    // };
    // const setFalse = () => {
    //     setAnswer(false);
    //     setShow(false);
    // };

    const onNext = () => {
        setIsChecked(false);

        if (cards.length > 0) {
            // dispatch
            setCard(getCard(cards));
        } else {
        }
    };

    return (
        <div>
      <span>
         LearnPage
        {/*<button className={s.register_btn} onClick={() => setShow(true)}>*/}
        {/*    cancel card*/}
        {/*  </button>*/}
        {/*  {answer ? <span>Yes</span> : <span>No</span>}*/}
      </span>
            {/*<ModalQuestionCard*/}
            {/*    show={show}*/}

            {/*    setTrue={setTrue}*/}
            {/*    setFalse={setFalse}*/}

            {/*    enableBackground={true}*/}
            {/*    backgroundOnClick={() => setShow(false)}*/}

            {/*    width={300}*/}
            {/*    height={200}*/}
            {/*/>*/}

            <div>{card.question}</div>
            <div>
                <button className={s.register_btn} onClick={() => setIsChecked(true)}>check</button>
            </div>
            {isChecked && (
                <>
                    <div>{card.answer}</div>

                    {grades.map((g, i) => (
                        <button className={s.cancel_btn}
                                key={"grade-" + i}
                                onClick={() => {
                                    dispatch(setGradeCard(i + 1, card._id));
                                }}
                        >
                            {g}
                        </button>
                    ))}

                    <div>
                        <button className={s.register_btn} onClick={onNext}>next</button>
                    </div>
                </>
            )}
        </div>
    );
};
