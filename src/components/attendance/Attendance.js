import React, { Component } from "react";
import Header from "../Header";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { attendanceList } from "../../actions";
import { syncPeople, now } from "../../api/sync";
import { getLocationName } from "../../util";
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
        let txt = item.name;

        return <div key={item.id}>{txt}</div>;
      }); //end map

    return Items;
  }
  //

  render() {
    const { locationId } = this.props;

    return (
      <div className="App">
        <Header />
        <div style={{ padding: "30px" }}>
          Attendance - {getLocationName(locationId)}
        </div>

        {this.getListItems()}
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
