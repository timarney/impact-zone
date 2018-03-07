import React, { Component } from "react";
import { connect } from "react-redux";
import { Manager, Target, Popper } from "react-popper";
import classNames from "classnames";
import Aux from "react-aux";
import { Tooltip, OptionMenu, CheckIn, SelectedOptions, SettingsToggle } from "./nav/index";

class ListItem extends Component {
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
            {/* Check in / out icon */}
            <CheckIn item={item} locationId={locationId} date={date} />
            <div className="name">
              <span>{firstLast[0]}</span> <span>{firstLast[1]}</span>
            </div>

            {onClick !== false && <Target>
              {/* Gear Icon to toggle settings menu */}
              <SettingsToggle item={item} onClick={onClick} />
            </Target>
            }


          </div>

          <SelectedOptions item={item} />
        </div>

        {/* options menu */}
        {item.id === active && (
          <Aux>
            <Popper placement={placement}>
              {({ popperProps = false }) => (
                <Tooltip popperProps={popperProps}>
                  <OptionMenu item={item} />
                </Tooltip>
              )}
            </Popper>
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

export default connect(mapStateToProps)(ListItem);
