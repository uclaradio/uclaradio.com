#! /bin/bash

# Set up steps for macOS
# needs to have homebrew installed already

echo 'Setting up UCLARadio repository...'
echo 'Installing macOS packages...'
brew update
brew install node
brew install mongodb
brew install grunt

# storage for mongodb
sudo mkdir -p /data/db
# privileges for mongodb
sudo chown -R $USER /data/db

echo 'Installing npm packages...'
## note: might need to update if 'node-gyp rebuild' fails
# npm explore npm -g -- npm install node-gyp@latest
## might have to install cairo for dependent npm packages
# brew install cairo
sudo npm install

cp defaultPasswords.json passwords.json

echo 'Seeding database...'
node database/scripts/setupPanel.js

echo 'Finished.'
