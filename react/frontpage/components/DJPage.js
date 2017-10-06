// DJPage.js
// shows full DJ information

import React from 'react';
import { Col, Row } from 'react-bootstrap';

// Common Components
import RectImage from '../../common/RectImage';

const defaultDJPic = '/img/bear_transparent.png';
const defaultDJBio =
  " hasn't updated their bio yet, but they are pretty rad 😎";

// styling

/**
Page content for individual DJ
Displays DJ information

@prop dj: dj object
@prop fetching: currently fetching djs
@prop updateDJs: callback to update all listed djs
* */
const DJPage = React.createClass({
  componentWillMount() {
    if (this.props.dj == null) {
      this.props.updateDJs();
    }
  },
  render() {
    const dj = this.props.dj;
    if (!dj) {
      return (
        <div className="djPage">
          <h3 className="center">No DJ Page Found!</h3>
        </div>
      );
    }

    return (
      <div className="djPage">
        <Row>
          <Col xs={12} md={4}>
            <RectImage
              src={dj.picture || defaultDJPic}
              circle
              maxWidth="380px"
            />
          </Col>
          <Col xs={12} md={8}>
            <h2> {dj.djName} </h2>
            <h4> About </h4>
            <p> {dj.bio || dj.djName + defaultDJBio} </p>
          </Col>
        </Row>
      </div>
    );
  },
});

export default DJPage;
