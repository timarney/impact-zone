import React, { Component } from "react";
import classNames from "classnames";
import { SignOut } from "./auth";

class Header extends Component {
  state = {
    options: [
      { name: "Select Location", value: 0 },
      { name: "Pineview 2017", value: 25 },
      { name: "Prince of Wales 2017", value: 26 },
      { name: " Commonwelath 2017", value: 27 },
      { name: "Emerge 2017", value: 28 },
      { name: "Centennial 67 2017", value: 29 }
    ],
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
    const { locationId, initUpdateLocation, stats } = this.props;
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

        {stats && locationId ? (
          <button
            className="btn"
            style={{ display: "inline-block", marginLeft: 15 }}
            onClick={stats}
          >
            Stats
          </button>
        ) : null}

        <hr />
      </div>
    );
  }
}

export default Header;
