import React, { Component } from "react";
import {
  LateIcon,
  EarlyIcon,
  WalkIcon,
  LockIcon,
  UnlockIcon
} from "../../../icons";
import { updatePersonProp } from "../../../util/firebase";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

class SelectedOptions extends Component {
  state = {};

  setProperty = e => {
    e.preventDefault();
    const { locationId, date, item, dispatch } = this.props;
    const prop = e.currentTarget.dataset.prop;

    let val = true;

    if (typeof item[prop] !== "undefined") {
      let currentVal = Boolean(item[prop]);
      val = !currentVal; //toggle the current value
    }

    updatePersonProp(locationId, date, item.id, prop, val);
    dispatch({ type: "ACTIVE_ITEM", payload: false });
  };

  render() {
    const { locationId, date, item, disabled } = this.props;
    return (
      <div className="status-icons" disabled={disabled}>
        <hr />
        <div className="icons">
          {item.late && (
            <a href="#late" data-prop="late" onClick={this.setProperty}>
              <LateIcon />
            </a>
          )}
          {item.leftearly && (
            <a
              href="#leftearly"
              data-prop="leftearly"
              onClick={this.setProperty}
            >
              <EarlyIcon />
            </a>
          )}
          {item.walked && (
            <a href="#walked" data-prop="walked" onClick={this.setProperty}>
              <WalkIcon />
            </a>
          )}
          {item.require_signature && (
            <Link
              to={`/signature/${locationId}/${date}/${item.id}`}
              onClick={() => {
                const { dispatch } = this.props;
                dispatch({ type: "ACTIVE_ITEM", payload: { id: item.id } });
              }}
            >
              {item.signature ? <UnlockIcon /> : <LockIcon />}
            </Link>
          )}
        </div>
      </div >
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    locationId: ownProps.match.params.id,
    date: ownProps.match.params.date,
    disabled: state.main.disabled
  };
};

export default withRouter(connect(mapStateToProps)(SelectedOptions));
