$net40Path = [System.IO.Path]::Combine($env:SystemRoot, "Microsoft.NET\Framework\v4.0.30319");
$aspnetRegIISFullName = [System.IO.Path]::Combine($net40Path, "aspnet_regiis.exe");
 
if ((test-path $aspnetRegIISFullName) -eq $false)
{
    $message =  "aspnet_regiis.exe was not found in {0}. Make sure Microsoft .NET Framework 4.0 installed first." -f $net40Path;
    write-error $message;
}

$ParentSiteName="arcade"
$ParentSitePort=80
$ParentSiteHost=$ParentSiteName
$ParentSitePath=("C:\inetpub\" + $ParentSiteName)
$ParentSiteLogsPath=("C:\inetpub\logs\" + $ParentSiteName)

$CompJSSiteName="cabinet"
$CompJSSiteHost=$CompJSSiteName
$CompJSSitePath=($ParentSitePath + "\" + $CompJSSiteName)
$CompJSSiteLogsPath=($ParentSiteLogsPath + "\" + $CompJSSiteName)

$GameSiteName="compjs"
$GameSiteHost=$GameSiteName
$GameSitePath=($CompJSSitePath + "\" + $GameSiteName)
$GameSiteLogsPath=($CompJSSiteLogsPath + "\" + $GameSiteName)

$GameServicesName="compjsservices"
$GameServicesPath=Split-Path $script:MyInvocation.MyCommand.Path
$GameServicesLogsPath=($GameSiteLogsPath + "\" + $GameServicesName)

$AppPool=("IIS:\AppPools\" + $ParentSiteName)
$AppPoolIdentity=0
switch ($AppPoolIdentity)
{
    0 {$FullAppPoolIdentity="LocalSystem"}
    1 {$FullAppPoolIdentity="LocalService"}
    2 {$FullAppPoolIdentity="NetworkService"}
    3 {$FullAppPoolIdentity="SpecificUser"}
    4 {$FullAppPoolIdentity="ApplicationPoolIdentity"}
}
if ($AppPoolIdentity -eq "3") {
$AppPoolUser=Read-Host "`nPlease provide username for the ApplicationPool identity"
$AppPoolPwd=Read-Host "Please provide the password for '$AppPoolUser' user" -AsSecureString
}
 

Import-Module "WebAdministration" -ErrorAction Stop
 
# Creates the ApplicationPool
$AppPoolExists=Test-Path $AppPool
if(-Not $AppPoolExists)
{
    Write-Host "Creating website application pool" -ForegroundColor Yellow
    New-WebAppPool –Name $ParentSiteName -Force
}
Write-Host "Updating website application pool" -ForegroundColor Yellow
Set-ItemProperty ("IIS:\AppPools\" + $ParentSiteName) -Name processModel.identityType -Value $AppPoolIdentity
Set-ItemProperty ("IIS:\AppPools\" + $ParentSiteName) managedRuntimeVersion v4.0
if ($Identity -eq "3") {
Set-ItemProperty ("IIS:\AppPools\" + $ParentSiteName) -Name processModel.username -Value $AppPoolUser
Set-ItemProperty ("IIS:\AppPools\" + $ParentSiteName) -Name processModel.password -Value $AppPoolPwd
}
 
# Creates the parent site
$ParentSiteDirectoryExists=Test-Path $ParentSitePath
if(-Not $ParentSiteDirectoryExists)
{
    Write-Host "Creating parent site directory" -ForegroundColor Yellow
    New-Item -ItemType directory -Path $ParentSitePath
}
$ParentSiteLogsDirectoryExists=Test-Path $ParentSiteLogsPath
if(-Not $ParentSiteLogsDirectoryExists)
{
    Write-Host "Creating parent site  logs directory" -ForegroundColor Yellow
    New-Item -ItemType directory -Path $ParentSiteLogsPath
}
Write-Host "Creating website" -ForegroundColor Yellow
New-Website –Name $ParentSiteName -Port $ParentSitePort –HostHeader $ParentSiteHost -PhysicalPath $ParentSitePath -ApplicationPool $ParentSiteName -Force
Set-ItemProperty ("IIS:\Sites\" + $ParentSiteHost) -Name logfile.directory -Value $ParentSiteLogsPath

# Creates the CompJS site
$CompJSSiteDirectoryExists=Test-Path $CompJSSitePath
if(-Not $CompJSSiteDirectoryExists)
{
    Write-Host "Creating CompJS site directory" -ForegroundColor Yellow
    New-Item -ItemType directory -Path $CompJSSitePath
}
$CompJSSiteLogsDirectoryExists=Test-Path $CompJSSiteLogsPath
if(-Not $CompJSSiteLogsDirectoryExists)
{
    Write-Host "Creating CompJS site logs directory" -ForegroundColor Yellow
    New-Item -ItemType directory -Path $CompJSSiteLogsPath
}

# Creates the game site
$GameSiteDirectoryExists=Test-Path $GameSitePath
if(-Not $GameSiteDirectoryExists)
{
    Write-Host "Creating game site directory" -ForegroundColor Yellow
    New-Item -ItemType directory -Path $GameSitePath
}
$GameSiteLogsDirectoryExists=Test-Path $GameSiteLogsPath
if(-Not $GameSiteLogsDirectoryExists)
{
    Write-Host "Creating game site logs directory" -ForegroundColor Yellow
    New-Item -ItemType directory -Path $GameSiteLogsPath
}
 
# Creates the services
#$GameServicesLogsDirectoryExists=Test-Path $GameServicesLogsPath
#if(-Not $GameServicesLogsDirectoryExists)
#{
#    Write-Host "Creating services logs directory" -ForegroundColor Yellow
#    New-Item -ItemType directory -Path $GameServicesLogsPath
#}
#Write-Host "Creating services site" -ForegroundColor Yellow
#New-WebApplication -Site $GameSiteName –Name $GameServicesName -PhysicalPath $GameServicesPath -ApplicationPool $ParentSiteName -Force

#update hosts file
Set-HostsEntry -IPAddress 10.2.3.4 -HostName $ParentSiteHost
 
 #start everything
Start-WebAppPool -Name $ParentSiteName
Start-WebSite $ParentSiteName