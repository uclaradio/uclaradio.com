#! /bin/bash
echo setting up UCLARadio repository...
brew update
brew install node
brew install mongodb
# storage for mongodb
sudo mkdir -p /data/db
# privileges for mongodb
sudo chown -R $USER /data/db
npm install
echo {\"secretpassword\": \"stillasecret\"} > passwords.json
echo finished.
