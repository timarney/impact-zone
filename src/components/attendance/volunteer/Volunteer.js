import React, { Component } from 'react';
import sortBy from "sort-by";
import { getVolunteers } from "../../../api";
import ListItem from "./ListItem";
import SearchFilter from "../search/SearchFilter";

class Volunteer extends Component {
    state = { volunteers: [], filter: { filter_in: true, filter_out: true, term: "" } }
    async componentDidMount() {
        const volunteers = await getVolunteers();
        this.setState({ volunteers: volunteers.data });
    }
    getListItems() {
        const { locationId, date, activeItems } = this.props;
        const s = this.state.filter;
        const { volunteers } = this.state;
        const list = volunteers.filter(item => {
            let term = s.term.toLowerCase();
            if (term === "") return true;
            let str = item.name.toLowerCase();
            return str.search(term) > -1;
        })
            .filter(item => {
                if (s.filter_in && s.filter_out) return true;
                if (s.filter_in && item.in) return true;
                if (s.filter_out && !item.in) return true;
                return false;
            })
            .sort(sortBy("name")).map((item) => {
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

        return list;
    }
    render() {
        const { volunteers } = this.state;
        if (!volunteers.length) {
            return <div></div>
        }
        return (
            <div>
                <h2>Volunteers</h2>

                <SearchFilter handleFilter={(filter) => {
                    this.setState({ filter: filter });
                }} />

                <div className="people-list">{this.getListItems()}</div>
            </div>
        )
    }
}

export default Volunteer;