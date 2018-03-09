import React, { Component } from "react";
import { getAccount } from "../../api";
let _isUndefined = require("lodash/isUndefined");

const image_host = "";

export default class AccountCard extends Component {
    constructor(props) {
        super(props);
        this.state = { data: false };
    }

    async componentDidMount() {
        const uId = this.props.uid;
        const response = await getAccount(uId);
        this.setState({ data: response.data[0] });
    }

    async componentDidUpdate(prevProps) {
        if (prevProps.uid === this.props.uid) {
            return;
        }
        const uId = this.props.uid;
        const response = await getAccount(uId);
        this.setState({ data: response.data[0] });
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
        );
    }
}
