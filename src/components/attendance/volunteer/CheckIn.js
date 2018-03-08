import React, { Component } from "react";
import CheckIcon from "../../../icons/Check";
import { checkInVolunteer } from "../../../util/firebase";
import { connect } from "react-redux";
import classNames from "classnames";


function updateArr(vals, val, active) {
  console.log("updateArr", vals);
  if (!vals) {
    vals = [];
  }
  val = String(val);
  if (!active) {
    var index = vals.indexOf(val);
    if (index > -1) {
      vals.splice(index, 1);
    }
  } else {
    vals.push(val);
  }

  //remove dups
  vals = [...new Set(vals)];

  if (vals.length) {
    return vals.join(",");
  }

  return "";
}

class CheckIn extends Component {
  state = {};
  render() {
    const { item, locationId, date, disabled, activeItems } = this.props;

    const checkedClass = classNames({
      check: true,
      checked: item.in
    });
    return (
      <a
        data-in={item.in}
        disabled={disabled}
        href="#checkin"
        className={checkedClass}
        onClick={
          disabled
            ? null
            : e => {
              e.preventDefault();
              const active = !item.in;
              const val = updateArr(activeItems, item.id, active);
              checkInVolunteer(locationId, date, item.id, val);
            }
        }
      >
        <CheckIcon />
      </a>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    disabled: state.main.disabled
  };
};

export default connect(mapStateToProps)(CheckIn);
