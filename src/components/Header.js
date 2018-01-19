import React, { Component } from "react";
import classNames from "classnames";
import { SignOut } from "./auth";

class Header extends Component {
  state = {
    disabled: true
  };

  componentDidMount() {
    const { attendance } = this.props;
    if (attendance) {
      this.setState({ disabled: false });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { attendance } = nextProps;
    if (attendance) {
      this.setState({ disabled: false });
    }
  }

  render() {
    const { locationId, onChange, navLink, navText } = this.props;
    const { disabled } = this.state;

    //const disabled = false;
    const headerClass = classNames({
      disabled: disabled === true
    });

    return (
      <div className="header">
        <div className="title">
          <h1 className={headerClass}>Impact Zone</h1> <SignOut />
        </div>

        {this.props.render({ locationId, disabled, onChange })}

        {navLink && locationId ? (
          <button
            className="btn nav-link"
            style={{
              display: "inline-block",
              marginLeft: 15
            }}
            onClick={navLink}
          >
            {navText}
          </button>
        ) : null}

        <hr />
      </div>
    );
  }
}

export default Header;
