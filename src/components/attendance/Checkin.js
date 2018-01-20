import React, { Component } from "react";
import CheckIcon from "../../icons/Check";
import { checkIn } from "../../util/firebase";
import classNames from "classnames";

class CheckIn extends Component {
  state = {};
  render() {
    const { item, locationId, date } = this.props;
    const checkedClass = classNames({
      check: true,
      checked: item.in
    });
    return (
      <a
        href="#checkin"
        className={checkedClass}
        onClick={e => {
          e.preventDefault();
          checkIn(locationId, date, item.id, !item.in);
        }}
      >
        <CheckIcon className={checkedClass} />
      </a>
    );
  }
}

export default CheckIn;
