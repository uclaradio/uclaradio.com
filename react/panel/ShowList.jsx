// ShowList.jsx

import React from 'react';
import { Grid, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';

import RectImage from '../common/RectImage.jsx';
import Dates from '../common/Dates';

// Panel elements

/**
*  Presents a list of show objects with a standard format
*
*  @prop url: url href to add '/showID' to
*  @prop placeholder: img src to display if no image set
*  @prop shows -> [{show...}]: shows to list
*  @prop short: should hide description
*/
const ShowList = React.createClass({
  render() {
    const url = this.props.url;
    const placeholder = this.props.placeholder;
    const short = this.props.short;
    const shows = this.props.shows.map(show => {
      const title = (
        <h4 className="showListTitle">
          {show.title}{' '}
          <small>
            ({Dates.dayFromVar(show.day)} {show.time})
          </small>
        </h4>
      );
      return (
        <ListGroupItem
          href={`${url}/${show.id}`}
          key={show.id}
          className="listShow">
          {short ? (
            title
          ) : (
            <Grid>
              <Row>
                <Col xs={2} className="noPads centered">
                  <RectImage
                    src={show.picture || placeholder}
                    className="showListImg rectPic"
                    thumbnail
                  />
                </Col>
                <Col xs={10}>
                  {title}
                  <p className="showListSubtitle">{show.blurb}</p>
                </Col>
              </Row>
            </Grid>
          )}
        </ListGroupItem>
      );
    });
    return (
      <div className="showList">
        <ListGroup>{shows}</ListGroup>
      </div>
    );
  },
});

module.exports = ShowList;
