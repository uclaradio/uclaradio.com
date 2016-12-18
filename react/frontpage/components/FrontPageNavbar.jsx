// FrontPageNavbar.jsx

var React = require('react');

// Bootstrap Elements
import { Nav, NavItem, Collapse } from 'react-bootstrap';

import { LinkContainer } from 'react-router-bootstrap';

// styling
require('./FrontPageNavbar.scss');

/**
Navigation bar for the stream frontpage, which has collapsing rows and selectable tabs
*/
var FrontPageNavbar = React.createClass({
  getInitialState: function() {
    return {open: false};
  },
  toggleOpen: function(selectedKey) {
    switch(selectedKey) {
      // case 1:
      //   window.open("/shows", "_blank");
      //   break;
      // Actions to implement in the future
      // case 2:
      //   window.open("/GiveawayCalendar", "_blank");
      //   break;
      // case 3:
      //   window.open("http://apply.dailybruin.com/applications/ucla-radio/", "_blank");
      //   break;
      case 4:
        this.setState({open: !this.state.open});
        break;
      case 5:
        window.open("https://uclaradio.tumblr.com/", "_blank");
        break;
      default:
        break;
    }
  },
  render: function() {
    return (
      <div className="frontPageNavbar">
        { /** Large devices, hidden on xs **/ }
        <Nav justified bsStyle="pills" className="hidden-xs" onSelect={this.toggleOpen}>
          <LinkContainer to="/beta/djs">
            <NavItem className="frontPageNavbarItem leftMost">DJs</NavItem>
          </LinkContainer>
          <LinkContainer to="/beta/events">
            <NavItem className="frontPageNavbarItem">Events</NavItem>
          </LinkContainer>
          <LinkContainer to="/beta/shows">
            <NavItem className="frontPageNavbarItem">Shows</NavItem>
          </LinkContainer>
          <NavItem eventKey={5} href="#" className="frontPageNavbarItem rightMost">Blog</NavItem>
        </Nav>

        { /** Extra Small devices, hidden on sm, md, lg **/ }
        <Nav justified bsStyle="pills" className="hidden-sm hidden-md hidden-lg" onSelect={this.toggleOpen}>
          <NavItem eventKey={4} href="#" className="frontPageNavbarItem fullWidth expandToggle">{this.state.open ? "Less" : "More"}</NavItem>
        </Nav>
        <Collapse in={this.state.open} className="hidden-sm hidden-md hidden-lg collapsedNav">
          <Nav justified bsStyle="pills" onSelect={this.toggleOpen}>
            <LinkContainer to="/beta/djs">
              <NavItem className="frontPageNavbarItem fullWidth topMost">DJs</NavItem>
            </LinkContainer>
            <LinkContainer to="/beta/events">
              <NavItem className="frontPageNavbarItem fullWidth">Events</NavItem>
            </LinkContainer>
            <LinkContainer to="/beta/shows">
              <NavItem className="frontPageNavbarItem fullWidth">Shows</NavItem>
            </LinkContainer>
            <NavItem eventKey={5} href="#" className="frontPageNavbarItem fullWidth">Blog</NavItem>
          </Nav>
        </Collapse>
      </div>
    );
  }
});

module.exports = FrontPageNavbar;
