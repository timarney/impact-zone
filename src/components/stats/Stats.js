import React, { Component } from "react";
import OverallAttendance from "./OverallAttendance";
import Weekly from "./Weekly";
import People from "./People";
import Header from "../Header";
import Animated from "animated/lib/targets/react-dom";
import { watchRef } from "../../util/firebase";
import { getAttendance } from "../../util/attendance";

import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

export class Stats extends Component {
  state = {
    nextLocation: false,
    //location: false,
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
    const { history } = this.props;
    history.push(`/stats/${id}`);

    this.fadeOut(id);
    this.setState({ nextLocation: id });
  };

  updateLocation = id => {
    /*
    this.setState(
      { location: id, items: [], attendance: false },
      this.updateStats
    );
    */

    this.setState({ items: [], attendance: false }, this.updateStats);
  };

  updateStats = () => {
    //const { location } = this.state;
    const { locationId } = this.props;
    this.fadeIn();

    watchRef(locationId, async (err, items) => {
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
    //const { location } = this.state;
    const { locationId } = this.props;
    this.updateStats();

    if (!locationId) {
      this.defaultLocation();
    }

    this.fadeIn();
  }

  render() {
    //const { items, attendance, error, location, nextLocation } = this.state;
    const { items, attendance, error, nextLocation } = this.state;
    let present, absent;

    const { locationId } = this.props;

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
          locationId={locationId ? locationId : 0}
          initUpdateLocation={this.initUpdateLocation}
        />
        <div className="locations">
          <OverallAttendance
            attendance={attendance}
            present={present}
            absent={absent}
          />

          <Animated.div
            className="weekly-wrapper"
            style={{ opacity: this.state.val }}
          >
            <Weekly
              locationId={locationId}
              nextLocation={nextLocation}
              items={items}
              attendance={attendance}
              updateLocation={this.updateLocation}
            />
          </Animated.div>
        </div>

        <div className="people">
          <Animated.div style={{ opacity: this.state.val }}>
            <People attendance={attendance} items={items} />
          </Animated.div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    locationId: ownProps.match.params.id
  };
};

export default withRouter(connect(mapStateToProps)(Stats));
