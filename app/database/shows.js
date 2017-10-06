// shows.js
// Data model for radio shows

// connect to database
const db = require('./db');

// user accounts
const accounts = require('./accounts');

const mongoose = require('mongoose');
const fs = require('fs');

const shows = {};

// Radio shows to show on the site
const ShowSchema = new mongoose.Schema({
  title: String,
  id: Number, // unique identifier
  day: String, // Mon / Tue / Wed / Thu / Fri / Sat / Sun
  time: String,
  djs: [String], // collection of username strings
  genre: String,
  blurb: String, // show description
  picture: String, // relative url to image file
  thumbnail: String,
  public: Boolean,
  facebook: String,
  tumblr: String,
  soundcloud: String,
  mixcloud: String,
});
ShowSchema.index({ id: 1 });
const ShowModel = mongoose.model('shows', ShowSchema);

shows.webSafeShow = function(show) {
  return {
    title: show.title,
    id: show.id,
    day: show.day,
    time: show.time,
    djs: show.djs,
    genre: show.genre,
    blurb: show.blurb,
    picture: show.picture,
    thumbnail: show.thumbnail,
    public: show.public,
    facebook: show.facebook,
    tumblr: show.tumblr,
    soundcloud: show.soundcloud,
    mixcloud: show.mixcloud,
  };
};

/** *** Shows **** */

// create a new show with the given data
shows.addNewShow = function(title, day, time, djs, callback) {
  db.getNextAvailableId(db.showIdKey, nextId => {
    console.log('nextId: ', nextId);
    newData = {
      title,
      id: nextId,
      day,
      time,
      djs,
      public: true,
    };

    // Searches for a show with the same title.
    ShowModel.findOne({ public: true, title: newData.title }, (err, o) => {
      if (o) {
        callback('title-taken');
      } else {
        ShowModel.findOne(
          { public: true, day: newData.day, time: newData.time },
          (err, o) => {
            if (o) {
              callback('time-taken');
            } else {
              const newShow = new ShowModel(newData);
              newShow.save((err, saved) => {
                callback(err, saved);
                if (saved) {
                  db.setLastTakenId(db.showIdKey, nextId, err => {
                    if (err) {
                      console.log('error setting next id for shows: ', err);
                    }
                  });
                }
              });
            }
          }
        );
      }
    });
  });
};

shows.updateShow = function(id, newData, callback) {
  const update = function() {
    ShowModel.findOneAndUpdate(
      { id },
      newData,
      { upsert: false, new: true },
      (err, o) => {
        if (err) {
          callback(err);
        } else {
          callback(null, shows.webSafeShow(o));
        }
      }
    );
  };
  ShowModel.findOne({ id }, (err, o) => {
    if (o) {
      if (o.picture !== newData.picture) {
        const path = require('path');
        fs.unlink(path.resolve(`public${o.picture}`), () => {
          update();
        });
      } else {
        update();
      }
    } else {
      callback(err);
    }
  });
};

shows.addUser = function(id, username, callback) {
  ShowModel.findOneAndUpdate(
    { id },
    { $push: { djs: username } },
    { new: true },
    (err, o) => {
      if (err) {
        callback(err);
      } else {
        callback(null, shows.webSafeShow(o));
      }
    }
  );
};

shows.getShowsForUser = function(djUsername, callback) {
  ShowModel.find({ djs: djUsername }, (err, res) => {
    if (err) {
      callback(err);
    } else {
      callback(null, res);
    }
  });
};

shows.userHasAccessToShow = function(username, id, callback) {
  accounts.isManager(username, (err, isManager) => {
    ShowModel.findOne({ id, djs: username }, (err, o) => {
      if (isManager || o) {
        callback(true);
      } else {
        callback(false);
      }
    });
  });
};

// shows.getShow = function(id, callback) {
//   ShowModel.findOne({id: id}, function(err, o) {
//     callback(err, o);
//   });
// };

shows.getShowByTitle = function(title, callback) {
  ShowModel.findOne({ title }, (err, o) => {
    if (o) {
      o._id = null;
      callback(err, shows.webSafeShow(o));
    } else {
      callback(err);
    }
  });
};

shows.getShowById = function(id, callback) {
  ShowModel.findOne({ id }, (err, o) => {
    if (err || o == null) {
      callback(err);
      return;
    }
    const show = shows.webSafeShow(o);
    callback(err, show);
  });
};

shows.getDJMappedShow = function(id, callback) {
  ShowModel.findOne({ id }, (err, o) => {
    if (err || o == null) {
      callback(err);
      return;
    }

    const usernames = [];
    o.djs.map(dj => {
      usernames.push(dj);
    });
    accounts.getDJNameMap(usernames, (err, nameMap) => {
      const show = shows.webSafeShow(o);
      show.djs = nameMap;
      callback(err, show);
    });
  });
};

// get all public shows with user data too (name, picture, djs)
shows.getAllShows = function(callback) {
  ShowModel.find({ public: true }, (err, allShows) => {
    if (err) {
      callback(err);
    } else {
      const usernames = [];
      allShows.map(show => {
        show.djs.map(dj => {
          usernames.push(dj);
        });
      });
      accounts.getDJNameMap(usernames, (err, nameMap) => {
        for (let s = 0; s < allShows.length; s++) {
          const show = shows.webSafeShow(allShows[s]);
          var djList = {};
          show.djs.map(dj => {
            djList[dj] = nameMap[dj];
          });
          show.djs = djList;
          allShows[s] = show;
        }
        callback(null, allShows);
      });
    }
  });
};

// get all shows marked as public
shows.getAllPublicShows = function(callback) {
  ShowModel.find({ public: true }, (err, allShows) => {
    const response = [];
    for (let s = 0; s < allShows.length; s++) {
      response.push(shows.webSafeShow(allShows[s]));
    }
    callback(err, response);
  });
};

shows.removeShow = function(id, callback) {
  ShowModel.remove({ id }, e => {
    callback(e);
  });
};

// show for timeslot: used for currently playing show
shows.getShowByTimeslotAndDay = function(time, day, callback) {
  ShowModel.findOne({ time, day }, (err, show) => {
    if (err || show == null) {
      callback(err);
    } else {
      // usernames: show.djs
      accounts.getDJNameMap(show.djs, (err, nameMap) => {
        const safeShow = shows.webSafeShow(show);
        const djList = {};
        show.djs.map(dj => {
          djList[dj] = nameMap[dj];
        });
        safeShow.djs = djList;
        callback(null, safeShow);
      });
    }
  });
};

module.exports = shows;
