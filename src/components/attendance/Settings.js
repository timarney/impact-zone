import React, { Component } from "react";
import GearIcon from "../../icons/Gear";
import classNames from "classnames";

class Settings extends Component {
  state = {};
  render() {
    const { item } = this.props;
    const checkedClass = classNames({
      gear: true
    });
    return (
      <a
        href="#checkin"
        className={checkedClass}
        onClick={e => {
          e.preventDefault();
          console.log("gear", item);
        }}
      >
        <GearIcon />
      </a>
    );
  }
}

export default Settings;
