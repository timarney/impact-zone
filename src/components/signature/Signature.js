import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import SignaturePad from "./index";
import { updatePersonProp, getPersonData } from "../../util/firebase";
import { connect } from "react-redux";

class Signature extends Component {
  state = {};

  async componentDidMount() {
    console.log("mounted", this.props);
    const { locationId, date, userId } = this.props;
    let d = await getPersonData(locationId, date, userId, "signature");
    this.signature.fromDataURL(d.signature);
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

        <SignaturePad
          clearButton="true"
          ref={node => {
            this.signature = node;
          }}
          render={() => {
            return (
              <div className="m-signature-pad--footer">
                <div>
                  <button
                    className="btn btn-default button cancel"
                    onClick={() => {
                      history.goBack();
                    }}
                  >
                    Cancel
        </button>
                  <button className="btn btn-default button clear" onClick={() => {
                    this.signature.clear();
                  }}>
                    Clear
                    </button>
                </div>
                <div>
                  <button className="btn btn-default button save" onClick={this.onSubmit}>
                    Submit
        </button>
                </div>
              </div>
            )

          }}
        />

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
