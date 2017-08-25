#! /bin/bash

# Set up steps for macOS
# needs to have homebrew installed already

echo 'Setting up UCLARadio repository...'
echo 'Installing macOS packages...'
brew update
brew install node
brew install mongodb
brew install yarn
# Cairo is a dependency: https://github.com/uclaradio/uclaradio/issues/131
brew install cairo

# storage for mongodb
sudo mkdir -p /data/db
# privileges for mongodb
sudo chown -R $USER /data/db

echo 'Installing npm packages...'
yarn

cp defaultPasswords.json passwords.json

echo 'Seeding database...'
# mongod &
# node database/scripts/setupPanel.js
# kill %%

echo 'Finished.'
