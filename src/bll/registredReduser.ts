import { Dispatch } from "redux";
import { API } from "../api/api";
import { toggleIsFetching } from "./loginReducer";

const initState = {
  isRegistered: false,
  error: null as null | string,
  isFetching: false,
};

export const registredReducer = (state: initialStateType = initState, action: ActionsType): typeof initState => {
  switch (action.type) {
    case "SET-ERROR":
      return {
        ...state,
        error: action.error,
      };
    case "SET-IS-REGISTERED":
      return {
        ...state,
        isRegistered: action.isRegistered,
      };

    default:
      return state;
  }
};

//actions
export const setError = (error: string | null) => ({ type: "SET-ERROR", error } as const);
export const setIsRegistered = (isRegistered: boolean) =>
  ({
    type: "SET-IS-REGISTERED",
    isRegistered,
  } as const);

//thunk

export const checkInThunk = (email: string, password: string) => (dispatch: Dispatch) => {
  dispatch(toggleIsFetching(true));
  API.checkIn(email, password)
    .then((res) => {
      dispatch(toggleIsFetching(false));
      dispatch(setIsRegistered(true));
    })
    .catch((err) => {
      dispatch(toggleIsFetching(false));
      const error = err.response ? err.response.data.error : err.message + "some error";
      dispatch(setError(error));
    });
};

//types
type ActionsType =
  | ReturnType<typeof setError>
  | ReturnType<typeof toggleIsFetching>
  | ReturnType<typeof setIsRegistered>;

type initialStateType = typeof initState;
