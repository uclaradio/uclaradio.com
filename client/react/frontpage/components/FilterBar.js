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
          Type
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
                checked={this.containsFilter('CONCERT REVIEW')}
                onChange={() => {
                  this.updateSelectedFilters('CONCERT REVIEW');
                }}
              />
            </li>
            <li>
              <Input
                label="Music Reviews"
                type="checkbox"
                checked={this.containsFilter('MUSIC REVIEW')}
                onChange={() => {
                  this.updateSelectedFilters('MUSIC REVIEW');
                }}
              />
            </li>
            <li>
              <Input
                label="Interviews"
                type="checkbox"
                checked={this.containsFilter('INTERVIEW')}
                onChange={() => {
                  this.updateSelectedFilters('INTERVIEW');
                }}
              />
            </li>
            <li>
              <Input
                label="Sports"
                type="checkbox"
                checked={this.containsFilter('SPORTS')}
                onChange={() => {
                  this.updateSelectedFilters('SPORTS');
                }}
              />
            </li>
            <li>
              <Input
                label="News"
                type="checkbox"
                checked={this.containsFilter('NEWS')}
                onChange={() => {
                  this.updateSelectedFilters('NEWS');
                }}
              />
            </li>
            <li>
              <Input
                label="Entertainment"
                type="checkbox"
                checked={this.containsFilter('ENTERTAINMENT')}
                onChange={() => {
                  this.updateSelectedFilters('ENTERTAINMENT');
                }}
              />
            </li>
            <li>
              <Input
                label="Comedy"
                type="checkbox"
                checked={this.containsFilter('COMEDY')}
                onChange={() => {
                  this.updateSelectedFilters('COMEDY');
                }}
              />
            </li>
            <li>
              <Input
                label="Featured"
                type="checkbox"
                checked={this.containsFilter('FEATURED')}
                onChange={() => {
                  this.updateSelectedFilters('FEATURED');
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
