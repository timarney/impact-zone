import { combineReducers } from "redux";

const authReducer = (state = { isAuthenticated: false }, action) => {
  switch (action.type) {
    case "AUTH":
      return { ...state, isAuthenticated: action.payload };
    default:
      return state;
  }
};

const mainReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case "AUTH":
      return { ...state, loading: false };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  auth: authReducer,
  main: mainReducer
});
