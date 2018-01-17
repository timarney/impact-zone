import { isLoggedIn, login, signout } from "../../util/firebase";

export const Auth = {
  async checkAuth() {
    let user = await isLoggedIn();
    return user;
  },
  authenticate(cb, user) {
    login(cb, user);
  },
  signout(cb) {
    signout(cb);
  }
};
