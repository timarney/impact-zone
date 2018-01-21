import React, { Component } from "react";
import CheckIn from "./Checkin";
import Settings from "./Settings";
import { connect } from "react-redux";
import { Manager, Target, Popper } from "react-popper";
import { Tooltip } from "./Tooltip";
import classNames from "classnames";
import Aux from "react-aux";
import OptionMenu from "./OptionMenu";

class Box extends Component {
  state = {};
  render() {
    const { item, locationId, date, active, onClick, disabled } = this.props;
    const placement = "left";

    const isActiveItem = active === item.id;

    const boxClass = classNames({
      person: true,
      "attendance-person": true,
      active: isActiveItem
    });

    let disableItem = false;

    if (disabled && !isActiveItem) {
      disableItem = true;
    }

    return (
      <Manager key={item.id}>
        <div disabled={disableItem} className={boxClass}>
          <CheckIn item={item} locationId={locationId} date={date} />
          <div className="name">{item.name}</div>
          <Target>
            <Settings item={item} onClick={onClick} />
          </Target>
        </div>

        {item.id === active && (
          <Aux>
            <Popper placement={placement}>
              {({ popperProps = false }) => (
                <Tooltip popperProps={popperProps}>
                  <OptionMenu />
                </Tooltip>
              )}
            </Popper>

            {/*  <div className="__overlay"></div> */}
          </Aux>
        )}
      </Manager>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    disabled: state.main.disabled
  };
};

export default connect(mapStateToProps)(Box);
