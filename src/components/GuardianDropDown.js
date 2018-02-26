import { locations } from "../api/locations";
import classNames from "classnames";

import React, { Component } from "react";

export class GuardianDropDown extends Component {
  state = {
    options: locations
  };

  render() {
    const { disabled, onChange, options, selected } = this.props;

    const selectClass = classNames({
      disabled: disabled === true
    });

    const createItem = (item, key) => {
      const id = item[0];
      const value = item[1];
      return <option key={id} value={id} disabled={disabled} data-val={item}>
        {value}
      </option>
    };
    return (
      <select
        className={selectClass}
        onChange={e => {
          var v = e.target.value;
          const val = Object.entries(options).filter((item) => {
            return item[0] === v;
          });

          if (val.length) {
            const obj = { payload: val[0][0], text: val[0][1] };
            onChange(obj);
          } else {
            onChange(false);
          }
        }}
        defaultValue={selected}
      >

        <option key="-" value="">Select One</option>
        {Object.entries(options).map(createItem)}
      </select>
    );
  }
}
