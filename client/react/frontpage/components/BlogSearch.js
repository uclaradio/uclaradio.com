import React from 'react';

export const BlogSearch = React.createClass({
  render() {
    return (
      <div className="blogSearchBar">
        <input
          aria-label="Search for a DJ"
          placeholder="Search for a post by title or author..."
          onChange={this.props.onChange}
        />
      </div>
    );
  },
});

export default BlogSearch;
