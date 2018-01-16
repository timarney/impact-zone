import firebase from "../config-firebase.js";

export const Auth = {
  isAuthenticated: false,
  authenticate(cb, user) {
    const self = this;
    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.pass)
      .then(response => {
        console.log("lets go", response);
        console.log(cb);
        self.isAuthenticated = true;
        cb(null);
      })
      .catch(function(error) {
        self.isAuthenticated = false;
        cb(error);
      });
  },
  signout(cb) {
    this.isAuthenticated = false;
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
};
