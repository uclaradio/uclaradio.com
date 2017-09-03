# Set up steps for macOS
# needs to have homebrew installed already

function Add-Path() {
    [Cmdletbinding()]
    param([parameter(Mandatory=$True,ValueFromPipeline=$True,Position=0)][String[]]$AddedFolder)
    # Get the current search path from the environment keys in the registry.
    $OldPath=(Get-ItemProperty -Path 'Registry::HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\Session Manager\Environment' -Name PATH).Path
    # See if a new folder has been supplied.
    if (!$AddedFolder) {
        Return 'No Folder Supplied. $ENV:PATH Unchanged'
    }
    # See if the new folder exists on the file system.
    if (!(TEST-PATH $AddedFolder))
    { Return 'Folder Does not Exist, Cannot be added to $ENV:PATH' }cd
    # See if the new Folder is already in the path.
    if ($ENV:PATH | Select-String -SimpleMatch $AddedFolder)
    { Return 'Folder already within $ENV:PATH' }
    # Set the New Path
    $NewPath=$OldPath+’;’+$AddedFolder
    Set-ItemProperty -Path 'Registry::HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\Session Manager\Environment' -Name PATH –Value $newPath
    # Show our results back to the world
    Return $NewPath
}

Write-Host 'Setting up UCLARadio repository...'
Write-Host 'Installing Windows packages...'
cinst nodejs -y
cinst mongodb -y
cinst yarn -y

# storage for mongodb
md \data\db

Write-Host 'Installing npm packages...'
yarn

Copy-Item defaultPasswords.json passwords.json

Write-Host "Adding MongoDB to the path"
Add-Path "C:\MongoDB\bin"
Write-Host

Write-Host 'Seeding database...'
mongod
node database/scripts/setupPanel.js

Write-Host 'Finished.'
