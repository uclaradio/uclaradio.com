// Pagination.js
// Pagination component

import React from 'react';
import './Pagination.scss';

/**
Reusable pagination
@prop maxPages: limit of pages based on data
@prop setPageNumber: set current page
* */

const Pagination = React.createClass({
  getInitialState: function() {
    return { pageNumber: 0 };
  },
  handleInputChange(e) {
    var newPageNum = e.target.value;
    if (newPageNum < 0) {
      newPageNum = 0;
    } else if (newPageNum > this.props.maxPages) {
      newPageNum = this.props.maxPages;
    }
  },
  goToNextPage() {
    if (this.nextIsValid()) {
      this.props.setPageNumber(this.state.pageNumber + 1);
      this.setState({
        pageNumber: this.state.pageNumber + 1,
      });
    }
  },
  goToPrevPage() {
    if (this.prevIsValid()) {
      this.props.setPageNumber(this.state.pageNumber - 1);
      this.setState({
        pageNumber: this.state.pageNumber - 1,
      });
    }
  },
  nextIsValid() {
    return this.state.pageNumber < this.props.maxPages;
  },
  prevIsValid() {
    return this.state.pageNumber > 0;
  },
  render() {
    var prevIsDisabled = !this.prevIsValid();
    var nextIsDisabled = !this.nextIsValid();
    return (
      <div className="pagination-wrapper">
        <button
          className={`pagination-btn ${prevIsDisabled ? 'btn-disabled' : ''}`}
          onClick={this.goToPrevPage}
          disabled={prevIsDisabled}
        >
          {'<Prev'}
        </button>
        <input
          value={this.state.pageNumber}
          onChange={this.handleInputChange}
        />
        <button
          className={`pagination-btn ${nextIsDisabled ? 'btn-disabled' : ''}`}
          onClick={this.goToNextPage}
          disabled={nextIsDisabled}
        >
          {'Next >'}
        </button>
      </div>
    );
  },
});

export default Pagination;
