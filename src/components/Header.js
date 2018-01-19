import React, { Component } from "react";
import classNames from "classnames";
import { SignOut } from "./auth";
import { locations } from "../api/locations";

class Header extends Component {
  state = {
    options: locations,
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
    const { locationId, initUpdateLocation, navLink, navText } = this.props;
    const { disabled } = this.state;

    //const disabled = false;
    const headerClass = classNames({
      disabled: disabled === true
    });

    const selectClass = classNames({
      schools: true,
      disabled: disabled === true
    });

    const createItem = (item, key) => (
      <option key={key} value={item.value} disabled={disabled}>
        {item.name}
      </option>
    );

    return (
      <div className="header">
        <div className="title">
          <h1 className={headerClass}>Impact Zone</h1> <SignOut />
        </div>
        <select
          className={selectClass}
          onChange={event => {
            initUpdateLocation(Number(event.target.value));
          }}
          value={locationId}
        >
          {this.state.options.map(createItem)}
        </select>

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
