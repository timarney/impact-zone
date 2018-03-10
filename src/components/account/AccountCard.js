import React, { Component } from "react";
import { connect } from "react-redux";
import Animated from "animated/lib/targets/react-dom";
import { getAccount } from "../../api";

const _isUndefined = require("lodash/isUndefined");
const image_host = "";

class AccountCard extends Component {
    state = { data: false, val: new Animated.Value(0) }

    async componentDidMount() {
        const { uId } = this.props;
        const response = await getAccount(uId);
        this.setState({ data: response.data[0] }, () => {
            this.fadeIn();
        });
    }

    async componentDidUpdate(prevProps) {
        const { isOpen, uId } = this.props;
        const { val } = this.state;

        if (!isOpen) {
            val.setValue(0);
        }

        if (prevProps.uId === uId) {
            return;
        }

        const response = await getAccount(uId);

        if (!response || !response.data) {
            return;
        }

        this.setState({ data: response.data[0] }, () => {
            this.fadeIn();
        });
    }

    fadeIn() {
        Animated.sequence([
            Animated.delay(500),
            Animated.timing(this.state.val, { toValue: 1 })
        ]).start();
    }

    /* ---------------------------------------------------------------------------
    * UTIL
    * --------------------------------------------------------------------------- */

    parsePhones(phones) {
        let parsed = [];

        if (!_isUndefined(phones)) {
            phones = JSON.parse(phones);

            if (phones) {
                phones.forEach((element, index, array) => {
                    let phone = element.label + " " + element.val;
                    parsed.push(phone);
                });

                parsed = parsed.join(" | ");
            } else {
                parsed = "";
            }
        }

        return parsed;
    }

    /* ---------------------------------------------------------------------------
    * RENDER
    * --------------------------------------------------------------------------- */

    renderGuardian(item) {
        if (_isUndefined(item.relationship)) {
            item.relationship = "";
        }

        let phones = this.parsePhones(item.phones);

        let src = "";
        let avatar = "";
        let title = "";

        if (!_isUndefined(item.parent_photo) && item.parent_photo !== "") {
            src = image_host + "/uploads/" + item.parent_photo;

            avatar = (
                <div className="account-type-image">
                    <img alt="" className="account-type-avatar" src={src} />
                </div>
            );
        }

        title = "Guardian";

        if (item.relationship && !_isUndefined(item.relationship)) {
            title += " - " + item.relationship;
        }

        return (
            <div key={item.id} className="account-details">
                <div className="account-type guardian">{title}</div>
                <div className="account-type-details-holder">
                    <div className="account-type-details">
                        {this.renderRow("Name", item.parent_name)}
                        {this.renderRow("Phone(s)", phones)}
                        {this.renderRow("Email", item.parent_email)}
                        {this.renderRow("Address", item.parent_address)}
                    </div>
                    {avatar}
                </div>
            </div>
        );
    }

    /* --------------------------------------------------------------------------- */
    renderRow(label, val) {
        if (!val || _isUndefined(val)) return;
        return (
            <div>
                <label>{label + ":"}</label>
                <p>{val}</p>
            </div>
        );
    }

    render() {
        let item = this.state.data;

        if (!item) {
            return null;
        }

        if (_isUndefined(item.child_name)) {
            return <div>loading</div>;
        }

        let avatar = "";

        let phones = this.parsePhones(item.phones);

        let guardians = [];

        if (!_isUndefined(item.Guardians)) {
            item.Guardians.forEach((element, index, array) => {
                guardians.push(this.renderGuardian(element));
            });
        }

        let child_src = "";

        if (!_isUndefined(item.child_photo) && item.child_photo != null) {
            child_src = image_host + "/uploads/" + item.child_photo;

            avatar = (
                <div className="account-type-image">
                    <img alt="" src={child_src} />
                </div>
            );
        }
        return (
            <Animated.div
                style={{ opacity: this.state.val }}
            >
                <div className="account-card">
                    <div className="fields">
                        <div className="account-details">
                            <div className="account-type child">Child</div>
                            <div className="account-type-details-holder">
                                <div className="account-type-details">
                                    {this.renderRow("Name", item.child_name)}
                                    {this.renderRow("E-mail", item.child_email)}
                                    {this.renderRow("Phone(s)", phones)}
                                    {this.renderRow("Address", item.child_address)}
                                </div>
                                {avatar}
                                <div className="account-type-details">
                                    <fieldset>
                                        <legend>Doctor Information</legend>
                                        {this.renderRow("Name", item.child_doctors_name)}
                                        {this.renderRow("Number", item.child_doctors_number)}
                                        {this.renderRow("OHIP #", item.child_ohip)}
                                        {this.renderRow(
                                            "Medical Conditions",
                                            item.child_medical_conditions
                                        )}
                                        {this.renderRow("Drugs", item.child_drugs)}
                                        {this.renderRow("Notes", item.child_notes)}
                                        {this.renderRow("Allergies", item.child_allergies)}
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                        {guardians}
                    </div>
                </div>

            </Animated.div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isOpen: state.statDetails.isOpen
    };
};

export default connect(mapStateToProps)(AccountCard);
