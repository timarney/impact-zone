import React, { Component } from "react";
import Header from "../Header";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

export class Attendance extends Component {
  state = {};
  render() {
    const { history, location } = this.props;
    return (
      <div className="App">
        <Header
          attendance={true}
          location={location}
          initUpdateLocation={id => {
            history.push(`/attendance/${id}`);
          }}
        />
        <div>Attendance</div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(ownProps);
  return {
    location: ownProps.match.params.id
  };
};

export default withRouter(connect(mapStateToProps)(Attendance));
