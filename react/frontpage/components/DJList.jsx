// DJList.jsx

import React from 'react';

import DJInfo from './DJInfo.jsx';
import Loader from './Loader.jsx';

require('./DJList.scss');

var DJUrl = "/api/djs";

/*
DJList: fetches a json list of djs from API and displays data

@prop djs: array of dj objects
@prop fetching: currently fetching objects
@prop updateDJs: callback to fetch updated dj list from server
*/
var DJList = React.createClass({
  componentDidMount: function() {
    this.props.updateDJs();
  }, 
  render: function() {
    var djs = this.props.djs.map(function(dj) {
      return <DJInfo
        name={dj.djName || dj.fullName}
        picture={dj.picture}
        key={dj.username} />
    });

    return (
      <div className="djList">
        { this.props.fetching && this.props.djs.length == 0 ?
          <Loader />
        :
          djs
        }
      </div>
    );
  } 
});

module.exports = DJList;
