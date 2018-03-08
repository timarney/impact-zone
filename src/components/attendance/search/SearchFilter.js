import React, { Component } from 'react';
require("./search.css");

class SearchFilter extends Component {
    state = { filter_in: true, filter_out: true, term: "" }

    handleInputChange = (event) => {
        const { handleFilter } = this.props;
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        }, () => {
            handleFilter(this.state)
        });
    }

    render() {
        const { filter_in, filter_out, term } = this.state;
        return (
            <div className="search-filter">
                <div><input name="term" value={term} className="search-input" type="text" placeholder="Search" onChange={this.handleInputChange} /></div>
                <div className="checkboxes">
                    <div><input name="filter_in" checked={filter_in} type="checkbox" onChange={this.handleInputChange} /> Present</div>
                    <div><input name="filter_out" checked={filter_out} type="checkbox" onChange={this.handleInputChange} /> Absent</div>
                </div>
            </div>
        )
    }
}

export default SearchFilter;