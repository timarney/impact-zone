import React, { Component } from "react";
import { LateIcon, EarlyIcon, WalkIcon, LockIcon } from "../../icons";

class OptionMenu extends Component {
  state = {};

  setProperty = e => {
    e.preventDefault();
    alert("hello class");
  };

  render() {
    return (
      <div className="menu">
        <div>
          <a href="#late" onClick={this.setProperty}>
            Arrived Late <LateIcon />
          </a>
        </div>
        <div>
          <a href="#leftearly" onClick={this.setProperty}>
            Left Early <EarlyIcon />
          </a>
        </div>
        <div>
          <a href="#walkedhome" onClick={this.setProperty}>
            Walked Home <WalkIcon />
          </a>
        </div>
        <div>
          <a href="#signout" onClick={this.setProperty}>
            Signature <LockIcon />
          </a>
        </div>
      </div>
    );
  }
}

export default OptionMenu;
