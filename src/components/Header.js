import React, { Component } from "react";
import classNames from "classnames";
import { SignOut } from "./auth";

class Header extends Component {
  state = {
    disabled: true
  };

  componentDidMount() {
    const { waitFor } = this.props;
    if (waitFor === undefined || waitFor) {
      this.setState({ disabled: false });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { waitFor } = nextProps;
    if (!waitFor && typeof waitFor !== "undefined") {
      this.setState({ disabled: true });
      return;
    }

    if (waitFor) {
      this.setState({ disabled: false });
    }
  }

  render() {
    const { disabled } = this.state;
    const headerClass = classNames({
      disabled: disabled === true
    });

    return (
      <div className="header">
        <div className="title">
          <h1 className={headerClass}>Impact Zone</h1> <SignOut />
        </div>
        {this.props.render({ disabled })}
        <hr />
      </div>
    );
  }
}

Header.defaultProps = {
  render: () => null,
  waitFor: undefined
};

export default Header;
