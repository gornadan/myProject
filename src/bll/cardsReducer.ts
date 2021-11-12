import { Dispatch } from "redux";
import {cardsAPI, CardsType, packsAPI} from "../api/api";

// const initialState: Array<CardsType> = [];
const initialState = {
  cards: [] as Array<CardsType>,
  grade: 0,
  sortCards: "" as string,
  page: 1,
  pageCount: 5,
  cardsTotalCount: 100,
  cardsPack_id: "",
  searchVal: "",
  sort: "",
  question: ""
};

type initialStateType = typeof initialState;

export const cardsReducer = (state: initialStateType = initialState, action: any): initialStateType => {
  switch (action.type) {
    case "SET-CARDS": {
      return {
        ...state,
        cards: [...action.cards],
      };
    }
    case "ADD-NEW-CARD": {
      return { ...action.cards, ...state };
    }

    case "SET-GRADE": {
      return { ...state, grade: action.grade };
    }

    case "SET-PAGEC": {
      return {
        ...state,
        page: action.page,
      };
    }

    case "CARD/SET-PAGE-COUNT": {
      return {
        ...state,
        pageCount: action.pageCount,
      };
    }

    case "CARDS/SET-SEARCH": {
      return {
        ...state,
        searchVal: action.searchVal,
      };
    }

    case "CARDS/SET-SORT-VAL": {
      return {
        ...state,
        sort: action.sortVal,
      };
    }

    case "SET-CARD-TOTAL-COUNT": {
      return {
        ...state,
        cardsTotalCount: action.cardsTotalCount,
      };
    }

    case "REMOVE-CARD": {
      return {
        ...state,
        cards: state.cards.filter((p) => p._id !== action.id),
      };
    }

    case " UPDATED-CARDS-QUESTION": {
      let newCardQuestion = state.cards.find((c) => c._id === action.id);
      if (newCardQuestion) {
        newCardQuestion.question = action.question;
      }
      return { ...state };
    }

    default:
      return state;
  }
};

//actions
const setCards = (cards: Array<CardsType>) => ({ type: "SET-CARDS", cards } as const);
const addNewCards = (cards: Array<CardsType>) => ({ type: "ADD-NEW-CARD", cards } as const);
const setGrade = (grade: number) => ({ type: "SET-GRADE", grade } as const);
const setPage = (page: number) => ({ type: "SET-PAGEC", page } as const);
export const setPageCountCard = (pageCount: number) => ({ type: "CARD/SET-PAGE-COUNT", pageCount } as const);
const setCardTotalCount = (cardsTotalCount: number) => ({ type: "SET-CARD-TOTAL-COUNT", cardsTotalCount } as const);
export const setSearch = (searchVal: string) => ({ type: "CARDS/SET-SEARCH", searchVal } as const);
export const setSortCards = (sortVal: string) => ({ type: "CARDS/SET-SORT-VAL", sortVal } as const);
const removeCard = (id: string) => ({ type: "REMOVE-CARD", id } as const);
const updatedCardsQuestion = (id: string, question: string) => ({ type: " UPDATED-CARDS-QUESTION", id, question } as const);



//thunk
export const fetchCardsThunk =
  (cardsPack_id: string, page?: number, pageCount?: number, cardQuestion?: string, sort?: string) =>
  (dispatch: Dispatch) => {
    cardsAPI.getCards(cardsPack_id, page, pageCount, cardQuestion, sort).then((res) => {
      console.log("cardQuestionTHUNK ", cardQuestion);
      dispatch(setCards(res.data.cards));
      page && dispatch(setPage(page));
      dispatch(setCardTotalCount(res.data.cardsTotalCount));
    });
  };

export const addNewCard = (cardsPack_id: string, question: string, answer: string) => (dispatch: Dispatch) => {
  cardsAPI.addNewCard(cardsPack_id, question, answer).then((res) => {
    dispatch(addNewCards([res.data.newCard]));
  });
};

export const setGradeCard = (grade: number, card_id: string) => (dispatch: Dispatch) => {
  cardsAPI.setGreageCard(grade, card_id).then((res) => {
    console.log(res);
    // dispatch(setGrade(res.data.grade));
  });
};

export const deleteCard = (id: string) => (dispatch: Dispatch) => {
  cardsAPI.deletedCard(id).then(() => {
    dispatch(removeCard(id));
  });
};

export const updatedCardQuestion = (cardsPack_id: string, id: string, question: string) => (dispatch: any) => {
  cardsAPI.updatedCardsQuestion(id, question).then(() => {
    dispatch(updatedCardsQuestion(id, question));
    dispatch(fetchCardsThunk(cardsPack_id))
  });
};

//types

type ActionsType =
  | ReturnType<typeof setCards>
  | ReturnType<typeof addNewCards>
  | ReturnType<typeof setPage>
  | ReturnType<typeof setCardTotalCount>
  | ReturnType<typeof setPageCountCard>
  | ReturnType<typeof setSearch>
  | ReturnType<typeof setSortCards>
  | ReturnType<typeof removeCard>
  | ReturnType<typeof updatedCardQuestion>
  | ReturnType<typeof setGrade>;
