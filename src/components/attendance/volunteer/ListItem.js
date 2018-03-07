import React, { Component } from "react";
import { connect } from "react-redux";
import classNames from "classnames";
import CheckIn from "./CheckIn";

class ListItem extends Component {
  state = {};
  render() {
    const { item, locationId, date, active, disabled, activeItems } = this.props;
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
      <div disabled={disableItem} className={boxClass}>
        <div className="attendance-person">
          <CheckIn activeItems={activeItems} item={item} locationId={locationId} date={date} />
          <div className="name">
            <span>{firstLast[0]}</span> <span>{firstLast[1]}</span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    disabled: state.main.disabled
  };
};

export default connect(mapStateToProps)(ListItem);
