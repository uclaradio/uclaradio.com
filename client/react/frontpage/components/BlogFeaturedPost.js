import React from 'react';
import Loader from './Loader';
import { Link } from 'react-router';
import Slider from 'react-slick';
import RectImage from '../../common/RectImage';
import ReactHtmlParser, {
  processNodes,
  convertNodeToElement,
  htmlparser2,
} from 'react-html-parser';
import './PromoBanner.scss';

function transform(node) {
  // do not render any <span> tags
  if (node.type === 'tag' && node.name === 'img') {
    return convertNodeToElement(node);
  }
}

const BlogFeaturedPost = React.createClass({
  getInitialState: function() {
    return { posts: [], fetching: true, postNo: 0 };
  },

  getImage(banner) {
    var el = document.createElement('html');
    el.innerHTML = banner.body;
    var imgsrc = el.getElementsByTagName('img');
    var imgsrc2;

    if (imgsrc[0]) {
      imgsrc2 = imgsrc[0].src;
    } else {
      imgsrc2 = 'haha';
    }

    console.log(imgsrc2);

    return (
      <div className="ugh">
        <img src={imgsrc2} />
        <h1>{banner.title}</h1>
      </div>
    );
  },

  render() {
    if (!this.props.posts) return <div>haha</div>;
    const settings = {
      autoplay: true,
      infinite: true,
      fade: true,
      autoplaySpeed: 500000000,
      draggable: false,
    };

    const self = this;
    const posts = this.props.posts.map(post => (
      <div>
        {post.post_url.indexOf('http') == -1 ? (
          <Link to={post.post_url}>{self.getImage(post)}</Link>
        ) : (
          <a href={post.post_url}>{self.getImage(post)}</a>
        )}
      </div>
    ));

    return (
      <div className="promoBanner">
        {posts.length > 0 && <Slider {...settings}>{posts}</Slider>}
      </div>
    );
  },
});

export default BlogFeaturedPost;
