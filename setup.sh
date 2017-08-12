#! /bin/bash

# Set up steps for macOS
# needs to have homebrew installed already

echo 'Setting up UCLARadio repository...'
echo 'Installing macOS packages...'
brew update
brew install node
brew install mongodb
brew install yarn

# storage for mongodb
sudo mkdir -p /data/db
# privileges for mongodb
sudo chown -R $USER /data/db

echo 'Installing npm packages...'
yarn

cp defaultPasswords.json passwords.json

echo 'Seeding database...'
node database/scripts/setupPanel.js

echo 'Finished.'
