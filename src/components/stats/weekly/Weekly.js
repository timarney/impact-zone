import React, { Component } from "react";
import { DateTime } from "luxon";
import { removeRef } from "../../../util/firebase";
import classNames from "classnames";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

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
    const { locationId } = this.props;
    const id = e.target.id;
    removeRef(`${locationId}/${id}`);
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
        <div className="week-items">
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
    const { items, attendance, locationId } = this.props;
    const { title } = this.state;
    const headerClass = classNames({
      disabled: attendance === false
    });

    if (!items || items.length < 1) return this.renderOutline();

    for (let date in items) {
      let f = DateTime.fromISO(date).toFormat("ccc dd LLL yyyy");
      let p = attendance.dates[date];
      p = p ? p : 0;

      d.push(
        <div className="week" key={date}>
          <div>
            <Link to={`/attendance/${locationId}/${date}`}>{f}</Link>
          </div>
          <div>{`${p}%`}</div>
          { /*<a href={`remove/${date}`} id={date} onClick={this.deleteItem}>
            delete
      </a> */}
        </div>
      );
    }

    d = d.reverse();

    return (
      <div className="weeks">
        <h2 className={headerClass}>{title}</h2>
        <div className="week-items">{d}</div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    locationId: ownProps.match.params.id
  };
};

export default withRouter(connect(mapStateToProps)(Weekly));
