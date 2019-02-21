// DJPage.js
// shows full DJ information

import React from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'react-bootstrap';

// Common Components
import RectImage from '../../common/RectImage';

// Actions
import { fetchUpdatedDJs } from '../actions/djs';

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
class DJPage extends React.Component {
  componentWillMount() {
    if (this.props.dj == null) {
      this.props.updateDJs();
    }
  }

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
  }
}

const mapStateToProps = (state, ownProps) => {
  const props = {
    fetching: state.djs.fetching,
    // 'djs' prop set below
  };

  const djName = ownProps.params.djName;

  // set DJ if found
  for (let djIndex = 0; djIndex < state.djs.djs.length; djIndex++) {
    const dj = state.djs.djs[djIndex];
    if (dj.djName === djName) {
      props.dj = dj;
    }
  }
  return props;
};

const mapDispatchToProps = dispatch => ({
  updateDJs: () => {
    fetchUpdatedDJs(dispatch);
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DJPage);
