#! /bin/bash
echo setting up UCLARadio repository...
brew update
brew install node
brew install mongodb
sudo mkdir -p /data/db
sudo chown -R $USER /data/db
npm install

echo finished.
