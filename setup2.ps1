Write-Host "Installing npm packages..."
# Install Windows Build Tools, dependency for node-gyp
npm install --global --production windows-build-tools
yarn

Write-Host "Seeding database..."
refreshenv

# Path isn't updated until the Powershell window is closed so we gotta do it the long way.
mongod
node database/scripts/setupPanel.js

Write-Host "Finished."
