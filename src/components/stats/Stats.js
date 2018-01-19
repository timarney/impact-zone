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
import { DateTime } from "luxon";

export class Stats extends Component {
  state = {
    nextLocation: false,
    items: [],
    attendance: false,
    error: "",
    val: new Animated.Value(0),
    now: DateTime.local().toISODate()
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
    this.setState({ items: [], attendance: false }, this.updateStats);
  };

  updateStats = () => {
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

  componentDidMount() {
    this.updateStats();
    this.fadeIn();
  }

  render() {
    const { items, attendance, error, nextLocation, now } = this.state;
    const { locationId, history } = this.props;
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
          locationId={locationId ? locationId : 0}
          initUpdateLocation={this.initUpdateLocation}
          navLink={() => {
            history.push(`/attendance/${locationId}/${now}`);
          }}
          navText="Add New"
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
