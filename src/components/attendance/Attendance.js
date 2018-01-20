import React, { Component } from "react";
import Header from "../Header";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { attendanceList } from "../../actions";
import { syncPeople, now } from "../../api/sync";
import { getLocationName } from "../../util";
import Box from "./Box";
import { DateTime } from "luxon";
import sortBy from "sort-by";

export class Attendance extends Component {
  state = { tooltip: false };

  componentDidMount() {
    const { locationId, date, attendanceList } = this.props;
    if (date === now) {
      syncPeople(locationId);
    } else {
      console.log("not today");
    }

    attendanceList(locationId, date);
  }

  handleClick = id => {
    const { tooltip } = this.state;
    if (tooltip === id) {
      this.setState({ tooltip: false });
      return;
    }
    this.setState({ tooltip: id });
  };

  getListItems() {
    const { locationId, date } = this.props;
    const { tooltip } = this.state;
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
          <Box
            active={tooltip}
            onClick={this.handleClick}
            key={item.id}
            item={item}
            locationId={locationId}
            date={date}
          />
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
