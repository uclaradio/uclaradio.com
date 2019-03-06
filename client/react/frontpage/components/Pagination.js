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
    return {
      pageNumber: this.props.pageNumber,
      changingPage: false,
    };
  },
  componentDidUpdate() {
    if (
      this.props.pageNumber !== this.state.pageNumber &&
      !this.state.changingPage
    )
      this.setState({
        pageNumber: this.props.pageNumber,
      });
  },
  handleInputChange(e) {
    this.setState({ changingPage: true });
    let newPageNum = e.target.value;

    if (newPageNum) {
      newPageNum = parseInt(newPageNum, 10);
    }

    this.setState({
      // user's entry will be 1-indexed
      pageNumber: newPageNum - 1,
    });
  },
  handleEnter(e) {
    if (e.keyCode === 13) {
      e.preventDefault();
      if (
        !e.target.value ||
        e.target.value < 0 ||
        e.target.value > this.props.maxPages
      ) {
        this.setState({
          pageNumber: 0,
        });
        this.props.setPageNumber(0);
      } else {
        this.props.setPageNumber(this.state.pageNumber);
      }
      this.setState({ changingPage: false });
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
          aria-label="Page Input"
          defaultValue={this.props.pageNumber}
          // display 0 as empty string
          value={this.state.pageNumber >= 0 ? this.state.pageNumber + 1 : ''}
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
