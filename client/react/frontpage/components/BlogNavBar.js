import React from 'react';
import { Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import './FrontPageNavbar.scss';

const BlogNavBar = React.createClass({
  getInitialState() {
    return { open: false };
  },
  handleClick(selectedKey) {
    switch (selectedKey) {
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
      case 4:
        break;
      case 5:

      case 10:
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
          onSelect={this.handleClick}
        >
          <NavItem className="frontPageNavbarItem leftMost">
            <span className="equalWidth">Comedy Reviews</span>
          </NavItem>

          <NavItem className="frontPageNavbarItem">
            <span className="equalWidth">Show Reviews</span>
          </NavItem>

          <NavItem eventKey={1} className="frontPageNavbarItem">
            <span className="equalWidth">Festival Reviews</span>
          </NavItem>
          <NavItem eventKey={10} className="frontPageNavbarItem rightMost">
            <span className="equalWidth">Sports Interviews</span>
          </NavItem>
          <NavItem eventKey={10} className="frontPageNavbarItem rightMost">
            <span className="equalWidth">Artist Interviews</span>
          </NavItem>
        </Nav>

        {/** Extra Small devices, hidden on sm, md, lg * */}
        <Nav
          justified
          bsStyle="pills"
          className="hidden-sm hidden-md hidden-lg"
          onSelect={this.handleClick}
        >
          <NavItem className="frontPageNavbarItem fullWidth topMost">
            Comedy Reviews
          </NavItem>

          <NavItem className="frontPageNavbarItem fullWidth">
            Show Reviews
          </NavItem>

          <NavItem eventKey={1} className="frontPageNavbarItem fullWidth">
            Festival Reviews
          </NavItem>
          <NavItem eventKey={1} className="frontPageNavbarItem fullWidth">
            Sports Interviews
          </NavItem>
        </Nav>
      </div>
    );
  },
});

export default BlogNavBar;
