import React, { Component } from "react";
import Header from "../Header";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

export class Attendance extends Component {
  state = {};
  render() {
    const { history, locationId } = this.props;

    return (
      <div className="App">
        <Header
          attendance={true}
          locationId={locationId ? locationId : 0}
          stats={() => {
            history.push(`/stats/${locationId}`);
          }}
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
    locationId: ownProps.match.params.id
  };
};

export default withRouter(connect(mapStateToProps)(Attendance));
