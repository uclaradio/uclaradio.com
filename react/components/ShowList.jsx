// ShowList.jsx

var React = require('react');

// Helper files
var Dates = require('./misc/Dates.js');

// Boostrap elements
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var ListGroup = require('react-bootstrap').ListGroup;
var ListGroupItem = require('react-bootstrap').ListGroupItem;

// Custom elements
var SquareImage = require('./SquareImage.jsx');

/**
*  Presents a list of show objects with a standard format
*
*  @prop url: url href to add '/showID' to
*  @prop placeholder: img src to display if no image set
*  @prop shows -> [{show...}]: shows to list
*  @prop short: should hide description
*/
var ShowList = React.createClass({
  render: function() {
    var url = this.props.url;
    var placeholder = this.props.placeholder;
    var short = this.props.short;
    var shows = this.props.shows.map(function(show) {
      var title = <h4 className="showListTitle">{show.title} <small>({Dates.dayFromVar(show.day)} {show.time})</small></h4>
      return <ListGroupItem href={url+'/'+show.id} key={show.id} className="listShow">
              {short
              ?
                title
              :
                <Grid>
                  <Row>
                    <Col xs={2} className="noPads centered">
                      <SquareImage src={show.picture || placeholder} className="showListImg squarePic" thumbnail />
                    </Col>
                    <Col xs={10}>
                        {title}
                        <p className="showListSubtitle">{show.blurb}</p>
                    </Col>
                  </Row>
                </Grid>
              }
             </ListGroupItem>
    });
    return (
      <div className="showList">
        <ListGroup>
          {shows}
        </ListGroup>
      </div>
    );
  }
});

module.exports = ShowList;
