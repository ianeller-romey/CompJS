-- Create logins
USE [master]
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[syslogins] WHERE [name] = 'compjs_player' and dbname = 'CompJSdb')
BEGIN
	CREATE LOGIN [compjs_player] WITH PASSWORD=N'c0mpj$_p14y3r', DEFAULT_DATABASE=[CompJSdb], DEFAULT_LANGUAGE=[us_english], CHECK_EXPIRATION=OFF, CHECK_POLICY=OFF
	ALTER LOGIN [compjs_player] ENABLE
END

-- Create db_executor role
USE [CompJSdb]
GO

IF NOT EXISTS (SELECT 1 FROM [sys].[database_principals] WHERE [name] = 'db_executor')
BEGIN
	CREATE ROLE [db_executor] AUTHORIZATION [dbo]
	GRANT EXECUTE TO [db_executor]
END
GO

-- Create users
USE [CompJSdb]
GO

IF NOT EXISTS (SELECT 1 FROM [sys].[database_principals] WHERE [name] = 'NT AUTHORITY\SYSTEM')
BEGIN
	CREATE USER [NT AUTHORITY\SYSTEM] FOR LOGIN [NT AUTHORITY\SYSTEM] WITH DEFAULT_SCHEMA=[game]
END
EXEC sp_addrolemember 'db_executor', 'NT AUTHORITY\SYSTEM'
DENY SELECT ON schema::[dbo] TO [NT AUTHORITY\SYSTEM]
DENY UPDATE ON schema::[dbo] TO [NT AUTHORITY\SYSTEM]
DENY INSERT ON schema::[dbo] TO [NT AUTHORITY\SYSTEM]
DENY EXECUTE ON schema::[dbo] TO [NT AUTHORITY\SYSTEM]
DENY SELECT ON schema::[dev] TO [NT AUTHORITY\SYSTEM]
DENY UPDATE ON schema::[dev] TO [NT AUTHORITY\SYSTEM]
DENY INSERT ON schema::[dev] TO [NT AUTHORITY\SYSTEM]
DENY EXECUTE ON schema::[dev] TO [NT AUTHORITY\SYSTEM]
DENY SELECT ON schema::[compjs] TO [NT AUTHORITY\SYSTEM]
DENY UPDATE ON schema::[compjs] TO [NT AUTHORITY\SYSTEM]
DENY INSERT ON schema::[compjs] TO [NT AUTHORITY\SYSTEM]
DENY SELECT ON schema::[game] TO [NT AUTHORITY\SYSTEM]
DENY UPDATE ON schema::[game] TO [NT AUTHORITY\SYSTEM]
DENY INSERT ON schema::[game] TO [NT AUTHORITY\SYSTEM]

IF NOT EXISTS (SELECT 1 FROM [sys].[database_principals] WHERE [name] = 'player')
BEGIN
	CREATE USER [player] FOR LOGIN [compjs_player] WITH DEFAULT_SCHEMA=[game]
END
EXEC sp_addrolemember 'db_executor', 'player'
DENY SELECT ON schema::[dbo] TO [player]
DENY UPDATE ON schema::[dbo] TO [player]
DENY INSERT ON schema::[dbo] TO [player]
DENY EXECUTE ON schema::[dbo] TO [player]
DENY SELECT ON schema::[dev] TO [player]
DENY UPDATE ON schema::[dev] TO [player]
DENY INSERT ON schema::[dev] TO [player]
DENY EXECUTE ON schema::[dev] TO [player]
DENY SELECT ON schema::[compjs] TO [player]
DENY UPDATE ON schema::[compjs] TO [player]
DENY INSERT ON schema::[compjs] TO [player]
DENY SELECT ON schema::[game] TO [player]
DENY UPDATE ON schema::[game] TO [player]
DENY INSERT ON schema::[game] TO [player]
