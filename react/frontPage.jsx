// frontpage.jsx
// Radio Front Page

var React = require('react');
var ReactDOM = require('react-dom');
var TriangleCanvas = require('./components/TriangleCanvas.jsx');

var theme = require('./components/misc/theme');

var FrontPage = React.createClass({
  render: function() {
    return (
      <div className="frontPage">
        <TriangleCanvas xColors={theme.timezoneColorScheme()}>
          <div class="container" id="main">
            <div className="frontPage">
            <p>ayyy lmao</p>
            <p>ayyy lmao</p>
            <p>ayyy lmao</p>
            <p>ayyy lmao</p>
            <p>ayyy lmao</p>
            <p>ayyy lmao</p>
            <p>ayyy lmao</p>
            <p>ayyy lmao</p>
            <p>ayyy lmao</p>
            <p>ayyy lmao</p>
            <p>ayyy lmao</p>
            <p>ayyy lmao</p>
            <p>ayyy lmao</p>
            <p>ayyy lmao</p>
            <p>ayyy lmao</p>
            <p>ayyy lmao</p>
            <p>ayyy lmao</p>
            <p>ayyy lmao</p>
            <p>ayyy lmao</p>
            <p>ayyy lmao</p>
            <p>ayyy lmao</p>
            <p>ayyy lmao</p>
            <p>ayyy lmao</p>
            <p>ayyy lmao</p>
            <p>ayyy lmao</p>
            <p>ayyy lmao</p>
            <p>ayyy lmao</p>
            <p>ayyy lmao</p>
            <p>ayyy lmao</p>
            <p>ayyy lmao</p>
            <p>ayyy lmao</p>
            <p>ayyy lmao</p>
            <p>ayyy lmao</p>
            <p>ayyy lmao</p>
            <p>ayyy lmao</p>
            <p>ayyy lmao</p>
            <p>ayyy lmao</p>
            <p>ayyy lmao</p>
            <p>ayyy lmao</p>
            <p>ayyy lmao</p>
            <p>ayyy lmao</p>
            <p>ayyy lmao</p>
            <p>ayyy lmao</p>
            <p>ayyy lmao</p>
            <p>ayyy lmao</p>
            <p>ayyy lmao</p>
            <p>ayyy lmao</p>
            <p>ayyy lmao</p>
            <p>ayyy lmao</p>
            <p>ayyy lmao</p>
            <p>ayyy lmao</p>
            <p>ayyy lmao</p>
            <p>ayyy lmao</p>
            <p>ayyy lmao</p>
            <p>ayyy lmao</p>
            <p>ayyy lmao</p>
            <p>ayyy lmao</p>

            </div>
          </div>
        </TriangleCanvas>
      </div>
    )
  }  
});

ReactDOM.render(
  <FrontPage />,
  document.getElementById('content')
);
