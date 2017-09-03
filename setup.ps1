# Set up steps for Windows
# needs to have Chocolatey installed already
Write-Host "Setting up UCLARadio repository..."
Write-Host "Installing Windows packages..."
cinst nodejs -y
cinst mongodb -y
cinst yarn -y

# storage for mongodb
md \data\db

Write-Host "Installing npm packages..."
# Install Windows Build Tools, dependency for node-gyp
npm install --global --production windows-build-tools
npm install node-gyp -g
yarn

Copy-Item defaultPasswords.json passwords.json

Write-Host "Adding MongoDB to the path"
SETX PATH "%PATH%;C:\Program Files\MongoDB\Server\3.4\bin"

Write-Host "Seeding database..."
"C:\Program Files\MongoDB\Server\3.4\bin\mongod"
node database/scripts/setupPanel.js

Write-Host "Finished."
