#! /bin/bash

# Set up steps for macOS
# needs to have homebrew installed already

echo 'Setting up UCLARadio repository...'
echo 'installing macOS packages'
brew update
brew install node
brew install mongodb

# storage for mongodb
sudo mkdir -p /data/db
# privileges for mongodb
sudo chown -R $USER /data/db

echo 'installing npm packages'
## note: might need to update if 'node-gyp rebuild' fails
# npm explore npm -g -- npm install node-gyp@latest
sudo npm install

cp defaultPasswords.json passwords.json

echo 'seeding database'
node database/scripts/setupPanel.js

echo 'Finished.'
