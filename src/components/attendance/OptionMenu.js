import React, { Component } from "react";
import { LateIcon, EarlyIcon, WalkIcon, LockIcon } from "../../icons";
import { updatePersonProp } from "../../util/firebase";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

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
    return (
      <div className="menu">
        <div>
          <a href="#late" data-menu="true" data-prop="late" onClick={this.setProperty}>
            Arrived Late <LateIcon />
          </a>
        </div>
        <div>
          <a href="#leftearly" data-prop="leftearly" onClick={this.setProperty}>
            Left Early <EarlyIcon />
          </a>
        </div>
        <div>
          <a href="#walkedhome" data-prop="walked" onClick={this.setProperty}>
            Walked Home <WalkIcon />
          </a>
        </div>
        <div>
          <a
            href="#signout"
            onClick={() => {
              alert("not connected yet");
            }}
          >
            Signature <LockIcon />
          </a>
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
