import { combineReducers } from "redux";

const authReducer = (state = { isAuthenticated: false }, action) => {
  switch (action.type) {
    case "AUTH":
      return { ...state, isAuthenticated: action.payload };
    default:
      return state;
  }
};

const setDisabled = id => {
  if (id) {
    return true;
  }

  return false;
};

const attendanceReducer = (
  state = { loading: true, attendance: [], activeItem: false },
  action
) => {
  switch (action.type) {
    case "AUTH":
      return { ...state, loading: false };
    case "ACTIVE_ITEM":
      return {
        ...state,
        activeItem: action.payload,
        disabled: setDisabled(action.payload)
      };
    case "ATTENDANCE":
      return { ...state, attendance: action.payload };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  auth: authReducer,
  main: attendanceReducer
});
