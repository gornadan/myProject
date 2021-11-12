import { API } from "../api/api";
import { authThunk } from "./authReducer";

const initState = {
  isLogined: false,
  error: null as null | string,
  isFetching: false,
};

export const loginReducer = (state: initialStateType = initState, action: LoginActionType): typeof initState => {
  switch (action.type) {
    case "SET-ERROR":
      return {
        ...state,
        error: action.error,
      };

    case "TOGGLE_IS_FETCHING":
      return {
        ...state,
        isFetching: action.isFetching,
      };
    case "IS-LOGINED":
      return {
        ...state,
        isLogined: action.isLogined,
      };
    default:
      return state;
  }
};

//actions
export const loginAC = (payload: LoginUserType) => ({ type: "LOGIN", payload } as const);
export const setError = (error: string | null) => ({ type: "SET-ERROR", error } as const);
export const toggleIsFetching = (isFetching: boolean) =>
  ({
    type: "TOGGLE_IS_FETCHING",
    isFetching,
  } as const);
export const isLoginedAC = (isLogined: boolean) =>
  ({
    type: "IS-LOGINED",
    isLogined,
  } as const);

//thunk
export const onClickLoginThunk = (email: string, password: string, checked: boolean) => (dispatch: any) => {
  dispatch(toggleIsFetching(true));
  API.createLogin({ email, password, rememberMe: false })
    .then((res) => {
      dispatch(authThunk()).then(() => {
        dispatch(isLoginedAC(true));
        dispatch(toggleIsFetching(false));
      });
      // dispatch(loginAC(<LoginUserType>{isLogined: true}));
      console.log(res);
    })
    .catch((err) => {
      dispatch(toggleIsFetching(false));
      const error = err.response ? err.response.data.error : err.message + "some error";
      dispatch(setError(error));
    });
};

//types
type LoginActionType =
  | ReturnType<typeof setError>
  | ReturnType<typeof toggleIsFetching>
  | ReturnType<typeof isLoginedAC>;

type initialStateType = typeof initState;

type LoginUserType = {
  email: string;
  password: string;
  checked: boolean;
  isLogined: boolean;
};
