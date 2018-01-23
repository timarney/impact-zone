import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import SignaturePad from "react-signature-pad";
import { updatePersonProp } from "../../util/firebase";
import { connect } from "react-redux";

class Signature extends Component {
  state = {};

  componentDidMount() {
    console.log("mounted", this.props);
  }

  onSubmit = () => {
    const { locationId, date, userId, history } = this.props;
    const data = this.signature.toDataURL();
    updatePersonProp(locationId, date, userId, "signature", data);
    history.goBack();
    //idRef.child("guardian_out").set(this.signatureGuardian);
  };

  render() {
    const { history } = this.props;
    //console.log("ere",previousLocation);
    return (
      <div className="signature">
        Sign Here{" "}
        <a
          href="#clear"
          onClick={() => {
            history.goBack();
          }}
        >
          Cancel
        </a>
        <SignaturePad
          clearButton="true"
          ref={node => {
            this.signature = node;
          }}
        />
        <a href="#sign" onClick={this.onSubmit}>
          Submit
        </a>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    locationId: ownProps.match.params.id,
    date: ownProps.match.params.date,
    userId: ownProps.match.params.user
  };
};

export default withRouter(connect(mapStateToProps)(Signature));
