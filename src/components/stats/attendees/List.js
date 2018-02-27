import React, { Component } from "react";
import Animated from "animated/lib/targets/react-dom";
import sortbyorder from "lodash.sortbyorder";
import { tempItems } from "../../../util/skelton";
import ListItem from "./ListItem";
import classNames from "classnames";
import { DateTime } from "luxon";
import { detailsBoxTransition, detailsBoxProps } from "../../../transition";

class List extends Component {
  refs = {};
  state = {
    animation: detailsBoxProps,
    activeItem: null
  };

  componentDidMount() {
    // window.addEventListener("resize", () => {});
  }

  componentWillUnmount() {
    // window.removeEventListener("resize", this.closeDetails());
  }

  order() {
    const { attendance } = this.props;

    let d = [];
    let items = attendance.people;

    for (let item in items) {
      let total = items[item].present + items[item].absent;

      //if (items[item].percent === 0) continue;

      let streak;
      if (typeof items[item].streak.present !== "undefined") {
        streak = () => (
          <span className="present">{`+${items[item].streak.present}`}</span>
        );
      } else if (typeof items[item].streak.absent !== "undefined") {
        streak = () => (
          <span className="absent">{`-${items[item].streak.absent}`}</span>
        );
      }

      d.push({
        name: item,
        total: `${items[item].present}/${total}`,
        percent: items[item].percent,
        streak
      });
    }

    return sortbyorder(d, ["percent", "name"], ["desc", "asc"]);
  }

  renderItem(item, index) {
    let key = item.name ? item.name : index;
    let percent = item.percent ? `${item.percent} %` : null;
    return (
      <ListItem
        key={key}
        item={item}
        percent={percent}
        openDetails={this.openDetails}
      />
    );
  }

  openDetails = (e, item) => {
    let { animation } = this.state;
    let y = this.el.getBoundingClientRect();
    let x = e.getBoundingClientRect();

    detailsBoxTransition(x, y, animation, "up");

    this.setState({ activeItem: item });
  };

  closeDetails = () => {
    let { animation } = this.state;
    let x = animation.activeBox;

    if (!x) return;

    detailsBoxTransition(null, x, animation, null, () => {
      animation.y.setValue(-500);
    });
  };

  itemDetails = () => {
    const { items } = this.props;
    const item = this.state.activeItem;
    if (!item) return null;

    let d = [];

    for (let key in items) {
      let f = DateTime.fromISO(key).toFormat("ccc dd LLL yyyy");
      let obj = items[key].people;
      let attend = (
        <span style={{ color: "rgb(254, 115, 123)", marginRight: "15px" }}>
          ✘
        </span>
      );

      // eslint-disable-next-line
      for (let [k, v] of Object.entries(obj)) {
        if (v.name === item.name) {
          if (v.in) {
            attend = (
              <span
                style={{ color: "rgb(102, 194, 121)", marginRight: "15px" }}
              >
                ✔
              </span>
            );
          }
        }
      }

      d.push(
        <div className="week" key={key}>
          <div>
            {attend} {f}
          </div>
        </div>
      );
    }

    return (
      <div>
        <div>
          <div className="close-details" />
          <div className="details-header">
            <h2>{item.name}</h2>
            <button className="btn" onClick={this.closeDetails}>
              CLOSE
            </button>
          </div>

          <div className="details-inner">
            <div className="weeks">
              {d.reverse()}
            </div>
            <div className="details">
              Person Details
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { attendance } = this.props;
    const { animation } = this.state;
    const headerClass = classNames({
      disabled: attendance === false
    });

    const animatedStyle = {
      width: animation.w,
      height: animation.h,
      opacity: animation.o,
      transform: [
        {
          translateX: animation.x
        },
        {
          translateY: animation.y
        }
      ]
    };

    let items = this.order();
    let title = `Attendees`;

    if (!attendance) {
      items = tempItems();
    } else {
      title = `${items.length} ${title}`;
    }

    return (
      <div>
        <h2 className={headerClass}> {title}</h2>
        <Animated.div
          className="detailsBox"
          style={animatedStyle}
          onClick={this.closeDetails}
        >
          <div className="inner">{this.itemDetails()}</div>
        </Animated.div>

        <div
          className="people-list"
          ref={el => {
            this.el = el;
          }}
        >
          {items.map((item, index) => {
            return this.renderItem(item, index);
          })}
        </div>
      </div>
    );
  }
}

export default List;
