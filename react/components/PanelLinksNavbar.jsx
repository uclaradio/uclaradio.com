// PanelLinksNavbar.jsx

var React = require('react');

// Bootstrap elements
var Navbar = require('react-bootstrap').Navbar;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;

var linksURL = "/panel/api/userlinks";

/**
*  Navbar which loads links available to the current user logged
*  into the DJ panel
*/
var PanelLinksNavbar = React.createClass({
  getInitialState: function() {
    return {links: []};
  },
  loadDataFromServer: function() {
    $.ajax({
      url: linksURL,
      dataType: 'json',
      cache: false,
      success: function(links) {
        this.setState({links: links});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(linksURL, status, err.toString());
      }.bind(this)
    });
  },
  componentDidMount: function() {
    this.loadDataFromServer();
  },
  render: function() {
    var links = this.state.links.map(function(link, i) {
      return (
        <NavItem eventKey={i} key={link.link} href={link.link}>{link.title}</NavItem>
      );
    });
    return (
      <div className="panelLinksNavbar">
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/panel/home">DJ Panel</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              {links}
            </Nav>
            <Nav pullRight>
              <NavItem id="navbarLogout" eventKey={1} href="/panel/logout">Log Out</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
});

module.exports = PanelLinksNavbar;
