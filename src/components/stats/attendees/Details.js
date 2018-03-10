import React, { Component } from 'react';
import { connect } from "react-redux";
import { DateTime } from "luxon";
import Animated from "animated/lib/targets/react-dom";
import { datesToCal } from "../../../util/attendance";
import { getAccount } from "../../../api";
import AccountCard from "../../account/AccountCard";
import Calendar from "../calendar/Calendar";

class Details extends Component {
    state = { datesData: [], accountData: [], val: new Animated.Value(0) }

    componentDidMount() {
        this.itemDetails();
    }

    componentDidUpdate(prevProps) {
        const { isOpen, item } = this.props;
        const { val } = this.state;
        const uId = item.id;

        if (!isOpen) {
            val.setValue(0);
        }

        if (prevProps.item.id === uId) {
            return;
        }

        this.itemDetails();
    }

    fadeIn() {
        Animated.sequence([
            Animated.delay(200),
            Animated.timing(this.state.val, { toValue: 1 })
        ]).start();
    }

    itemDetails = async () => {
        this.setState({ loading: true });
        const { items, item } = this.props;
        //const item = this.state.activeItem;
        if (!item || !items) return null;
        let dObj = {};

        for (let key in items) {
            let YMD = DateTime.fromISO(key).toFormat("yyyy-MM-dd");
            let obj = items[key].people;

            if (obj) {
                dObj[YMD] = false;
                // eslint-disable-next-line
                for (let [k, v] of Object.entries(obj)) {
                    if (v.name === item.name) {
                        if (v.in) {
                            dObj[YMD] = true;
                        }
                    }
                }
            }
        }

        const datesData = datesToCal(dObj);
        const accountData = await getAccount(item.id);
        const data = accountData.data[0];
        this.setState({ accountData: data, datesData, loading: false }, this.fadeIn);
    };

    spinner = () => {
        return <div className="show-spinner">
            <div className="spinner spinner-white"></div>
        </div>
    }

    details = () => {
        const { accountData, datesData } = this.state;
        return <Animated.div
            style={{ opacity: this.state.val }}
        >
            <div className="details-inner">
                <div className="weeks">
                    <Calendar dates={datesData.dates} attendance={datesData.attendance} />
                </div>
                <div className="details">
                    <AccountCard accountData={accountData} />
                </div>
            </div>
        </Animated.div>
    }

    render() {
        const { item } = this.props;
        const { loading } = this.state;
        return (
            <div>
                <div className="inner">
                    <div>
                        <div className="close-details" />
                        <div className="details-header">
                            <h2>{item.name}</h2>
                            <button style={{ marginBottom: "20px" }} className="btn" onClick={this.closeDetails}>
                                CLOSE
                            </button>
                        </div>
                        {loading ? this.spinner() : this.details()}
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isOpen: state.statDetails.isOpen
    };
};

export default connect(mapStateToProps)(Details);