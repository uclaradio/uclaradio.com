import React from 'react';

const DJSearchBar = React.createClass({
  render() {
    return (
      <div className="djSearchBar">
        <form>
          <input
            placeholder="Search for a DJ..."
            onChange={this.props.onChange}
          />
        </form>
      </div>
    );
  },
});

export default DJSearchBar;
