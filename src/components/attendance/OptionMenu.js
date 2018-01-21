import React, { Component } from "react";

import ClockIcon from "../../icons/Clock";
import WalkIcon from "../../icons/Walk";

class OptionMenu extends Component {
  state = {};
  render() {
    return (
      <div className="menu">
        <div>
          <a href="#late">Arrived Late</a>
          <ClockIcon />
        </div>
        <div>
          <a href="#leftearly">Left Early</a>
          <ClockIcon />
        </div>
        <div>
          <a href="#walkedhome">Walked Home</a>
          <WalkIcon />
        </div>
        <div>
          <a href="#signout">Signature</a>
        </div>
      </div>
    );
  }
}

export default OptionMenu;
