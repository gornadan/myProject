import { Dispatch } from "redux";
import { CardPacksType, packsAPI } from "../api/api";
import { toggleIsFetching } from "./loginReducer";

// const initialState: Array<CardPacksType> = [];

const initialState = {
  packs: [] as Array<CardPacksType>,
  page: 1,
  pageCount: 10,
  cardPackTotalCount: 100,
  packName: "",
  sortPack: "",
};

type initialStateType = typeof initialState;

export const packsReducer = (state = initialState, action: ActionsType): initialStateType => {
  switch (action.type) {
    case "SET-PACKS": {
      return {
        ...state,
        packs: [...action.packs],
      };
    }
    case "ADD-PACK-TITLE": {
      return {
        ...state,
        packs: [...action.packs, ...state.packs],
      };
    }

    case "SET-PAGEP": {
      return {
        ...state,
        page: action.page,
      };
    }
    case "PACKS/SET-PAGE-COUNT": {
      return {
        ...state,
        pageCount: action.pageCount,
      };
    }
    case "SET-CARD-PACK-TOTAL-COUNT": {
      return {
        ...state,
        cardPackTotalCount: action.cardPackTotalCount,
      };
    }

    case "SET-FILTER-PACK-NAME": {
      return {
        ...state,
        packName: action.name,
      };
    }
    case "SET-SORT-PACKS": {
      return {
        ...state,
        sortPack: action.sortPack,
      };
    }

    default:
      return state;
  }
};

//actions
const setPacks = (packs: Array<CardPacksType>) => ({ type: "SET-PACKS", packs } as const);
const addPackTitle = (packs: any) => ({ type: "ADD-PACK-TITLE", packs } as const);
const setPage = (page: number) => ({ type: "SET-PAGEP", page } as const);
export const setPageCount = (pageCount: number) => ({ type: "PACKS/SET-PAGE-COUNT", pageCount } as const);
const setCardPackTotalCount = (cardPackTotalCount: number) =>
  ({ type: "SET-CARD-PACK-TOTAL-COUNT", cardPackTotalCount } as const);
export const setFilterPackName = (name: string) => ({ type: "SET-FILTER-PACK-NAME", name } as const);
export const setSortPacks = (sortPack: string) => ({ type: "SET-SORT-PACKS", sortPack } as const);
export const setRangeCards = (min: number, max: number) => ({ type: "SET-RANGE-CARDS", min, max } as const);

//thunk
export const fetchPacksThunk =
  (page: number, pageCount: number, sortPack: string, searchValue?: string, min?: number, max?: number) =>
  (dispatch: Dispatch) => {
    dispatch(toggleIsFetching(true));
    packsAPI
      .getPacks(page, pageCount, sortPack, searchValue, min, max)
      .then((res) => {
        dispatch(toggleIsFetching(false));
        dispatch(setPacks(res.data.cardPacks));
        dispatch(setPage(page));
        dispatch(setCardPackTotalCount(res.data.cardPacksTotalCount));
      })
      .catch((error) => {
        console.log(error);
      });
  };

export const addNewPack = (title: string) => (dispatch: any, getState: any) => {
  dispatch(toggleIsFetching(true));
  packsAPI.addNewPack(title).then(() => {
    const { page, pageCount, sortPack } = getState();
    dispatch(fetchPacksThunk(page, pageCount, sortPack));
    dispatch(toggleIsFetching(false));
  });
};

export const deletePack = (id: string) => (dispatch: any, getState: any) => {
  dispatch(toggleIsFetching(true));
  packsAPI.deletePack(id).then(() => {
    const { page, pageCount, sortPack } = getState();
    dispatch(toggleIsFetching(false));
    dispatch(fetchPacksThunk(page, pageCount, sortPack));
  });
};

export const updatedPacksTitle = (id: string, title: string) => (dispatch: any, getState: any) => {
  dispatch(toggleIsFetching(true));
  packsAPI.updatedCardsPack(id, title).then(() => {
    const { page, pageCount, sortPack } = getState();
    dispatch(toggleIsFetching(false));
    dispatch(fetchPacksThunk(page, pageCount, sortPack));
  });
};

type ActionsType =
  | ReturnType<typeof setPacks>
  | ReturnType<typeof addPackTitle>
  | ReturnType<typeof setCardPackTotalCount>
  | ReturnType<typeof setPage>
  | ReturnType<typeof setPageCount>
  | ReturnType<typeof setFilterPackName>
  | ReturnType<typeof setSortPacks>
  | ReturnType<typeof setRangeCards>;

export type fetchPacksThunkType = typeof fetchPacksThunk;
