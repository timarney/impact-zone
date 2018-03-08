import React, { Component } from 'react';
import { updateProp } from "../../../util/firebase";
require("./details.css");

class Details extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidUpdate() {
        console.log(this.props);
    }

    handleInputChange = (event) => {
        const { locationId, date } = this.props;
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        /*
        
        this.setState({
            [name]: value
        });
        */

        updateProp(locationId, date, name, value);
    }

    render() {
        const { activity, speaker } = this.props;
        return (<div className="detail-inputs">
            <div>Speaker <input type="text" value={speaker} name="speaker" placeholder="Name" onChange={this.handleInputChange} /></div>
            <div>Activity <input type="text" value={activity} name="activity" placeholder="Name" onChange={this.handleInputChange} /></div>

        </div>)
    }
}

export default Details;