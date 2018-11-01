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
const allDJs = [
  {
    username: 'katie',
    fullName: 'katie',
    djName: 'kc',
    email: 'btehrani@g.ucla.edu',
    bio:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    username: 'Brian Tehrani',
    fullName: 'Brian Tehrani',
    djName: 'Tehranisaurus',
    email: 'btehrani@g.ucla.edu',
    bio:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    username: 'daniel',
    fullName: 'daniel',
    djName: 'daniel',
    email: 'btehrani@g.ucla.edu',
    bio:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    username: 'tanzeela',
    fullName: 'tanzeela',
    djName: 'tanzeela',
    email: 'btehrani@g.ucla.edu',
    bio:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    username: 'haejin',
    fullName: 'haejin',
    djName: 'haejin',
    email: 'btehrani@g.ucla.edu',
    bio:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    username: 'arjun',
    fullName: 'arjun',
    djName: 'arjun',
    email: 'btehrani@g.ucla.edu',
    bio:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    username: 'ishaan',
    fullName: 'ishaan',
    djName: 'ishaan',
    email: 'btehrani@g.ucla.edu',
    bio:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    username: 'rubia',
    fullName: 'rubia',
    djName: 'rubia',
    email: 'btehrani@g.ucla.edu',
    bio:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
];

/*
DJList: fetches a json list of djs from API and displays data

@prop djs: array of dj objects
@prop fetching: currently fetching objects
@prop updateDJs: callback to fetch updated dj list from server
*/
const DJList = React.createClass({
  componentDidMount() {
    this.props.updateDJs();
  },
  render() {
    const djs = this.props.djs.map(dj => (
      // const djs = allDJs.map(dj => (
      <DJInfo
        name={dj.djName || dj.fullName}
        picture={dj.picture}
        key={dj.username}
        bio={dj.bio}
      />
    ));

    return (
      <div className="djList">
        <DJSearchBar />
        {this.props.fetching && this.props.djs.length == 0 ? <Loader /> : djs}
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
