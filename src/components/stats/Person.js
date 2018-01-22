import React, { Component } from "react";

class Person extends Component {
  state = {};
  render() {
    let { person, percent, openDetails } = this.props;
    const firstLast = person.name.split(" ");

    return (
      <div
        className="person"
        onClick={() => {
          openDetails(this.el, this.person);
        }}
        ref={el => {
          this.el = el;
          this.person = person;
        }}
      >
        <div className="title">
          <div className="name">
            <span>{firstLast[0]}</span> <span>{firstLast[1]}</span>
          </div>
          <div className="count">
            <span>
              {person.streak()} <span>{person.total}</span>
            </span>
            <div className="percent">{percent}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Person;
