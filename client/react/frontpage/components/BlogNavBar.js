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
        this.props.handleNavbarChange('ConcertReview');
        console.log('here part1');

        break;
      case 2:
        this.props.handleNavbarChange('ArtistInterview');
        break;
      case 3:
        this.props.handleNavbarChange('Sports');
        break;

      case 4:
        this.props.handleNavbarChange('FestivalReview');
        break;
      case 5:
        this.props.handleNavbarChange('Other');
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
          <NavItem eventKey={1} className="frontPageNavbarItem">
            <span className="equalWidth">Show Reviews</span>
          </NavItem>

          <NavItem eventKey={2} className="frontPageNavbarItem">
            <span className="equalWidth">Artist Interviews</span>
          </NavItem>
          <NavItem eventKey={3} className="frontPageNavbarItem rightMost">
            <span className="equalWidth">Sports Interviews</span>
          </NavItem>
          <NavItem eventKey={4} className="frontPageNavbarItem rightMost">
            <span className="equalWidth">Festival Reviews</span>
          </NavItem>
          {/* <NavItem eventKey={5} className="frontPageNavbarItem leftMost">
            <span className="equalWidth">Other Delights</span>
          </NavItem> */}
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
