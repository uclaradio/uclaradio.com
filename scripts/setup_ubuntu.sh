#! /bin/bash
sudo apt update
sudo apt install -y mongodb
sudo apt-get install libcairo2-dev
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update
sudo apt install yarn nodejs
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
echo 'Finished.'
