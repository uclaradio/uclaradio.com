// FilterBar.js
// filtering bar for BlogPage

import React from 'react';
import { Input, Glyphicon } from 'react-bootstrap';
import './FilterBar.scss';
/**
Displays toggleable filter tags. 
Returns an array of selected filters tags.
* */

const FilterBar = React.createClass({
  getInitialState: function() {
    return {
      selectedFilters: [],
      concertCheck: false,
    };
  },
  containsFilter(filterName) {
    var list = this.state.selectedFilters;
    for (var i = 0; i < list.length; i++) {
      if (list[i] === filterName) {
        return true;
      }
    }
    return false;
  },
  insertFilter(filterName) {
    this.setState(
      {
        selectedFilters: [...this.state.selectedFilters, filterName],
      },
      () => {
        this.props.handleFilterChange(this.state.selectedFilters);
      }
    );
  },
  deleteFilter(filterName) {
    var array = [...this.state.selectedFilters];
    var index = array.indexOf(filterName);
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ selectedFilters: array }, () => {
        this.props.handleFilterChange(this.state.selectedFilters);
      });
    }
  },
  updateSelectedFilters(filterName) {
    if (this.containsFilter(filterName)) {
      this.deleteFilter(filterName);
    } else {
      this.insertFilter(filterName);
    }
  },
  render() {
    return (
      <div className="dropdown">
        <button className="dropbtn">Topic</button>
        <ul className="dropdown-content">
          <Input
            type="checkbox"
            checked={() => {
              this.setState({
                concertCheck: !this.state.concertCheck,
              });
              return this.state.concertCheck;
            }}
            onChange={() => {
              this.updateSelectedFilters('ConcertReview');
            }}
            label="Show Reviews"
          />
          <li
            id="shows"
            onClick={() => {
              this.updateSelectedFilters('ConcertReview');
            }}
          >
            Show Reviews
          </li>
          <li
            id="artists"
            onClick={() => {
              this.updateSelectedFilters('ArtistInterview');
            }}
          >
            Artist Interviews
          </li>
          <li
            id="sports"
            onClick={() => {
              this.updateSelectedFilters('Sports');
            }}
          >
            Sports
          </li>
          <li
            id="festivals"
            onClick={() => {
              this.updateSelectedFilters('FestivalReview');
            }}
          >
            Festival Reviews
          </li>
          <li
            id="other"
            onClick={() => {
              this.updateSelectedFilters('Other');
            }}
          >
            Other
          </li>
        </ul>
      </div>
    );
  },
});

export default FilterBar;
