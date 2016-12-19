// DJList.jsx

var React = require('react');

var DJInfo = require('./DJInfo.jsx');

var DJUrl = "/api/djs";

/*
DJList: fetches a json list of djs from API and displays data

@prop djs: array of dj objects
@prop updateDJs: callback to fetch updated dj list from server
*/
var DJList = React.createClass({
  componentWillMount: function() {
    this.props.updateDJs();
  }, 
  render: function() {
    console.log("save us dj?", this.props.djs);
    var djs = this.props.djs.map(function(dj) {
      return <DJInfo
        name={dj.djName || dj.fullName}
        picture={dj.picture}
        key={dj.username} />
    });

    return (
      <div className="djList">
        {djs}
      </div>
    );
  } 
});

module.exports = DJList;
