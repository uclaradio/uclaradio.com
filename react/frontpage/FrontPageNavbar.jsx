// FrontPageNavbar.jsx

var React = require('react');

// Bootstrap Elements
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;
var Collapse = require('react-bootstrap').Collapse;

/**
Navigation bar for the stream frontpage, which has collapsing rows and selectable tabs

@prop itemsPerRow: number of items to show per line
@prop items: menu items for navbar [{title: "...", url: "..."}, ...]
@prop activeItem: string key of the item that is selected
*/
var FrontPageNavbar = React.createClass({
  getInitialState: function() {
    return {open: false, activeKey: 1};
  },
  toggleOpen: function(selectedKey) {
    if (selectedKey === 4) {
      this.setState({open: !this.state.open});
    } else {
      this.setState({activeKey: selectedKey});
    }
  },
  render: function() {
    return (
      <div className="frontPageNavbar">
        { /** Large devices, hidden on xs **/ }
        <Nav justified bsStyle="pills" className="hidden-xs" activeKey={this.state.activeKey} onSelect={this.toggleOpen}>
          <NavItem eventKey={1} href="#" className="frontPageNavbarItem leftMost">SHOWS</NavItem>
          <NavItem eventKey={2} href="#" className="frontPageNavbarItem">DJS</NavItem>
          <NavItem eventKey={3} href="#" className="frontPageNavbarItem">EVENTS</NavItem>
          <NavItem eventKey={4} href="#" className="frontPageNavbarItem rightMost expandToggle">{this.state.open ? "LESS" : "MORE"}</NavItem>
        </Nav>
        <Collapse in={this.state.open} className="hidden-xs">
          <Nav justified bsStyle="pills" className="collapsedNav" activeKey={this.state.activeKey} onSelect={this.toggleOpen}>
            <NavItem eventKey={5} href="#" className="frontPageNavbarItem leftMost collapsed">BLOG</NavItem>
            <NavItem eventKey={6} href="#" className="frontPageNavbarItem collapsed">BLOG</NavItem>
            <NavItem eventKey={7} href="#" className="frontPageNavbarItem collapsed">BLOG</NavItem>
            <NavItem eventKey={8} href="#" className="frontPageNavbarItem collapsed">BLOG</NavItem>
            <NavItem eventKey={9} href="#" className="frontPageNavbarItem rightMost collapsed">BLOG</NavItem>
          </Nav>
        </Collapse>

        { /** Extra Small devices, hidden on sm, md, lg **/ }
        <Nav justified bsStyle="pills" className="hidden-sm hidden-md hidden-lg" activeKey={this.state.activeKey} onSelect={this.toggleOpen}>
          <NavItem eventKey={4} href="#" className="frontPageNavbarItem fullWidth expandToggle">{this.state.open ? "LESS" : "MORE"}</NavItem>
        </Nav>
        <Collapse in={this.state.open} className="hidden-sm hidden-md hidden-lg collapsedNav">
          <Nav justified bsStyle="pills" activeKey={this.state.activeKey} onSelect={this.toggleOpen}>
            <NavItem eventKey={1} href="#" className="frontPageNavbarItem fullWidth topMost">SHOWS</NavItem>
            <NavItem eventKey={2} href="#" className="frontPageNavbarItem fullWidth">DJS</NavItem>
            <NavItem eventKey={3} href="#" className="frontPageNavbarItem fullWidth">EVENTS</NavItem>
            <NavItem eventKey={5} href="#" className="frontPageNavbarItem fullWidth">BLOG</NavItem>
            <NavItem eventKey={6} href="#" className="frontPageNavbarItem fullWidth">BLOG</NavItem>
            <NavItem eventKey={7} href="#" className="frontPageNavbarItem fullWidth">BLOG</NavItem>
            <NavItem eventKey={8} href="#" className="frontPageNavbarItem fullWidth">BLOG</NavItem>
            <NavItem eventKey={9} href="#" className="frontPageNavbarItem fullWidth">BLOG</NavItem>
          </Nav>
        </Collapse>
      </div>
    );
  }
});

module.exports = FrontPageNavbar;
