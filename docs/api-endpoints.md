# API Endpoints

Below are our urls for our RESTful API, with objects being updated as they are passed back and forth. All parameters passed back and forth are json objects with stringified values.

Confused about any of the documentation? You can read the code itself at [`routes/api.js`](https://github.com/uclaradio/uclaradio/blob/master/routes/api.js) and [`routes/panel.js`](https://github.com/uclaradio/uclaradio/blob/master/routes/panel.js).

## Public Routes

Public routes that we use for our cool iOS app and our internal panel. Anyone can access these, so you can make something with our API if you want to!

#### `/api/schedule` (GET)
Get a list of all shows in the current schedule
```
{
  shows: [show1, show2, ...]
}
```

#### `/api/nowplaying` (GET)
Get the current show object
```
{
  show: show1
}
```

#### `/api/djs` (GET)
Get a list of all djs with their information public
```
{
  djs: [dj1, dj2, ...]
}
```

#### `/api/dj/:id` (GET)
Get a list of related objects for a dj (shows they host) also used by web panel
```
{
  shows: [show2, show9]
}
```

#### `/api/show/:id` (GET)
Get show object with the given id (episodes, social media) also used by web panel
```
{
  show: show2,
  episodes: [episode1, episode2, ...],
  links: [link1, link2, ...]
}
```

#### `/api/faqs` (GET)
Return internal list of frequently asked questions
```
{
  faqs: [faq1, faq2, ...]
}
```

## Private Routes

UCLA Radio also uses a number of private routes for the internal web panel. You can't access these unless you have the proper credentials, sorry.

#### `/api/user/:id` (GET)
Get user object with the given id. *Returns a 400 error unless user queried is the same as the logged in user.*
```
{user: user3}
```

#### `/api/user/:id` (POST)
Updates information for the logged in user. *Returns a 400 error unless logged in user is the same as the queried user or a manager.*
```
PARAMS: {user: updatedUser}
FILES: none or {pic: pictureFile}
{
  success: true,
  user: updatedUser
}
OR
{
  success: false
}
```

#### `/api/show/:id` (POST)
Updates information for a specific show (blurb, show time, etc.) *Returns a 400 error unless logged in user is a host of the queried show or a manager.*
```
PARAMS: {show: updatedShow}
FILES: none or {pic: pictureFile}
{
  success: true,
  show: updatedShow
}
OR
{
  success: false
}
```


#### `/api/newshow` (POST)
Creates a new show with some given data. Returns a 400 error unless logged in user is a dj.
```
PARAMS: {show: showData}
{
  success: true,
  show: show1
}
OR
{
  success: false
}
```

#### `/api/manager/:id` (GET)
Gets the manager object associated with a given id. *Returns a 400 error unless logged in user is a manager.*
```
{
  manager: manager4
}
```

#### `/api/manager/:id` (POST)
Updates manager information for the logged in user. *Returns a 400 error unless logged in user is the same as the manager.*
```
PARAMS: {manager: updatedManager}
{
  success: true,
  manager: updatedManager
}
OR
{
  success: false
}
```

#### `/api/users` (GET)
Returns all user objects and unverified user objects. *Returns a 400 error unless logged in user is a manager.*
```
{
  users: [user1, user2, ...],
  unverifiedusers: [unverified1, unverified2, ...]
}
```

#### `/api/user/:id` (DELETE)
Delete the user object with associated with a specified id. *Returns a 400 error unless logged in user is a manager.*
```
{
  success: true
}
OR
{
  success: false
}
```

#### `/api/unverified` (POST)
Updates unverified user with the given id by deleting request or converting to verified user. *Returns a 400 error unless logged in user is a manager.*
```
PARAMS: {id: unverifiedID, delete: true OR verify: true}
{
  success: true
}
OR
{
  success: false
}
```

#### `/api/faq/:id` (POST)
Updates information for a specific faq question. *Returns a 400 error unless logged in user is a manager.*
```
PARAMS: {faq: updatedFaq}
{
  faqs: [updatedFaq, faq2, ...]
}
```

#### `/api/faq/:id` (DELETE)
Deletes the faq question object associated with the given id. *Returns a 400 error unless logged in user is a manager.*
```
{
  success: true,
  faqs: [faq2, faq4, ...]
}
OR
{
  success: false
}
```

#### `/api/newfaq` (POST)
Creates a new faq question object with the given data. *Returns a 400 error unless logged in user is a manager.*
```
PARAMS: {faq: newFAQ}
{
  success: true,
  faqs: [newFAQ, faq2, ...]
}
OR
{
  success: false
}
```
