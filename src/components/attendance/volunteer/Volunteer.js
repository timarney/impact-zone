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
        const { locationId, date, activeItems } = this.props;
        const { volunteers } = this.state;
        if (!volunteers.length) {
            return <div></div>
        }

        const list = volunteers.map((item) => {
            item.id = item.value;
            item.name = item.label;
            item.in = false;
            let active = false;
            if (activeItems.includes(String(item.id))) {
                item.in = true;
                active = true;
            }

            return <ListItem
                active={active}
                activeItems={activeItems}
                onClick={false}
                key={item.id}
                item={item}
                locationId={locationId}
                date={date}
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