import React, { Component } from "react";
import GearIcon from "../../icons/Gear";
import classNames from "classnames";

class Settings extends Component {
  state = {};
  render() {
    const { item, onClick } = this.props;
    const checkedClass = classNames({
      gear: true
    });
    return (
      <a
        href="#checkin"
        className={checkedClass}
        onClick={e => {
          e.preventDefault();
          onClick(item.id);
        }}
      >
        <GearIcon />
      </a>
    );
  }
}

export default Settings;
