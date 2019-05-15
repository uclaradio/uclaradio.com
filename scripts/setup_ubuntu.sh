#! /bin/bash
echo "This is the UCLA Radio setup scrit for WSL Ubuntu."
echo "This script will install the following 4 packages:"
echo "(1) mongodb, (2) cairo, (3) yarn, and (4) nodejs"
sudo apt-get update
sudo apt-get install -y mongodb #installing mongodb
sudo apt-get install -y libcairo2-dev #installing cairo
#yarn for WSL ubuntu has to be retrieved from the website first in order to install correctly
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt-get update
sudo apt-get install -y yarn nodejs #installing yarn, nodejs
#setting up database
sudo mkdir -p /data/db
sudo chown -R $USER /data/db
yarn
cp ../defaultPasswords.json ../passwords.json
mongod &
MONGO_PID=$!
node ../app/database/scripts/setupPanel.js &
NODE_PID=$!
wait $NODE_PID
kill $MONGO_PID
echo "Finished."
