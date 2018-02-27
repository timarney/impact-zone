import React, { Component } from "react";

class ListItem extends Component {
  state = {};
  render() {
    let { item, percent, openDetails } = this.props;
    const firstLast = item.name.split(" ");

    return (
      <div
        className="person"
        onClick={() => {
          openDetails(this.el, this.item);
        }}
        ref={el => {
          this.el = el;
          this.item = item;
        }}
      >
        <div className="title">
          <div className="name">
            <span>{firstLast[0]}</span> <span>{firstLast[1]}</span>
          </div>
          <div className="count">
            <span>
              {item.streak()} <span>{item.total}</span>
            </span>
            <div className="percent">{percent}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default ListItem;
