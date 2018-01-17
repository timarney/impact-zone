import Animated from "animated/lib/targets/react-dom";

export function detailsBoxTransition(x, y, state, dir, cb = () => {}) {
  let offset = window.pageYOffset;
  let opacity = 100;
  let speed = 200;
  state.activeBox = x;

  if (dir === "up") {
    //set values to match box that was clicked on
    state.x.setValue(x.left);
    state.y.setValue(x.top + offset);
    state.w.setValue(x.width);
    state.h.setValue(x.height);
  } else {
    opacity = 0;
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
    }),
    Animated.timing(state.o, {
      toValue: opacity,
      duration: speed
    })
  ]).start(cb);
}

export const detailsBoxProps = {
  x: new Animated.Value(0),
  y: new Animated.Value(0),
  w: new Animated.Value(0),
  h: new Animated.Value(0),
  o: new Animated.Value(0),
  activeBox: null
};
