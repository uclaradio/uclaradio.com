import React from 'react';
import { Link } from 'react-router';
import ReactPaginate from 'react-paginate';

import Loader from './Loader';
// import Pagination from './Pagination';

import './GalleryPage.scss';

const PhotosURL = 'http://localhost:3010/api/photos/list';
const POSTS_PER_PAGE = 9;

const GalleryPage = React.createClass({
  getInitialState: function() {
    return {
      photos: [],
      selected: [],
      fetching: true,
      max_pages: 0,
    };
  },

  componentDidMount() {
    $.get(PhotosURL, result => {
      console.log('result: ', result);
      const data = result.collections;
      let sel = data.slice(0, POSTS_PER_PAGE);
      this.setState({
        photos: data,
        selected: sel,
        fetching: false,
        max_pages: data.length / POSTS_PER_PAGE,
      });
    });
  },

  handlePageClick(data) {
    let offset = data.selected;
    let index = offset * POSTS_PER_PAGE;
    let new_photos = this.state.photos.slice(index, index + POSTS_PER_PAGE);
    this.setState({
      selected: new_photos,
    });
  },

  render() {
    if (this.state.fetching) {
      return (
        <div className="blogPage">
          {this.state.fetching ? <Loader /> : 'No photos!'}
        </div>
      );
    }

    const photos = this.state.selected;
    const mapped_photos = photos.map((photo, index) => {
      let cn = 'gallery__photo';
      if (index === 2) {
        cn = 'gallery__photo_big';
      }
      return (
        <Link
          to={'/gallery/' + photo._id}
          className="gallery__link"
          key={photo._id}
        >
          <img src={photo.img.url} className={cn} />
        </Link>
      );
    });

    return (
      <div>
        <div>
          <p className="gallery__header">Gallery</p>
        </div>
        <div className="gallery-top">{mapped_photos.slice(0, 5)}</div>
        <div className="gallery-general">{mapped_photos.slice(5)}</div>
        <ReactPaginate
          pageCount={this.state.max_pages}
          pageRangeDisplayed={3}
          marginPagesDisplayed={1}
          onPageChange={this.handlePageClick}
        />
      </div>
    );
  },
});

export default GalleryPage;
