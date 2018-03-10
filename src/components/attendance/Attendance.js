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
import SearchFilter from "./search/SearchFilter";
import Details from "./details/Details";

const filter = { filter_in: true, filter_out: true, term: "" };

export class Attendance extends Component {
  state = { peopleFilter: filter };

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
    const s = this.state.peopleFilter;
    let accounts = this.props.attendance;
    if (!accounts || typeof accounts.people !== "object") {
      return null;
    }

    let Items;

    Items = Object.values(accounts.people)
      .filter(item => {
        let term = s.term.toLowerCase();
        if (term === "") return true;
        let str = item.name.toLowerCase();
        return str.search(term) > -1;
      })
      .filter(item => {
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
    const { locationId, date, speaker = "", activity = "" } = this.props;
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

          <Details locationId={locationId} date={date} speaker={speaker} activity={activity} />

          <div>
            <SearchFilter handleFilter={(filter) => {
              this.setState({ peopleFilter: filter });
            }} />
            <div className="people-list">
              {this.getListItems()}
            </div>
          </div>
          <hr className="dashed" />
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
    speaker: state.main.attendance.speaker,
    activity: state.main.attendance.activity,
    disabled: state.main.disabled
  };
};

function mapDispatchToProps(dispatch) {
  return { ...bindActionCreators({ attendanceList }, dispatch), dispatch };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Attendance)
);
