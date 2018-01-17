import React, { Component } from "react";
import "../../App.css";
import OverallAttendance from "./OverallAttendance";
import Weekly from "./Weekly";
import People from "./People";
import Header from "../Header";
import Animated from "animated/lib/targets/react-dom";
import { watchRef } from "../../util/firebase";
import { getAttendance } from "../../util/attendance";

export class Stats extends Component {
  state = {
    nextLocation: false,
    location: false,
    items: [],
    attendance: false,
    error: "",
    val: new Animated.Value(0)
  };

  fadeIn() {
    Animated.sequence([
      Animated.timing(this.state.val, { toValue: 1 })
    ]).start();
  }

  fadeOut = id => {
    Animated.sequence([Animated.timing(this.state.val, { toValue: 0 })]).start(
      e => {
        this.updateLocation(id);
      }
    );
  };

  componentDidUpdate() {
    this.fadeIn();
  }

  initUpdateLocation = id => {
    this.fadeOut(id);
    this.setState({ nextLocation: id });
  };

  updateLocation = id => {
    this.setState(
      { location: id, items: [], attendance: false },
      this.updateStats
    );
  };

  updateStats = () => {
    const { location } = this.state;
    this.fadeIn();

    watchRef(location, async (err, items) => {
      if (err) {
        this.setState({ error: err.message });
        return;
      }

      this.setState({ items, attendance: await getAttendance(items) });
    });
  };

  defaultLocation() {
    this.setState({ nextLocation: 25, location: 25 }, this.updateStats);
  }

  componentDidMount() {
    const { location } = this.state;
    this.updateStats();

    if (!location) {
      this.defaultLocation();
    }

    this.fadeIn();
  }

  render() {
    const { items, attendance, error, location, nextLocation } = this.state;
    let present, absent;

    if (attendance && attendance.overall) {
      present = attendance.overall.percent;
      absent = 100 - attendance.overall.percent;
    }

    if (error !== "") {
      return <div>{error}</div>;
    }

    return (
      <div className="App">
        <Header
          attendance={attendance}
          location={location}
          initUpdateLocation={this.initUpdateLocation}
        />
        <div className="locations">
          <OverallAttendance
            location={location}
            attendance={attendance}
            present={present}
            absent={absent}
          />

          <Animated.div
            className="weekly-wrapper"
            style={{ opacity: this.state.val }}
          >
            <Weekly
              location={location}
              nextLocation={nextLocation}
              items={items}
              attendance={attendance}
              updateLocation={this.updateLocation}
            />
          </Animated.div>
        </div>

        <div className="people">
          <Animated.div style={{ opacity: this.state.val }}>
            <People attendance={attendance} items={items} location={location} />
          </Animated.div>
        </div>
      </div>
    );
  }
}
