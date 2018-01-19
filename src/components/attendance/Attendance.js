import React, { Component } from "react";
import Header from "../Header";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

// TODO add this back in
//import { syncPeople } from "../../api/sync";

export class Attendance extends Component {
  state = {};

  componentDidMount() {
    // TODO - don't do this for archived records
    /*
    const { locationId, date } = this.props;
    syncPeople(locationId);
    */
  }

  render() {
    const { history, locationId } = this.props;

    return (
      <div className="App">
        <Header
          attendance={true}
          locationId={locationId ? locationId : 0}
          navLink={() => {
            history.push(`/stats/${locationId}`);
          }}
          navText="View Stats"
          initUpdateLocation={id => {
            history.push(`/attendance/${id}`);
          }}
        />
        <div style={{ padding: "30px" }}>Attendance</div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    locationId: ownProps.match.params.id,
    date: ownProps.match.params.date
  };
};

export default withRouter(connect(mapStateToProps)(Attendance));
