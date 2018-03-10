import React, { Component } from "react";
import { connect } from "react-redux";
import Animated from "animated/lib/targets/react-dom";
import sortbyorder from "lodash.sortbyorder";
import { tempItems } from "../../../util/skelton";
import classNames from "classnames";
import { detailsBoxTransition, detailsBoxProps } from "../../../transition";
import ListItem from "./ListItem";
import Details from "./Details";

class List extends Component {
  refs = {};
  state = {
    animation: detailsBoxProps,
    activeItem: false,
    activeDetails: false
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
        id: items[item].id,
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
    const { dispatch } = this.props;
    let y = this.el.getBoundingClientRect();
    let x = e.getBoundingClientRect();

    detailsBoxTransition(x, y, animation, "up");

    this.setState({ activeItem: item }, () => {
      dispatch({ type: "OPENED_STATS_DETAILS", payload: true })
    });
  };

  closeDetails = () => {
    let { animation } = this.state;
    const { dispatch } = this.props;
    let x = animation.activeBox;

    if (!x) return;

    detailsBoxTransition(null, x, animation, null, () => {
      animation.y.setValue(-500);
      dispatch({ type: "CLOSED_STATS_DETAILS", payload: true });
    });
  };

  render() {
    const { attendance } = this.props;
    const { animation, activeItem } = this.state;
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
          {activeItem && <Details items={attendance} item={activeItem} />}
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

const mapStateToProps = (state, ownProps) => {
  return {
  };
};

export default connect(mapStateToProps)(List);
