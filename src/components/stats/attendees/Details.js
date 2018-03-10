import React, { Component } from 'react';
import AccountCard from "../../account/AccountCard";
import Calendar from "../calendar/Calendar";
import { DateTime } from "luxon";

class Details extends Component {
    state = {}
    itemDetails = () => {
        const { items, item } = this.props;


        //const item = this.state.activeItem;
        if (!item || !items) return null;
        let dObj = {};

        for (let key in items) {

            

            if (key !== "people") {
                continue;
            }


            //let f = DateTime.fromISO(key).toFormat("ccc dd LLL yyyy");
            let YMD = DateTime.fromISO(key).toFormat("yyyy-MM-dd");
            let obj = items[key];

            console.log(obj);



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

        return null;

        return (
            <div>
                <div>
                    <div className="close-details" />
                    <div className="details-header">
                        <h2>{item.name}</h2>
                        <button style={{ marginBottom: "20px" }} className="btn" onClick={this.closeDetails}>
                            CLOSE
                </button>
                    </div>

                    <div className="details-inner">
                        <div className="weeks">
                            <Calendar dates={dObj} />
                        </div>
                        <div className="details">
                            <AccountCard uId={item.id} />
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    render() {
        return (<div><div className="inner">{this.itemDetails()}</div></div>)
    }
}

export default Details;