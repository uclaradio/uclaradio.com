import React from 'react';
import { Dropdown } from 'react-bootstrap';
// import {  } from 'react-router-bootstrap';

const BlogNavBar = React.createClass({
  getInitialState() {
    return { open: false };
  },
  handleClick(selectedKey) {
    switch (selectedKey) {
      case 1:
        this.props.function('ConcertReview');
        console.log('here part1');

        break;
      case 2:
        this.props.function('ArtistInterview');
        break;
      case 3:
        this.props.function('Sports');
        break;

      case 4:
        this.props.function('FestivalReview');
        break;
      case 5:
        this.props.function('Other');
      case 10:
        break;
      default:
        break;
    }
  },

  render() {
    return (
      <div>
        <DropdownButton
          alignRight
          title="Dropdown right"
          id="dropdown-menu-align-right"
        >
          <Dropdown.Item eventKey="1">Action</Dropdown.Item>
          <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
          <Dropdown.Item eventKey="3">Something else here</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
        </DropdownButton>
        ;
      </div>
    );
  },
});

export default BlogNavBar;
