import React, { Component } from "react";
import Animated from "animated/lib/targets/react-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Aux from "react-aux";
import { DateTime } from "luxon";
import { watchRef } from "../../util/firebase";
import { getAttendance } from "../../util/attendance";
import { OverallAttendance, Weekly, People } from "./index";
import Header from "../Header";
import { LocationDropDown } from "../LocationDropDown";

const Locations = (locationId, onChange) => {
  return function(disabled) {
    return (
      <LocationDropDown
        disabled={disabled}
        locationId={locationId}
        onChange={onChange}
      />
    );
  };
};

export class Stats extends Component {
  active = true;
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

  addNew = () => {
    const { history, locationId } = this.props;
    const { now } = this.state;
    this.active = false;
    history.push(`/attendance/${locationId}/${now}`);
  };

  updateLocation = id => {
    this.setState({ items: [], attendance: false }, this.updateStats);
  };

  updateStats = () => {
    const { locationId } = this.props;
    this.fadeIn();

    watchRef(locationId, async (err, items) => {
      if (!this.active) return;
      //need to handle for sign-out
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
    const { items, attendance, error, nextLocation } = this.state;
    const { locationId } = this.props;
    let present, absent;

    if (attendance && attendance.overall) {
      present = attendance.overall.percent;
      absent = 100 - attendance.overall.percent;
    }

    if (error !== "") {
      return <div>{error}</div>;
    }

    // curry this to avoid passing the props down
    const DropDownMenu = Locations(locationId, this.initUpdateLocation);

    return (
      <div className="App">
        <Header
          waitFor={attendance}
          render={({ disabled }) => {
            return (
              <Aux>
                {DropDownMenu(disabled)}
                <button className="btn nav-link" onClick={this.addNew}>
                  Add New
                </button>
              </Aux>
            );
          }}
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
    isAuthenticated: state.auth.isAuthenticated,
    locationId: ownProps.match.params.id
  };
};

export default withRouter(connect(mapStateToProps)(Stats));
