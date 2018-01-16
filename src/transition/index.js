import Animated from "animated/lib/targets/react-dom";

export function detailsBoxTransition(x, y, state, dir, cb = () => {}) {
  let offset = window.pageYOffset;
  let speed = 200;
  state.activeBox = x;

  if (dir === "up") {
    state.x.setValue(x.left);
    state.y.setValue(x.top + offset);
    state.w.setValue(x.width);
    state.h.setValue(x.height);
  }

  Animated.parallel([
    Animated.timing(state.x, {
      toValue: y.left,
      duration: speed
    }),
    Animated.timing(state.y, {
      toValue: y.top + offset,
      duration: speed
    }),
    Animated.timing(state.w, {
      toValue: y.width,
      duration: speed
    }),
    Animated.timing(state.h, {
      toValue: y.height,
      duration: speed
    })
  ]).start(cb);
}

export const detailsBoxProps = {
  x: new Animated.Value(0),
  y: new Animated.Value(0),
  w: new Animated.Value(0),
  h: new Animated.Value(0),
  activeBox: null
};
