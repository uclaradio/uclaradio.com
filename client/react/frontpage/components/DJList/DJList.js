// DJList.js

import React from 'react';
import { connect } from 'react-redux';
import './DJList.scss';

import DJInfo from './DJInfo';
import DJSearchBar from './DJSearchBar';
import Loader from '../Loader';

import {
  updateDJs,
  startFetching,
  stopFetching,
  fetchUpdatedDJs,
} from '../../actions/djs';

const DJUrl = '/api/djs';

/*
DJList: fetches a json list of djs from API and displays data

@prop djs: array of dj objects
@prop fetching: currently fetching objects
@prop updateDJs: callback to fetch updated dj list from server
*/
const DJList = React.createClass({
  getInitialState() {
    return {
      displayedDJs: this.props.djs,
    };
  },
  componentDidMount() {
    this.props.updateDJs();
  },
  getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.djs.length !== prevState.displayedDJs.length) {
      return {
        displayedDJs: nextProps.djs,
      };
    }
    return null;
  },
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.djs.length !== this.props.djs.length) {
      this.setState({
        displayedDJs: this.props.djs,
      });
    }
  },
  handleSearch(input) {
    const searchQuery = input.target.value.toLowerCase();
    const DJs = this.props.djs.filter(el => {
      let searchValue;

      if (el.djName) {
        searchValue = el.djName.toLowerCase();
      } else {
        searchValue = el.fullName.toLowerCase();
      }

      return searchValue.indexOf(searchQuery) !== -1;
    });

    this.setState({
      displayedDJs: DJs,
    });
  },

  render() {
    const djs = this.state.displayedDJs.map(dj => (
      <DJInfo
        name={dj.djName || dj.fullName}
        picture={dj.picture}
        key={dj.username}
        bio={dj.bio || "This DJ doesn't have a bio yet!"}
      />
    ));

    return (
      <div className="djList">
        <DJSearchBar onChange={this.handleSearch} />
        {this.props.fetching ? <Loader /> : djs}
      </div>
    );
  },
});

const mapStateToProps = state => ({
  djs: state.djs.djs,
  fetching: state.djs.fetching,
});

const mapDispatchToProps = dispatch => ({
  updateDJs: () => {
    fetchUpdatedDJs(dispatch);
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DJList);
