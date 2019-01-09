import React from 'react';
import Loader from './Loader';
import { Link } from 'react-router';
import Slider from 'react-slick';
import RectImage from '../../common/RectImage';
import './PromoBanner.scss';

const BlogFeaturedPost = React.createClass({
  getInitialState: function() {
    return { posts: [], fetching: true, postNo: 0 };
  },

  render() {
    if (this.props.posts)
      return <div>haha {console.log(this.props.posts)}</div>;
  },
});

export default BlogFeaturedPost;
