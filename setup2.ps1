Write-Host "Installing npm packages..."
# Install Windows Build Tools, dependency for node-gyp
#npm install -g --production windows-build-tools
#npm install -g node-gyp
yarn

Write-Host "Seeding database..."
# Path isn't updated until the Powershell window is closed so we gotta do it the long way.
Start-Process -NoNewWindow mongod
node database/scripts/setupPanel.js

Write-Host "Finished."
Stop-Process mongod
