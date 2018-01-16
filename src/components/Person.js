import React, { Component } from "react";

class Person extends Component {
  state = {};
  render() {
    let { person, percent, openDetails } = this.props;
    return (
      <div
        className="person"
        onClick={() => {
          openDetails(this.el);
        }}
        ref={el => {
          this.el = el;
        }}
      >
        <div className="title">
          <div className="name">{person.name}</div>
          <div className="count">
            {person.streak()} <div>{person.total}</div>
          </div>
        </div>
        <div className="stats">
          <div>
            <span className="percent">{percent}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Person;
