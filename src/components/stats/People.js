import React, { Component } from "react";
import Animated from "animated/lib/targets/react-dom";
import sortbyorder from "lodash.sortbyorder";
import { tempPeople } from "../../util/skelton";
import Person from "./Person";
import classNames from "classnames";
import { detailsBoxTransition, detailsBoxProps } from "../../transition";

class People extends Component {
  refs = {};
  state = {
    animation: detailsBoxProps
  };
  order() {
    const { attendance } = this.props;

    let d = [];
    let people = attendance.people;

    for (let item in people) {
      let total = people[item].present + people[item].absent;

      if (people[item].percent === 0) continue;

      let streak;
      if (typeof people[item].streak.present !== "undefined") {
        streak = () => (
          <div className="present">{`+${people[item].streak.present}`}</div>
        );
      } else if (typeof people[item].streak.absent !== "undefined") {
        streak = () => (
          <div className="absent">{`-${people[item].streak.absent}`}</div>
        );
      }

      d.push({
        name: item,
        total: `${people[item].present}/${total}`,
        percent: people[item].percent,
        streak
      });
    }

    return sortbyorder(d, ["percent", "name"], ["desc", "asc"]);
  }

  renderPerson(person, index) {
    let key = person.name ? person.name : index;
    let percent = person.percent ? `${person.percent} %` : null;
    return (
      <Person
        key={key}
        person={person}
        percent={percent}
        openDetails={this.openDetails}
      />
    );
  }

  openDetails = e => {
    let { animation } = this.state;
    let y = this.el.getBoundingClientRect();
    let x = e.getBoundingClientRect();
    detailsBoxTransition(x, y, animation, "up");
  };

  closeDetails = () => {
    let { animation } = this.state;
    let x = animation.activeBox;
    detailsBoxTransition(null, x, animation);
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
      transform: [
        {
          translateX: animation.x
        },
        {
          translateY: animation.y
        }
      ]
    };

    let people = this.order();
    let title = `Attendees`;

    if (!attendance) {
      people = tempPeople();
    } else {
      title = `${people.length} ${title}`;
    }

    return (
      <div>
        <h2 className={headerClass}> {title}</h2>
        <Animated.div
          className="detailsBox"
          style={animatedStyle}
          onClick={this.closeDetails}
        />
        <div
          className="people-list"
          ref={el => {
            this.el = el;
          }}
        >
          {people.map((item, index) => {
            return this.renderPerson(item, index);
          })}
        </div>
      </div>
    );
  }
}

export default People;
