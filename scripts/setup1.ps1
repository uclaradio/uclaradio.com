# Set up steps for Windows
# needs to have Chocolatey installed already
Write-Host "Setting up UCLARadio repository..."
Write-Host "Installing Windows packages..."
cinst nodejs -y
cinst mongodb -y
cinst yarn -y

# storage for mongodb
md \data\db

Copy-Item defaultPasswords.json passwords.json

Write-Host "Adding MongoDB to the path"
SETX PATH "%PATH%;C:\Program Files\MongoDB\Server\3.4\bin"
