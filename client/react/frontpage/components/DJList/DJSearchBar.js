import React from 'react';

class DJSearchBar extends React.Component {
  render() {
    return (
      <div className="djSearchBar">
        <input
          aria-label="Search for a DJ"
          placeholder="Search for a DJ..."
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}

export default DJSearchBar;
