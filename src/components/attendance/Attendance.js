import React, { Component } from "react";
import Header from "../Header";

export class Attendance extends Component {
  state = {};
  render() {
    return (
      <div className="App">
        <Header
          attendance={true}
          location={0}
          initUpdateLocation={() => {}}
        />
        <div>Attendance</div>
      </div>
    );
  }
}
