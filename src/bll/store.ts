import { applyMiddleware, createStore } from "redux";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { registredReducer } from "./registredReduser";
import { forgotReducer } from "./forgotReduser";
import { authReducer } from "./authReducer";
import { loginReducer } from "./loginReducer";
import { packsReducer } from "./packsReduser";
import { cardsReducer } from "./cardsReducer";

const reducers = combineReducers({
  register: registredReducer,
  forgot: forgotReducer,
  auth: authReducer,
  login: loginReducer,
  packs: packsReducer,
  cards: cardsReducer,

});

const store = createStore(reducers, applyMiddleware(thunk));

export default store;

export type AppStoreType = ReturnType<typeof reducers>;
