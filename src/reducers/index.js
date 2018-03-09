import { combineReducers } from "redux";

const authReducer = (state = { isAuthenticated: false }, action) => {
  switch (action.type) {
    case "AUTH":
      return { ...state, isAuthenticated: action.payload };
    default:
      return state;
  }
};

const statDetailsReducer = (state = { isOpen: false }, action) => {

  switch (action.type) {
    case "OPENED_STATS_DETAILS":
      return { ...state, isOpen: true };
    case "CLOSED_STATS_DETAILS":
      return { ...state, isOpen: false };
    default:
      return state;

  }

}

const setDisabled = id => {
  if (id) {
    return true;
  }

  return false;
};

const attendanceReducer = (
  state = { loading: true, attendance: [], activeItem: false, item: null },
  action
) => {
  switch (action.type) {
    case "AUTH":
      return { ...state, loading: false };
    case "ACTIVE_ITEM":

      const id = action.payload && action.payload.id ? action.payload.id : false;
      //const item = action.payload && action.payload.item ? action.payload.item : null;
      let item = null;

      if (id) {
        item = state.attendance.people[id];
      }

      return {
        ...state,
        activeItem: id,
        disabled: setDisabled(id),
        item: item
      };
    case "ATTENDANCE":
      return { ...state, attendance: action.payload };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  auth: authReducer,
  main: attendanceReducer,
  statDetails: statDetailsReducer
});
