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
import classNames from "classnames";

class OptionMenu extends Component {
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
    const { item, locationId, date, dispatch } = this.props;

    const lateClass = classNames({
      active: item.late
    });

    const earlyClass = classNames({
      active: item.leftearly
    });

    const walkedClass = classNames({
      active: item.walked
    });

    const signatureClass = classNames({
      active: item.signature
    });

    return (
      <div className="menu">
        <div>
          <a
            href="#late"
            className={lateClass}
            data-menu="true"
            data-prop="late"
            onClick={this.setProperty}
          >
            Arrived Late <LateIcon />
          </a>
        </div>
        <div>
          <a
            href="#leftearly"
            className={earlyClass}
            data-prop="leftearly"
            onClick={this.setProperty}
          >
            Left Early <EarlyIcon />
          </a>
        </div>
        <div>
          <a
            href="#walkedhome"
            className={walkedClass}
            data-prop="walked"
            onClick={this.setProperty}
          >
            Walked Home <WalkIcon />
          </a>
        </div>
        <div>
          <Link
            to={`/signature/${locationId}/${date}/${item.id}`}
            className={signatureClass}
            data-menu="true"
            onClick={() => {
              dispatch({ type: "ACTIVE_ITEM", payload: { id: item.id } });
            }}
          >
            Signature {item.signature ? <UnlockIcon /> : <LockIcon />}
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    locationId: ownProps.match.params.id,
    date: ownProps.match.params.date
  };
};

export default withRouter(connect(mapStateToProps)(OptionMenu));
