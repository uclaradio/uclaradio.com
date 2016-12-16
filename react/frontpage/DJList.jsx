// DJList.jsx

var React = require('react');

var DJInfo = require('./DJInfo.jsx');

var DJUrl = "/api/djs";

/*
DJList: fetches a json list of djs from API and displays data
*/
var DJList = React.createClass({
  getInitialState: function() {
    return {
      djs: []
    };
  },
  componentWillMount: function() {
    this.serverRequest = $.get(DJUrl, function(result) {
      this.setState({
        djs:result.djs
      });
    }.bind(this));
  }, 
  render: function() {
    var djs = this.state.djs.map(function(dj){
      return <DJInfo name={dj.djName ? dj.djName : dj.fullName} picture={dj.picture} key={dj.username} />
    });

    return (
      <div className="djList">
        {djs}
      </div>
    );
  } 
});

module.exports = DJList;
