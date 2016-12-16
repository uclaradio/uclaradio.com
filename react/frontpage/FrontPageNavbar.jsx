// FrontPageNavbar.jsx

var React = require('react');

// Bootstrap Elements
import { Nav, NavItem, Collapse } from 'react-bootstrap';

import { LinkContainer } from 'react-router-bootstrap';

/**
Navigation bar for the stream frontpage, which has collapsing rows and selectable tabs

@prop itemsPerRow: number of items to show per line
@prop items: menu items for navbar [{title: "...", url: "..."}, ...]
@prop activeItem: string key of the item that is selected
*/
var FrontPageNavbar = React.createClass({
  getInitialState: function() {
    return {open: false, activeKey: 0};
  },
  toggleOpen: function(selectedKey) {
    switch(selectedKey) {
      case 1:
        window.open("/shows", "_blank");
        break;
      // case 2:
      //   window.open("/GiveawayCalendar", "_blank");
      //   break;
      case 3:
        window.open("http://apply.dailybruin.com/applications/ucla-radio/", "_blank");
        break;
      case 4:
        this.setState({open: !this.state.open});
        break;
      case 5:
        window.open("https://uclaradio.tumblr.com/", "_blank");
        break;
      default:
        this.setState({activeKey: selectedKey});
        break;
    }
  },
  render: function() {
    return (
      <div className="frontPageNavbar">
        { /** Large devices, hidden on xs **/ }
        <Nav justified bsStyle="pills" className="hidden-xs" activeKey={this.state.activeKey} onSelect={this.toggleOpen}>
          <LinkContainer to="/beta/djs">
            <NavItem className="frontPageNavbarItem leftMost">DJs</NavItem>
          </LinkContainer>
          <NavItem eventKey={1} href="#" className="frontPageNavbarItem">SHOWS</NavItem>
          <NavItem eventKey={3} href="#" className="frontPageNavbarItem">APPLY</NavItem>
          <NavItem eventKey={5} href="#" className="frontPageNavbarItem rightMost">BLOG</NavItem>
        </Nav>

        { /** Extra Small devices, hidden on sm, md, lg **/ }
        <Nav justified bsStyle="pills" className="hidden-sm hidden-md hidden-lg" activeKey={this.state.activeKey} onSelect={this.toggleOpen}>
          <NavItem eventKey={4} href="#" className="frontPageNavbarItem fullWidth expandToggle">{this.state.open ? "LESS" : "MORE"}</NavItem>
        </Nav>
        <Collapse in={this.state.open} className="hidden-sm hidden-md hidden-lg collapsedNav">
          <Nav justified bsStyle="pills" activeKey={this.state.activeKey} onSelect={this.toggleOpen}>
            <LinkContainer to="/beta/djs">
              <NavItem className="frontPageNavbarItem fullWidth topMost">DJs</NavItem>
            </LinkContainer>
            <NavItem eventKey={1} href="#" className="frontPageNavbarItem fullWidth">SHOWS</NavItem>
            <NavItem eventKey={3} href="#" className="frontPageNavbarItem fullWidth">APPLY</NavItem>
            <NavItem eventKey={5} href="#" className="frontPageNavbarItem fullWidth">BLOG</NavItem>
          </Nav>
        </Collapse>
      </div>
    );
  }
});

module.exports = FrontPageNavbar;
