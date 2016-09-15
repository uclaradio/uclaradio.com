// FrontPageNavbar.jsx

var React = require('react');

// Bootstrap Elements
var Navbar = require('react-bootstrap').Navbar;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;
var NavDropdown = require('react-bootstrap').NavDropdown;
var MenuItem = require('react-bootstrap').MenuItem;

var FrontPageNavbar = React.createClass({
  render: function() {
    return (
      <div className="frontPageNavbar">
        <Nav justified>
          <NavItem eventKey={1} href="#"
            className="frontPageNavbarItem">SHOWS</NavItem>
          <NavItem eventKey={2} href="#" className="frontPageNavbarItem">DJS</NavItem>
          <NavItem eventKey={4} href="#" className="frontPageNavbarItem">CALENDAR</NavItem>
          <NavDropdown eventKey={3} title="MORE" id="basic-nav-dropdown" className="frontPageNavbarItem">
            <MenuItem eventKey={3.1}>CONTACT</MenuItem>
            <MenuItem eventKey={3.2}>MEDIA</MenuItem>
            <MenuItem eventKey={3.4}>BLOG</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.3}>APPLY</MenuItem>
          </NavDropdown>
        </Nav>
      </div>
    );
  }
});

module.exports = FrontPageNavbar;
