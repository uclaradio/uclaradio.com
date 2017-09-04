// FrontPageNavbar.jsx

const React = require('react');

// Bootstrap Elements
import { Nav, NavItem, Collapse, NavDropdown, MenuItem } from 'react-bootstrap';

import { LinkContainer } from 'react-router-bootstrap';
import { browserHistory } from 'react-router';

// styling
require('./FrontPageNavbar.scss');

/**
Navigation bar for the stream frontpage, which has collapsing rows and selectable tabs
*/
const FrontPageNavbar = React.createClass({
  getInitialState() {
    return { open: false };
  },
  handleClick(selectedKey) {
    switch (selectedKey) {
      case 1:
        window.open('http://uclaradio.tumblr.com', '_blank');
        break;
      case 2:
        browserHistory.push('/streamIssues');
        break;
      case 3:
        window.open(
          'http://apply.uclastudentmedia.com/applications/ucla-radio/',
          '_blank'
        );
        break;
      case 4:
        browserHistory.push('/about');
        break;
      case 10:
        this.setState({ open: !this.state.open });
        break;
      default:
        break;
    }
  },
  render() {
    return (
      <div className="frontPageNavbar">
        {/** Large devices, hidden on xs * */}
        <Nav
          justified
          bsStyle="pills"
          className="hidden-xs"
          onSelect={this.handleClick}>
          <LinkContainer to="/djs">
            <NavItem className="frontPageNavbarItem leftMost">
              <span className="equalWidth">DJs</span>
            </NavItem>
          </LinkContainer>
          <LinkContainer to="/shows">
            <NavItem className="frontPageNavbarItem">
              <span className="equalWidth">Shows</span>
            </NavItem>
          </LinkContainer>
          <LinkContainer to="/events">
            <NavItem className="frontPageNavbarItem">
              <span className="equalWidth">Events</span>
            </NavItem>
          </LinkContainer>
          <NavItem eventKey={10} className="frontPageNavbarItem rightMost">
            <span className="equalWidth">
              {this.state.open ? 'Less' : 'More'}
            </span>
          </NavItem>
        </Nav>
        <Collapse in={this.state.open} className="hidden-xs">
          <Nav justified bsStyle="pills" onSelect={this.handleClick}>
            <LinkContainer to="/about">
              <NavItem className="frontPageNavbarItem leftMost collapsed">
                <span className="equalWidth">About</span>
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/streamIssues">
              <NavItem className="frontPageNavbarItem collapsed">
                <span className="equalWidth">Stream</span>
              </NavItem>
            </LinkContainer>
            <NavItem eventKey={1} className="frontPageNavbarItem collapsed">
              <span className="equalWidth">Blog</span>
            </NavItem>
            <NavItem
              eventKey={3}
              className="frontPageNavbarItem rightMost collapsed">
              <span className="equalWidth">Apply</span>
            </NavItem>
          </Nav>
        </Collapse>

        {/** Extra Small devices, hidden on sm, md, lg * */}
        <Nav
          justified
          bsStyle="pills"
          className="hidden-sm hidden-md hidden-lg"
          onSelect={this.handleClick}>
          <LinkContainer to="/djs">
            <NavItem className="frontPageNavbarItem fullWidth topMost">
              DJs
            </NavItem>
          </LinkContainer>
          <LinkContainer to="/shows">
            <NavItem className="frontPageNavbarItem fullWidth">Shows</NavItem>
          </LinkContainer>
          <LinkContainer to="/events">
            <NavItem className="frontPageNavbarItem fullWidth">Events</NavItem>
          </LinkContainer>
          <NavDropdown
            title="More"
            className="frontPageNavbarItem fullWidth bottomMost">
            <MenuItem
              className="dropdownNavbarItem"
              onClick={() => {
                this.handleClick(4);
              }}>
              About
            </MenuItem>
            <MenuItem
              className="dropdownNavbarItem"
              onClick={() => {
                this.handleClick(2);
              }}>
              Stream Issues
            </MenuItem>
            <MenuItem
              className="dropdownNavbarItem"
              onClick={() => {
                this.handleClick(1);
              }}>
              Blog
            </MenuItem>
            <MenuItem
              className="dropdownNavbarItem"
              onClick={() => {
                this.handleClick(3);
              }}>
              Apply
            </MenuItem>
          </NavDropdown>
        </Nav>
      </div>
    );
  },
});

module.exports = FrontPageNavbar;
