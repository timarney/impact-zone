import React from "react";
import { Arrow } from "react-popper";

export class Tooltip extends React.Component {
  render() {
    const { children, popperProps } = this.props;
    const child = React.Children.only(children);
    return (
      <div {...popperProps} className="popper">
        {child}
        <Arrow className="popper__arrow" />
      </div>
    );
  }
}

export default Tooltip;
