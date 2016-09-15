// StreamBar.jsx

var React = require('react');

var StreamBar = React.createClass({
  render: function() {
    return (
      <div className="streamBar">
        ▶ <span style={{paddingLeft: 10}}>Now playing...</span>
      </div>
    );
  }
});

module.exports = StreamBar;
