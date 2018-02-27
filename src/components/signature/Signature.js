import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import SignaturePad from "./index";
import { updatePersonProp, getPersonData } from "../../util/firebase";
import { connect } from "react-redux";
import { GuardianDropDown } from "../menus/GuardianDropDown";

class Signature extends Component {
  state = { guardian_out: false };

  async componentDidMount() {
    const { locationId, date, userId } = this.props;
    let d = await getPersonData(locationId, date, userId, "signature");
    if (d && d.signature) {
      this.signature.fromDataURL(d.signature);
    }

  }

  onSubmit = () => {
    const { locationId, date, userId, history, dispatch } = this.props;
    const { guardian_out } = this.state;
    const data = this.signature.toDataURL();
    updatePersonProp(locationId, date, userId, "signature", data);

    if (guardian_out) {
      updatePersonProp(locationId, date, userId, "guardian_out", guardian_out);
    }


    history.goBack();

    dispatch({ type: "ACTIVE_ITEM", payload: false });
  };

  updateGuardian = (data) => {
    //const { locationId, date, userId } = this.props;
    this.setState({ guardian_out: data });
    //updatePersonProp(locationId, date, userId, "guardian_out", data);
  }

  render() {
    const { history, item } = this.props;

    let selected = false;

    if (item && item.guardian_out && item.guardian_out.payload) {
      selected = item.guardian_out.payload
    }

    return (
      <div className="signature">

        <SignaturePad
          clearButton="true"
          ref={node => {
            this.signature = node;
          }}
          header={() => {
            return <div className="m-signature-pad--header">
              {item && item.guardians ? <GuardianDropDown onChange={this.updateGuardian} selected={selected} options={item.guardians} /> : null}
            </div>
          }}
          footer={() => {
            return (
              <div className="m-signature-pad--footer">
                <div>
                  <button
                    className="btn btn-default button cancel"
                    onClick={() => {
                      const { dispatch } = this.props;
                      dispatch({ type: "ACTIVE_ITEM", payload: false });
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
    userId: ownProps.match.params.user,
    item: state.main.item
  };
};

export default withRouter(connect(mapStateToProps)(Signature));
