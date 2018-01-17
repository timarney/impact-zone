import React, { Component } from "react";
import { DateTime } from "luxon";
import { removeRef } from "../../util/firebase";
import classNames from "classnames";

class Weekly extends Component {
  state = {
    title: "Weekly",
    outlineItems: [...Array.from(new Array(5), () => "")]
  };

  componentWillReceiveProps() {
    this.timer = window.setInterval(this.loop, this.speed);
  }

  deleteItem = e => {
    e.preventDefault();
    const { location } = this.props;
    const id = e.target.id;
    removeRef(`${location}/${id}`);
  };

  renderOutline() {
    const { attendance } = this.props;
    const { title, outlineItems, dots } = this.state;
    const headerClass = classNames({
      disabled: attendance === false
    });

    return (
      <div className="weeks">
        <h2 className={headerClass}>{title}</h2>
        <div>
          {outlineItems.map((item, index) => {
            return (
              <div className="loader" key={index}>
                {item}
                {dots}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  render() {
    let d = [];
    const { items, attendance } = this.props;
    const { title } = this.state;
    const headerClass = classNames({
      disabled: attendance === false
    });

    if (!items || items.length < 1) return this.renderOutline();

    for (let item in items) {
      let f = DateTime.fromISO(item).toFormat("ccc dd LLL yyyy");
      let p = attendance.dates[item];
      p = p ? p : 0;

      d.push(
        <div className="week" key={item}>
          <div>{f}</div>
          <div>{`${p}%`}</div>
          {/*  <a href={`remove/${item}`} id={item} onClick={this.deleteItem}>
            delete
      </a> */}
        </div>
      );
    }

    return (
      <div className="weeks">
        <h2 className={headerClass}>{title}</h2>
        <div>{d}</div>
      </div>
    );
  }
}

export default Weekly;
