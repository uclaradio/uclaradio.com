// DJList.js

import React from 'react';
import { connect } from 'react-redux';
import './DJList.scss';

import DJInfo from './DJInfo';
import DJSearchBar from './DJSearchBar';
import DJCurrentShow from './DJCurrentShow';
import Loader from '../Loader';

import {
  updateDJs,
  updateCurrentShow,
  startFetching,
  stopFetching,
  fetchUpdatedDJs,
  fetchCurrentShow,
} from '../../actions/djs';

const defaultDJPic = '/img/bear_transparent.png';

/*
DJList: fetches a json list of djs from API and displays data

@prop djs: array of dj objects
@prop fetching: currently fetching objects
@prop updateDJs: callback to fetch updated dj list from server
*/
const DJList = React.createClass({
  getInitialState() {
    return {
      displayedDJs: this.props.djs,
    };
  },

  componentDidMount() {
    this.props.updateDJs();
    this.props.updateCurrentShow();
  },

  getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.djs.length !== prevState.displayedDJs.length) {
      return {
        displayedDJs: nextProps.djs,
      };
    }
    return null;
  },

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.djs.length !== this.props.djs.length) {
      this.setState({
        displayedDJs: this.props.djs,
      });
    }
  },

  handleSearch(input) {
    const searchQuery = input.target.value.toLowerCase();
    const DJs = this.props.djs.filter(el => {
      let searchValue;

      if (el.djName) {
        searchValue = el.djName.toLowerCase();
      } else {
        searchValue = el.fullName.toLowerCase();
      }

      return searchValue.indexOf(searchQuery) !== -1;
    });

    this.setState({
      displayedDJs: DJs,
    });
  },

  render() {
    const djs = [];

    const currentDJ = {
      picture: defaultDJPic,
      name:
        this.props.currentShow.djs == null
          ? ''
          : this.props.currentShow.djs[
              Object.keys(this.props.currentShow.djs)[0]
            ],
      show: this.props.currentShow.title,
      showtime: `${this.props.currentShow.day} ${this.props.currentShow.time}`,
      bio: "This DJ doesn't have a bio yet!",
    };

    this.state.displayedDJs.forEach(dj => {
      let displayedBio;

      if (dj.bio) {
        if (dj.bio.length > 200) {
          displayedBio = 'This DJ has a lengthier bio. Click to see more!';
        } else {
          displayedBio = dj.bio;
        }
      }

      if (dj.djName !== currentDJ.name) {
        djs.push(
          <DJInfo
            name={dj.djName || dj.fullName}
            picture={dj.picture}
            key={dj.username}
            bio={displayedBio || "This DJ doesn't have a bio yet!"}
          />
        );
      } else {
        if (dj.picture) {
          currentDJ.picture = dj.picture;
        }
        if (dj.bio) {
          currentDJ.bio = displayedBio;
        }
      }
    });

    return (
      <div className="djList">
        {this.props.currentShow.status !== null &&
        this.props.currentShow.status === 'no show playing' ? (
          <p />
        ) : (
          <DJCurrentShow currentDJ={currentDJ} />
        )}
        <DJSearchBar onChange={this.handleSearch} />
        {this.props.fetching ? <Loader /> : djs}
      </div>
    );
  },
});

const mapStateToProps = state => ({
  djs: state.djs.djs,
  fetching: state.djs.fetching,
  currentShow: state.djs.currentShow,
});

const mapDispatchToProps = dispatch => ({
  updateDJs: () => {
    fetchUpdatedDJs(dispatch);
  },
  updateCurrentShow: () => {
    fetchCurrentShow(dispatch);
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DJList);
