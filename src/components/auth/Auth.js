import { login, signout } from "../../util/firebase";

export const Auth = {
  authenticate(cb, user) {
    login(cb, user);
  },
  signout(cb) {
    signout(cb);
  }
};
