// DJPage.jsx
// shows full DJ information

import React from 'react';

// Frontpage Components
import Loader from './Loader.jsx';

// Common Components
import RectImage from '../../common/RectImage.jsx';

import  { Link } from 'react-router';
import {Grid, Col, Row} from 'react-bootstrap';

var defaultDJPic = "/img/bear_transparent.png";
var defaultDJBio = " hasn't updated their bio yet, but they are pretty rad 😎"

// styling
require('./DJPage.scss');

/**
Page content for individual DJ
Displays DJ information

@prop dj: dj object
@prop fetching: currently fetching djs
@prop updateDJs: callback to update all listed djs
**/

const DJPage = React.createClass({
  componentWillMount() {
    if (this.props.dj == null) {
      this.props.updateDJs();
    }
  },
  render: function() {
    var dj = this.props.dj;
    if (!dj) {
      return(
        <div>
          <p> DJ page doesn't exist! </p>
        </div>
      );
    }

    return (
      <div class="djPage">
        <Row>
          <Col xs={12} md={4}>
            <RectImage src={ dj.picture || defaultDJPic } circle maxWidth="380px" />
          </Col>
          <Col xs={12} md={8}>
            <h2> {dj.djName} </h2>
            <h4> About </h4>
            <p> {dj.bio || dj.djName + defaultDJBio} </p>
          </Col>
        </Row>
      </div>
    );
  }
});

export default DJPage;