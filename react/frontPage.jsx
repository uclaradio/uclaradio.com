// frontpage.jsx
// Radio Front Page

var React = require('react');
var ReactDOM = require('react-dom');

var Theme = require('./components/misc/theme');

var FrontPage = React.createClass({
  componentDidMount: function() {
    Theme.style();
  },
  render: function() {
    return (
      <div className="frontPage">
      ayyy lmao
      </div>
    )
  }  
});

ReactDOM.render(
  <FrontPage />,
  document.getElementById('content')
);
