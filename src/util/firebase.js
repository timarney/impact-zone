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

/*
// this will handle password reset

var auth = firebase.auth();
var emailAddress = "user@example.com";

auth.sendPasswordResetEmail(emailAddress).then(function() {
  // Email sent.
}).catch(function(error) {
  // An error happened.
});
*/

export function removeRef(id) {
  if (window.confirm("Do you really want to remove?")) {
    console.log("remove", id);

    const itemRef = firebase.database().ref(id);
    itemRef.remove(r => {
      console.log(r);
    });
  }
}
