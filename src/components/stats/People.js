import React, { Component } from "react";
import Animated from "animated/lib/targets/react-dom";
import sortbyorder from "lodash.sortbyorder";
import { tempPeople } from "../../util/skelton";
import Person from "./Person";
import classNames from "classnames";
import { DateTime } from "luxon";
import { detailsBoxTransition, detailsBoxProps } from "../../transition";

class People extends Component {
  refs = {};
  state = {
    animation: detailsBoxProps,
    activePerson: null
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

  openDetails = (e, person) => {
    let { animation } = this.state;
    let y = this.el.getBoundingClientRect();
    let x = e.getBoundingClientRect();
    detailsBoxTransition(x, y, animation, "up");

    this.setState({ activePerson: person });
  };

  closeDetails = () => {
    let { animation } = this.state;
    let x = animation.activeBox;

    if (!x) return;

    detailsBoxTransition(null, x, animation);
  };

  personDetails = () => {
    const { items } = this.props;
    const person = this.state.activePerson;
    if (!person) return null;

    let d = [];

    for (let item in items) {
      let f = DateTime.fromISO(item).toFormat("ccc dd LLL yyyy");
      let obj = items[item].people;
      let attend = (
        <span style={{ color: "rgb(254, 115, 123)", marginRight: "15px" }}>
          ✘
        </span>
      );

      for (let [k, v] of Object.entries(obj)) {
        if (v.name === person.name) {
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
        <div className="week" key={item}>
          <div>
            {attend} {f}
          </div>
        </div>
      );
    }

    return (
      <div>
        <h2>{person.name} </h2>
        {d.reverse()}
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
        >
          <div className="inner">{this.personDetails()}</div>
        </Animated.div>

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
