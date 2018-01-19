import { locations } from "../api/locations";
import classNames from "classnames";

import React, { Component } from "react";

export class LocationDropDown extends Component {
  state = {
    options: locations
  };
  render() {
    const { disabled, onChange, locationId } = this.props;

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
      <select
        className={selectClass}
        onChange={event => {
          onChange(Number(event.target.value));
        }}
        value={locationId}
      >
        {this.state.options.map(createItem)}
      </select>
    );
  }
}
