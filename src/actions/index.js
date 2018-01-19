import firebase from "../config-firebase.js";

export function monitorAuth() {
  return dispatch => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        dispatch({ type: "AUTH", payload: true });
      } else {
        dispatch({ type: "AUTH", payload: false });
      }
    });
  };
}

export function attendanceList(locationId, date) {
  return (dispatch, getState) => {
    const ref = firebase.database().ref(locationId + "/" + date);

    ref.on("value", snapshot => {
      dispatch({ type: "ATTENDANCE", payload: snapshot.val() });
    });
  };
}
