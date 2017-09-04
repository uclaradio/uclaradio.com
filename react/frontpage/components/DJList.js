// DJList.js

import React from 'react';

import DJInfo from './DJInfo';
import Loader from './Loader';

require('./DJList.scss');

const DJUrl = '/api/djs';

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
      <DJInfo
        name={dj.djName || dj.fullName}
        picture={dj.picture}
        key={dj.username}
      />
    ));

    return (
      <div className="djList">
        {this.props.fetching && this.props.djs.length == 0 ? <Loader /> : djs}
      </div>
    );
  },
});

module.exports = DJList;
