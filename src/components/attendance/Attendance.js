import React, { Component } from "react";
import Header from "../Header";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { attendanceList } from "../../actions";
import { syncPeople, now } from "../../api/sync";
import { getLocationName } from "../../util";
import CheckIn from "./Checkin";
import Settings from "./Settings";
import { DateTime } from "luxon";
import sortBy from "sort-by";

export class Attendance extends Component {
  state = {};

  componentDidMount() {
    const { locationId, date, attendanceList } = this.props;
    if (date === now) {
      syncPeople(locationId);
    } else {
      console.log("not today");
    }

    attendanceList(locationId, date);
  }

  getListItems() {
    const { locationId, date } = this.props;
    let accounts = this.props.attendance;
    if (!accounts || typeof accounts.people !== "object") {
      return null;
    }

    let Items;

    Items = Object.values(accounts.people)
      .filter(item => {
        /*
        let term = this.state.term.toLowerCase();
        if (term == "") return true;
        let str = item.name.toLowerCase();
        return str.search(term) > -1;
        */

        return true;
      })
      .filter(item => {
        /*
        if (this.state.filter_in && this.state.filter_out) return true;
        if (this.state.filter_in && item.in) return true;
        if (this.state.filter_out && !item.in) return true;

        return false;
        */

        return true;
      })
      .sort(sortBy("name"))
      .map((item, index) => {
        return (
          <div className="person attendance-person" key={item.id}>
            <CheckIn item={item} locationId={locationId} date={date} />
            <div className="name">{item.name}</div>
            <Settings />
          </div>
        );
      }); //end map

    return Items;
  }
  //

  render() {
    const { locationId, date } = this.props;

    return (
      <div className="App">
        <Header />

        <div className="people">
          <h2>
            Attendance - {getLocationName(locationId)} -{" "}
            {DateTime.fromISO(date).toFormat("LLL dd yyyy")}
          </h2>
          <div className="people-list">{this.getListItems()}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    locationId: ownProps.match.params.id,
    date: ownProps.match.params.date,
    attendance: state.main.attendance
  };
};

export default withRouter(
  connect(mapStateToProps, { attendanceList })(Attendance)
);
