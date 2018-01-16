import firebase from "../config-firebase.js";

export function watchRef(id, cb) {
  if (!id) {
    console.warn("no location passed");
    return;
  }

  const ref = firebase.database().ref(id);

  ref.on(
    "value",
    snapshot => {
      let items = snapshot.val();

      //console.log("snapshot");

      if (!items) {
        console.log("no items");
        cb(new Error("failed to load items"), {});
        return;
      }

      cb(null, items);
    },
    e => {
      console.log(e);
    }
  );
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log(user.email);
  } else {
    console.log("No user is signed in.");
    // No user is signed in.
  }
});

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
