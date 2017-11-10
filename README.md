# UCLA Radio
[![dependencies Status](https://david-dm.org/uclaradio/uclaradio/status.svg)](https://david-dm.org/uclaradio/uclaradio)
[![devDependencies Status](https://david-dm.org/uclaradio/uclaradio/dev-status.svg)](https://david-dm.org/uclaradio/uclaradio?type=dev)
[![Build Status](https://travis-ci.org/uclaradio/uclaradio.svg?branch=master)](https://travis-ci.org/uclaradio/uclaradio)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

All of the code that powers [uclaradio.com](https://uclaradio.com).

UCLA Radio is a Javascript application, powered by [Node.js](https://nodejs.org/en/) and utilizing the [Express.js](http://expressjs.com) framework. We use [MongoDB](https://www.mongodb.com) for our database and [React](https://facebook.github.io/react/) on the front-end.

In addition to the visible site, we also have a [RESTful API](https://github.com/uclaradio/uclaradio/wiki/The-API), which powers an internal panel for managers and DJs as well as our [iOS](https://github.com/uclaradio/uclaradio-iOS) and [Android](https://github.com/uclaradio/uclaradio-Android) apps.

UCLA Radio is a completely student-run organization offering cultural content created by 100+ DJs. [Let us know](mailto:radio.web@media.ucla.edu) if you have any suggestions! All of the software here is written by students.

## Getting Started
### Running
#### Development
##### Windows
1. Install [Chocolatey](https://chocolatey.org).
2. Install git by running `choco install git --params="'/GitAndUnixToolsOnPath /NoAutoCrlf'" -y`.
3. Install [CMDer](http://cmder.net) with `choco install cmder -y`.
4. Install [cairo](https://www.cairographics.org), which is a dependency for a package we use. You can do this by downloading Glade (which is a program that installs cairo as a dependency) [here](http://gladewin32.sourceforge.net).
5. Open CMDer and clone our repo by running the command `git clone https://github.com/uclaradio/uclaradio.git`. While you wait for it download, give us some love by starring our repo.
6. Open Powershell as an administrator and cd to the `uclaradio` repo you just cloned. Run our [`setup1.ps1`](https://github.com/uclaradio/uclaradio/blob/master/scripts/setup1.ps1) script. If you're getting a "running scripts is disabled error", try running `set-executionpolicy remotesigned`.
7. Open up __another__ Powershell window as an administrator and run the [`setup2.ps1`](https://github.com/uclaradio/uclaradio/blob/master/scripts/setup2.ps1) script. Why two scripts? Windows is weird, man.
7. Run mongo with `mongod`.
8. Run `yarn dev` to start the server for development.
9. Point your browser to [`http://localhost:3000`](http://localhost:3000) :heart_eyes:

##### MacOS
1. Install [Homebrew](https://brew.sh).
2. Install git by running `brew install git` or by installing Xcode command line tools (which includes git) with `xcode-select --install`.
3. Clone our repo by running the command `git clone https://github.com/uclaradio/uclaradio.git`. While you wait for it download, give us some love by starring our repo.
4. Run our [`setup.sh`](https://github.com/uclaradio/uclaradio/blob/master/scripts/setup.sh) script.
    - Wondering what this does? Basically it installs the latest versions of [Node](https://nodejs.org/en/), [MongoDB](https://www.mongodb.com), and [Yarn](https://yarnpkg.com), then uses these programs to install the packages we use and set up a local database.
5. Run mongo with `mongod`.
6. Run `yarn dev` to start the server for development.
7. Point your browser to [`http://localhost:3000`](http://localhost:3000) :heart_eyes:

#### Production
- Make sure all packages are installed with `yarn`.
- Run `node bin/www prod` to start the server for production (will require HTTPS and listen on port 80).

### Getting Started

#### Structure
```
uclaradio/
├── LICENSE.md
├── README.md
├── app                       # Backend code
│   ├── app.js                # The main server file
│   ├── database/             #
│   ├── routes/               #
│   └── services/             #
├── bin
│   └── www                   # The command to run node
├── client                    # Frontend code
│   ├── public/               #
│   ├── react/                # React files
│   └── views/                # Jade templates
├── defaultPasswords.json
├── package.json
├── scripts/                  # Scripts to set things up
├── webpack.config.babel.js
└── yarn.lock
```

### Requirements for new code

As a student-run organization, UCLA Radio is especially liable to technical debt. We have some goals for cleaning up our codebase in the future, but most importantly new code should:
* Have new front-end pages in **React**. We prefer using a front-end framework with an API to complicated templates.
* Delete files that are not used anymore. It's okay, get rid of clutter.
* Follow an organized structure. Put things in the right directories.

We accept changes from both radio web members and outside contributors. Please note both our [contributing guidelines](/.github/CONTRIBUTING.md) and [code of conduct](/.github/CODE_OF_CONDUCT.md) before making a pull request. Want to join radio? We [accept applications](http://apply.uclastudentmedia.com/applications/ucla-radio/web-staff/) every quarter.


### License
All of the code here is released under the [GNU AGPL 3.0 License](/LICENSE), which basically means you can do anything you want with the code here as long as you attribute us and release what you make under the same license. If you've made something cool with our code or are interested in relicensing our code, [let us know](mailto:radio.web@media.ucla.edu); we'd love to hear what you made!
