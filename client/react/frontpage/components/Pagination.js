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
  getInitialState() {
    return { pageNumber: this.props.pageNumber };
  },
  handleInputChange(e) {
    let newPageNum = e.target.value;

    if (newPageNum) {
      newPageNum = parseInt(newPageNum, 10);
    }

    if (newPageNum < 0) {
      newPageNum = 0;
    } else if (newPageNum > this.props.maxPages) {
      newPageNum = this.props.maxPages;
    }

    this.setState({
      pageNumber: newPageNum,
    });
  },
  handleEnter(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      this.props.setPageNumber(this.state.pageNumber);
    }
  },
  goToNextPage() {
    if (this.nextIsValid()) {
      this.props.setPageNumber(this.props.pageNumber + 1);
      this.setState({
        pageNumber: this.props.pageNumber + 1,
      });
    }
  },
  goToPrevPage() {
    if (this.prevIsValid()) {
      this.props.setPageNumber(this.props.pageNumber - 1);
      this.setState({
        pageNumber: this.props.pageNumber - 1,
      });
    }
  },
  nextIsValid() {
    return this.props.pageNumber < this.props.maxPages;
  },
  prevIsValid() {
    return this.props.pageNumber > 0;
  },
  render() {
    const prevIsDisabled = !this.prevIsValid();
    const nextIsDisabled = !this.nextIsValid();
    return (
      <div className="pagination-wrapper">
        <button
          className={`pagination-btn ${prevIsDisabled ? 'btn-disabled' : ''}`}
          onClick={this.goToPrevPage}
          disabled={prevIsDisabled}
        >
          {'< Prev'}
        </button>
        <input
          defaultValue={this.props.pageNumber}
          value={this.state.pageNumber}
          onChange={this.handleInputChange}
          onKeyDown={this.handleEnter}
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
