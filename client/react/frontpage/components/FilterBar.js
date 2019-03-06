// FilterBar.js
// filtering bar for BlogPage

import React from 'react';
import { Input } from 'react-bootstrap';
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
      showDropdown: false,
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
  showDropdown(event) {
    event.preventDefault();

    this.setState({ showDropdown: true }, () => {
      document.addEventListener('click', this.closeDropdown);
    });
  },
  closeDropdown() {
    if (!this.dropdownMenu.contains(event.target)) {
      this.setState({ showDropdown: false }, () => {
        document.removeEventListener('click', this.closeDropdown);
      });
    }
  },
  render() {
    return (
      <div className="dropdown">
        <button className="dropbtn" onClick={this.showDropdown}>
          Categories
        </button>
        {this.state.showDropdown ? (
          <ul
            className="dropdown-content"
            ref={element => {
              this.dropdownMenu = element;
            }}
          >
            <li>
              <Input
                label="Concert Reviews"
                type="checkbox"
                checked={this.containsFilter('Show Review')}
                onChange={() => {
                  this.updateSelectedFilters('Show Review');
                }}
              />
            </li>
            <li>
              <Input
                label="Music Reviews"
                type="checkbox"
                checked={this.containsFilter('Music Review')}
                onChange={() => {
                  this.updateSelectedFilters('Music Review');
                }}
              />
            </li>
            <li>
              <Input
                label="Interviews"
                type="checkbox"
                checked={this.containsFilter('Interview')}
                onChange={() => {
                  this.updateSelectedFilters('Interview');
                }}
              />
            </li>
            <li>
              <Input
                aria-label="Sports"
                label="Sports"
                type="checkbox"
                checked={this.containsFilter('Sports')}
                onChange={() => {
                  this.updateSelectedFilters('Sports');
                }}
              />
            </li>
            <li>
              <Input
                label="News"
                type="checkbox"
                checked={this.containsFilter('News')}
                onChange={() => {
                  this.updateSelectedFilters('News');
                }}
              />
            </li>
            <li>
              <Input
                label="Entertainment"
                type="checkbox"
                checked={this.containsFilter('Entertainment')}
                onChange={() => {
                  this.updateSelectedFilters('Entertainment');
                }}
              />
            </li>
            <li>
              <Input
                label="Comedy"
                type="checkbox"
                checked={this.containsFilter('Comedy')}
                onChange={() => {
                  this.updateSelectedFilters('Comedy');
                }}
              />
            </li>
            <li>
              <Input
                label="UCLA Radio"
                type="checkbox"
                checked={this.containsFilter('UCLA Radio')}
                onChange={() => {
                  this.updateSelectedFilters('UCLA Radio');
                }}
              />
            </li>
          </ul>
        ) : null}
      </div>
    );
  },
});

export default FilterBar;
