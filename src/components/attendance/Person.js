import React, { Component } from "react";
import CheckIn from "./Checkin";
import Settings from "./Settings";
import { connect } from "react-redux";
import { Manager, Target, Popper } from "react-popper";
import { Tooltip } from "./Tooltip";
import classNames from "classnames";
import Aux from "react-aux";
import OptionMenu from "./OptionMenu";
import StatusIcons from "./StatusIcons";

class Person extends Component {
  state = {};
  render() {
    const { item, locationId, date, active, onClick, disabled } = this.props;
    const placement = "left";
    const firstLast = item.name.split(" ");
    const isActiveItem = active === item.id;

    const boxClass = classNames({
      person: true,

      active: isActiveItem
    });

    let disableItem = false;

    if (disabled && !isActiveItem) {
      disableItem = true;
    }

    return (
      <Manager key={item.id}>
        <div disabled={disableItem} className={boxClass}>
          <div className="attendance-person">
            <CheckIn item={item} locationId={locationId} date={date} />
            <div className="name">
              <span>{firstLast[0]}</span> <span>{firstLast[1]}</span>
            </div>
            <Target>
              <Settings item={item} onClick={onClick} />
            </Target>
          </div>

          <StatusIcons item={item} />
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

export default connect(mapStateToProps)(Person);
