import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";
import { DateTime } from "luxon";
import sortBy from "sort-by";
import Header from "../Header";
import { attendanceList } from "../../actions";
import { syncPeople, now } from "../../api/sync";
import { getLocationName } from "../../util";
import ListItem from "./ListItem";
import Volunteer from "./volunteer/Volunteer";

export class Attendance extends Component {
  componentDidMount() {
    const { locationId, date, attendanceList } = this.props;
    if (date === now) {
      syncPeople(locationId);
    }

    attendanceList(locationId, date);
  }

  handleClickOutside = (e) => {
    const { dispatch, activeItem } = this.props;
    const prop = e.target.dataset["menu"];
    if (activeItem && !prop) {
      dispatch({ type: "ACTIVE_ITEM", payload: false });
    }
  }

  handleClick = id => {
    const { dispatch, activeItem } = this.props;
    if (activeItem === id) {
      dispatch({ type: "ACTIVE_ITEM", payload: false });
      return;
    }
    dispatch({ type: "ACTIVE_ITEM", payload: { id } });
  };

  getListItems() {
    const { locationId, date, activeItem } = this.props;
    let accounts = this.props.attendance;
    if (!accounts || typeof accounts.people !== "object") {
      return null;
    }

    let Items;

    Items = Object.values(accounts.people)
      .filter(item => {
        const s = {};
        s.term = "a";
        let term = s.term.toLowerCase();
        if (term === "") return true;
        let str = item.name.toLowerCase();
        return str.search(term) > -1;
      })
      .filter(item => {
        const s = {};
        //filters
        s.filter_in = true;
        s.filter_out = true;

        if (s.filter_in && s.filter_out) return true;
        if (s.filter_in && item.in) return true;
        if (s.filter_out && !item.in) return true;
        return false;
      })
      .sort(sortBy("name"))
      .map((item, index) => {
        return (
          <ListItem
            active={activeItem}
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
    let activeItems = this.props.attendance && this.props.attendance.volunteers ? this.props.attendance.volunteers : "";

    if (activeItems) {
      activeItems = activeItems.split(",");
    }

    return (
      <div className="App">
        <Header />
        <div
          className="people"
          onClick={this.handleClickOutside}
        >
          <h2>
            Attendance - {getLocationName(locationId)} -{" "}
            {DateTime.fromISO(date).toFormat("LLL dd yyyy")}
          </h2>
          <div className="people-list">{this.getListItems()}</div>
          <Volunteer activeItems={activeItems} locationId={locationId} date={date} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    locationId: ownProps.match.params.id,
    date: ownProps.match.params.date,
    attendance: state.main.attendance,
    activeItem: state.main.activeItem,
    disabled: state.main.disabled
  };
};

function mapDispatchToProps(dispatch) {
  return { ...bindActionCreators({ attendanceList }, dispatch), dispatch };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Attendance)
);
