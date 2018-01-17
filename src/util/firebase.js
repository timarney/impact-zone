import firebase from "../config-firebase.js";

export async function watchRef(id, cb) {
  if (!id) {
    console.warn("no location passed");
    return;
  }

  let user = await isLoggedIn();

  if (!user) return;

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

export async function isLoggedIn() {
  return new Promise(resolve => {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

export function login(cb, user) {
  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.pass)
    .then(response => {
      cb(null);
    })
    .catch(function(error) {
      cb(error);
    });
}

export function signout(cb) {
  firebase
    .auth()
    .signOut()
    .then(function() {
      cb();
    })
    .catch(function(error) {
      console.log("signout err", error);
      cb(error);
    });
}

// this will handle password reset

export function resetPassword(email, cb) {
  const auth = firebase.auth();

  auth
    .sendPasswordResetEmail(email)
    .then(function() {
      cb("email sent");
    })
    .catch(function(error) {
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
