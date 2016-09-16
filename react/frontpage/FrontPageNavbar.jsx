// FrontPageNavbar.jsx

var React = require('react');

// Bootstrap Elements
var Navbar = require('react-bootstrap').Navbar;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;
var NavDropdown = require('react-bootstrap').NavDropdown;
var MenuItem = require('react-bootstrap').MenuItem;
var Collapse = require('react-bootstrap').Collapse;

var FrontPageNavbar = React.createClass({
  getInitialState: function() {
    return {open: false};
  },
  toggleOpen: function(selectedKey) {
    if (selectedKey === 4) {
      this.setState({open: !this.state.open});
    }
  },
  render: function() {
    return (
      <div className="frontPageNavbar">
        { /** Large devices, hidden on xs **/ }
        <Nav justified bsStyle="pills" className="hidden-xs" activeKey={1} onSelect={this.toggleOpen}>
          <NavItem eventKey={1} href="#" className="frontPageNavbarItem leftMost">SHOWS</NavItem>
          <NavItem eventKey={2} href="#" className="frontPageNavbarItem">DJS</NavItem>
          <NavItem eventKey={3} href="#" className="frontPageNavbarItem">EVENTS</NavItem>
          <NavItem eventKey={4} href="#" className="frontPageNavbarItem rightMost">MORE</NavItem>
        </Nav>
        <Collapse in={this.state.open} className="hidden-xs">
          <Nav justified bsStyle="pills" className="collapsedNav" activeKey={1} onSelect={this.toggleOpen}>
            <NavItem eventKey={5} href="#" className="frontPageNavbarItem leftMost">BLOG</NavItem>
            <NavItem eventKey={6} href="#" className="frontPageNavbarItem">BLOG</NavItem>
            <NavItem eventKey={7} href="#" className="frontPageNavbarItem">BLOG</NavItem>
            <NavItem eventKey={8} href="#" className="frontPageNavbarItem">BLOG</NavItem>
            <NavItem eventKey={9} href="#" className="frontPageNavbarItem rightMost">BLOG</NavItem>
          </Nav>
        </Collapse>

        { /** Extra Small devices, hidden on sm, md, lg **/ }
        <Nav justified bsStyle="pills" className="hidden-sm hidden-md hidden-lg" activeKey={1} onSelect={this.toggleOpen}>
          <NavItem eventKey={4} href="#" className="frontPageNavbarItem fullWidth">SHOWS</NavItem>
        </Nav>
        <Collapse in={this.state.open} className="hidden-sm hidden-md hidden-lg collapsedNav">
          <Nav justified bsStyle="pills" activeKey={1} onSelect={this.toggleOpen}>
            <NavItem eventKey={1} href="#" className="frontPageNavbarItem fullWidth topMost">SHOWS</NavItem>
            <NavItem eventKey={2} href="#" className="frontPageNavbarItem fullWidth">DJS</NavItem>
            <NavItem eventKey={3} href="#" className="frontPageNavbarItem fullWidth">EVENTS</NavItem>
            <NavItem eventKey={5} href="#" className="frontPageNavbarItem fullWidth">BLOG</NavItem>
            <NavItem eventKey={6} href="#" className="frontPageNavbarItem fullWidth">BLAG</NavItem>
          </Nav>
        </Collapse>
      </div>
    );
  }
});

module.exports = FrontPageNavbar;
