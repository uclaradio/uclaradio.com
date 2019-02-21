// PanelLinksNavbar.js

import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

const linksURL = '/panel/api/userlinks';

/**
 *  Navbar which loads links available to the current user logged
 *  into the DJ panel
 */
class PanelLinksNavbar extends React.Component {
  state = { links: [] };

  loadDataFromServer = () => {
    $.ajax({
      url: linksURL,
      dataType: 'json',
      cache: false,
      success: function(o) {
        this.setState({ links: o.links, loggedin: o.loggedin });
      }.bind(this),
      error(xhr, status, err) {
        console.error(linksURL, status, err.toString());
      },
    });
  };

  // provided a node element and a link, this function will wrap
  // a span with class 'navbarSelected' around the element
  // if the provided link is the same as the current path ('/panel/...')
  styleLink = (element, link) => {
    if (link === window.location.pathname) {
      return <span className="navbarSelected">{element}</span>;
    }
    return element;
  };

  componentDidMount() {
    this.loadDataFromServer();
  }

  render() {
    const styleLink = this.styleLink;
    const links = this.state.links.map((link, i) => (
      <NavItem eventKey={i} key={i} href={link.link}>
        {styleLink(link.title, link.link)}
      </NavItem>
    ));
    return (
      <div className="panelLinksNavbar">
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="/panel/home">
                {styleLink('Secret DJ Panel', '/panel/home')}
              </a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>{links}</Nav>
            {this.state.loggedin ? (
              <Nav pullRight>
                <NavItem id="navbarLogout" eventKey={1} href="/panel/logout">
                  Log Out
                </NavItem>
              </Nav>
            ) : (
              ''
            )}
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default PanelLinksNavbar;
