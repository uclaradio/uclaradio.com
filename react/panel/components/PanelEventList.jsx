// EventList.jsx

var React = require('react');

// Panel elements
var RectImage = require('../../common/RectImage.jsx');

// Boostrap elements
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var ListGroup = require('react-bootstrap').ListGroup;
var ListGroupItem = require('react-bootstrap').ListGroupItem;

/**
*  Presents a list of event objects with a standard format
*  Currently sharing the styling of ShowList.jsx
*  @prop url: url href to add '/eventID' to
*  @prop placeholder: img src to display if no image set
*  @prop events -> [{event...}]: events to list
*  @prop short: should hide description
*/
var PanelEventList = React.createClass({
  render: function() {
    var url = this.props.url;
    var placeholder = this.props.placeholder;
    var short = this.props.short;
    var events = this.props.events.map(function(event) {
      var title = <h4 className="showListTitle">{event.name} <small>{event.type}</small></h4>
      return <ListGroupItem href={url+'/'+event.id} key={event.id} className="listShow">
              {short
              ?
                title
              :
                <Grid>
                  <Row>
                    <Col xs={2} className="noPads centered">
                      <RectImage src={event.picture || placeholder} className="showListImg rectPic" thumbnail />
                    </Col>
                    <Col xs={10}>
                        {title}
                        <p className="showListSubtitle">{event.description || "Click on the event to add a description. New events are private by default"}</p>
                    </Col>
                  </Row>
                </Grid>
              }
             </ListGroupItem>
    });
    return (
      <div className="showList">
        <ListGroup>
          {events}
        </ListGroup>
      </div>
    );
  }
});

module.exports = PanelEventList;
