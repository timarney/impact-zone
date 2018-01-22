import React, { Component } from "react";
import { LateIcon, EarlyIcon, WalkIcon, LockIcon } from "../../icons";

class StatusIcons extends Component {
  state = {};
  render() {
    const { item } = this.props;
    console.log(item);
    return (
      <div className="status-icons">
        <hr />
        <div className="icons">
          {item.late && <LateIcon />} {item.leftearly && <EarlyIcon />}{" "}
          {item.walked && <WalkIcon />} {item.require_signature && <LockIcon />}
        </div>
      </div>
    );
  }
}

export default StatusIcons;
