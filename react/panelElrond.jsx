// elrond.html
// View what is currently on Rivendell

var React = require('react');
var ReactDOM = require('react-dom');

var urls = {
  url: "/panel/api/songs"
};

// Panel Elements
var PanelLinksNavbar = require('./panel/PanelLinksNavbar.jsx');

// Boostrap Components
var Grid = require('react-bootstrap').Grid;

// Fixed Data Table
import {Table, Column, Cell} from 'fixed-data-table';

// TODO: Convert to ES6
var ElrondPage = React.createClass({
  render: function() {
    return (
      <div className="panelPage">
        <Grid>
          <PanelLinksNavbar />
          <RivendellTable />
        </Grid>
      </div>
    );
  }
});

class RivendellTable extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {
      rows : []
    };
  }
  
  componentDidMount() {
    // TODO: Obtain song data via: 
    /*
    axios.get('http://…').then(data => {
      this.setState( { name: data.blah } );
    });
    */
  }

  render() {
      return (
        <Table
          height={40+((this.state.rows.length+1) * 30)}
          width={1150}
          rowsCount={this.state.rows.length}
          rowHeight={30}
          headerHeight={30}
          rowGetter={function(rowIndex) {return this.state.rows[rowIndex]; }.bind(this)}>
          <Column dataKey="title" width={200} label="First Name" />
          <Column  dataKey="artist" width={200} label="Last Name" />
          <Column  dataKey="album" width={400} label="e-mail" />
          <Column  dataKey="groupName" width={300} label="Country" />
        </Table>
      );
  }
}


ReactDOM.render(
  <ElrondPage urls={urls} />,
  document.getElementById('content')
);
