import firebase from "../config-firebase.js";

export async function watchRef(id, cb) {
  if (!id) {
    console.warn("no location passed");
    return;
  }

  const ref = firebase.database().ref(id);

  ref.on(
    "value",
    snapshot => {
      let items = snapshot.val();
      if (!items) {
        cb(new Error("failed to load items"), {});
        return;
      }

      cb(null, items);
    },
    e => {
      if (e.code === "PERMISSION_DENIED") {
        ref.off();
        return;
      }
      console.log(e.message);
    }
  );
}

export function login(cb, user) {
  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.pass)
    .then(response => {
      cb(null);
    })
    .catch(function (error) {
      cb(error);
    });
}

export function signout(cb) {
  firebase
    .auth()
    .signOut()
    .then(function () {
      cb();
    })
    .catch(function (error) {
      console.log("signout err", error);
      cb(error);
    });
}

export function resetPassword(email, cb) {
  const auth = firebase.auth();

  auth
    .sendPasswordResetEmail(email)
    .then(function () {
      cb("email sent");
    })
    .catch(function (error) {
      cb(error);
    });
}

export function removeRef(id) {
  if (window.confirm("Do you really want to remove?")) {
    console.log("remove", id);

    const itemRef = firebase.database().ref(id);
    itemRef.remove(r => {
      console.log(r);
    });
  }
}

export const updatePersonProp = function (locationId, date, id, prop, val) {
  if (!prop) {
    console.error("No prop passed to update", prop);
    return;
  }
  try {
    const ref = firebase.database().ref(`${locationId}/${date}`);
    let idRef = ref.child("people").child(id);
    idRef.child(prop).set(val);
  } catch (e) {
    console.log(e.message);
    console.log(locationId, date, id, prop, val);
  }
};

export const getPersonData = async function (locationId, date, id, prop, val) {
  if (!prop) {
    console.error("No prop passed to update", prop);
    return;
  }
  try {
    const path = `${locationId}/${date}/people/${id}`;
    const ref = await firebase.database().ref(path).once('value');
    return ref.val();
  } catch (e) {
    console.log(e.message);
    console.log(locationId, date, id, prop, val);
  }
}

export function checkIn(locationId, date, id, val) {
  updatePersonProp(locationId, date, id, "in", val);
}

export function checkInVolunteer() {
  alert("coming soon");
}
