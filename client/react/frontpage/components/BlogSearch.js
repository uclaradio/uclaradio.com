import React from 'react';

export const BlogSearch = React.createClass({
  render() {
    return (
      <div className="djSearchBar">
        <input
          aria-label="Search for a DJ"
          placeholder="Search for a post by title..."
          onChange={this.props.onChange}
        />
      </div>
    );
  },
});

export default BlogSearch;
