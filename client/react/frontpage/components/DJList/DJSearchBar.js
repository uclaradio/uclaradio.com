import React from 'react';

const DJSearchBar = React.createClass({
  render() {
    return (
      <div className="djSearchBar">
        <input
          placeholder="Search for a DJ..."
          onChange={this.props.onChange}
        />
      </div>
    );
  },
});

export default DJSearchBar;
