import React, { Component } from 'react';
import { getVolunteers } from "../../../api";
import ListItem from "./ListItem";

class Volunteer extends Component {
    state = { volunteers: [] }
    async componentDidMount() {
        const volunteers = await getVolunteers();
        this.setState({ volunteers: volunteers.data });
    }
    render() {
        const { volunteers } = this.state;
        if (!volunteers.length) {
            return <div>loading </div>
        }

        const list = volunteers.map((item) => {
            item.id = item.value;
            item.name = item.label;
            return <ListItem
                active={false}
                onClick={false}
                key={item.id}
                item={item}
                locationId={false}
                date={false}
            />
        });

        return (
            <div>
                <h2>Volunteers</h2>
                <div className="people-list">{list}</div>
            </div>
        )
    }
}

export default Volunteer;