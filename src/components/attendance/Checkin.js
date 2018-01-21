import React, { Component } from "react";
import CheckIcon from "../../icons/Check";
import { checkIn } from "../../util/firebase";
import { connect } from "react-redux";
import classNames from "classnames";

class CheckIn extends Component {
  state = {};
  render() {
    const { item, locationId, date, disabled } = this.props;
    const checkedClass = classNames({
      check: true,
      checked: item.in
    });

    console.log(disabled);
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
                checkIn(locationId, date, item.id, !item.in);
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
