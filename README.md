# UCLA Radio

[![dependencies Status](https://david-dm.org/uclaradio/uclaradio/status.svg)](https://david-dm.org/uclaradio/uclaradio)
[![devDependencies Status](https://david-dm.org/uclaradio/uclaradio/dev-status.svg)](https://david-dm.org/uclaradio/uclaradio?type=dev)
[![Build Status](https://travis-ci.org/uclaradio/uclaradio.svg?branch=master)](https://travis-ci.org/uclaradio/uclaradio)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

All of the code that powers [uclaradio.com](https://uclaradio.com).

UCLA Radio is a Javascript application, powered by
[Node.js](https://nodejs.org/en/) and utilizing the
[Express.js](http://expressjs.com) framework. We use
[MongoDB](https://www.mongodb.com) for our database and
[React](https://facebook.github.io/react/) on the front-end.

In addition to the visible site, we also have a [RESTful
API](https://github.com/uclaradio/uclaradio/wiki/The-API), which powers an
internal panel for managers and DJs as well as our
[iOS](https://github.com/uclaradio/uclaradio-iOS) and
[Android](https://github.com/uclaradio/uclaradio-Android) apps.

UCLA Radio is a completely student-run organization offering cultural content
created by 100+ DJs. [Let us know](mailto:radio.web@media.ucla.edu) if you have
any suggestions! All of the software here is written by students.

## Getting Started

### Running

#### Development

Below are the primary way we recommend for Windows and Mac users to set up the repo properly on their computer to run.  
If you are wondering why you can't just clone it and be done it is because we have some extra programs that need to be
downloaded in order for to run and develop the website. These include Node, MongoDB, and Yarn mainly.

The Windows set up will require the usage of Windows Subsystem for Linux in order to make downloading and installing
all of these software easy. It also helps to make the environment more similar to Mac users so it is easier to get help
and work together.

Mac users will need Homebrew in order to have the command terminal be able to download and install programs as if it
was a complete Linux system.

##### Windows

1. Install [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/install-win10). Please download Ubuntu.
2. Open Ubuntu and ensure git is installed by running `git --version`.
3. Navigate back to the Windows c drive with `cd /mnt/c/Users`.
   (Note: if you `ls` and are worried about the denied permissions, that is normal because it simply means don't touch this
   or you might break something internally. Everything you need you have access to!)
4. Now once you are here, cd into your own user folder. Then navigate to a directory that you want to work in.
   (Do not just put it in your user folder--go to your desktop or documents folder)
   Ex) `cd Bob/Desktop` and `mkdir radio_stuff` to make a folder/directory
5. Run the command `git clone https://github.com/uclaradio/uclaradio.git`. While you wait for it download,
   give us some love by starring our repo.
6. Navigate to the set up script with `cd uclaradio/scripts`.
   Then run our [`setup_ubuntu.sh`](https://github.com/uclaradio/uclaradio/blob/master/scripts/setup_ubuntu.sh) script.
   - Wondering what this does? Basically it installs the latest versions of
     [Node](https://nodejs.org/en/), [MongoDB](https://www.mongodb.com), and
     [Yarn](https://yarnpkg.com), then uses these programs to install the
     packages we use and set up a local database.
   - Is yarn not working? Try yarn --version and if you see 0.3# instead of 1.#.#, then run `sudo apt remove cmdtest`
     Rerun the setup script and see if it works now. More on this issue [here](https://github.com/yarnpkg/yarn/issues/2821)
   - Is the setup script not running and returning an error? Try running `sudo apt-get install dos2unix` and then
     `dos2unix setup_ubuntu.sh` (to fix WSL formatting [error](https://askubuntu.com/questions/966488/how-do-i-fix-r-command-not-found-errors-running-bash-scripts-in-wsl)).
7. Open up **another** Ubuntu window by left-clicking the icon at the bottom and clicking Ubuntu.
   Navigate to the uclaradio repo. (To make life easier, just copy the path from the original window!)
8. Run mongo with `mongod` in one Ubuntu window.
9. Run `yarn dev` in the other Ubuntu window to start the server for development.
10. Point your browser to [`http://localhost:3000`](http://localhost:3000)
    :heart_eyes:
11. Please note that whenever you open a new ubuntu terminal you will have to navigate back to the Windows c file system.
    This is done as said before by going for example `cd /mnt/c/Users/Bob/Desktop/uclaradio`. The reason for having to do
    this every time you open instead of simply cloning the repo into the default WSL Ubuntu root setup is because this way
    you can find and open the repo with file explorer. If you'd like to edit files easily using a text/code editor, this
    is very crucial.

##### MacOS

1. Install [Homebrew](https://brew.sh).
2. Install git by running `brew install git` or by installing Xcode command line
   tools (which includes git) with `xcode-select --install`.
3. Clone our repo by running the command `git clone https://github.com/uclaradio/uclaradio.git`. While you wait for it download,
   give us some love by starring our repo.
4. Navigate to the `scripts` directory and run our
   [`setup.sh`](https://github.com/uclaradio/uclaradio/blob/master/scripts/setup.sh)
   script.
   - Wondering what this does? Basically it installs the latest versions of
     [Node](https://nodejs.org/en/), [MongoDB](https://www.mongodb.com), and
     [Yarn](https://yarnpkg.com), then uses these programs to install the
     packages we use and set up a local database.
5. Run `nodenv init`, and follow the instructions it tells you.
   - If you have a problem that looks like
     `error: unknown type name 'uint64_t' uint64_t ri_user_time;`
     you're going to need to rename your `/usr/local/include` folder to something else. I used `usr/local/include_old`. This solution is from the following issue [`https://github.com/cython/cython/issues/2009`](https://github.com/cython/cython/issues/2009) if you're interested in reading more about the error.
6. Run mongo with `mongod`.
7. Run `yarn dev` to start the server for development.
8. Point your browser to [`http://localhost:3000`](http://localhost:3000)
   :heart_eyes:

#### Production

- Make sure all packages are installed with `yarn`.
- Run `node bin/www prod` to start the server for production (will require HTTPS
  and listen on port 80).

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

As a student-run organization, UCLA Radio is especially liable to technical
debt. We have some goals for cleaning up our codebase in the future, but most
importantly new code should:

- Have new front-end pages in **React**. We prefer using a front-end framework
  with an API to complicated templates.
- Delete files that are not used anymore. It's okay, get rid of clutter.
- Follow an organized structure. Put things in the right directories.

We accept changes from both radio web members and outside contributors. Please
note both our [contributing guidelines](/.github/CONTRIBUTING.md) and [code of
conduct](/.github/CODE_OF_CONDUCT.md) before making a pull request. Want to join
radio? We [accept
applications](http://apply.uclastudentmedia.com/applications/ucla-radio/web-staff/)
every quarter.

### License

All of the code here is released under the [GNU AGPL 3.0 License](/LICENSE),
which basically means you can do anything you want with the code here as long as
you attribute us and release what you make under the same license. If you've
made something cool with our code or are interested in relicensing our code,
[let us know](mailto:radio.web@media.ucla.edu); we'd love to hear what you made!
