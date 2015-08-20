USE [master]

-- Since we can't use parameters in the call to CREATE DATABASE, and since I'll probably want to create the .mdf files in different locations
-- depending on which machine I'm on, we're going to dynamically build all the calls necessary to drop and create the database for the sake of
-- consistency
DECLARE @databaseName varchar(MAX)
SELECT @databaseName = N'CompJSdb'

-- If the database exists, drop it
DECLARE @dropDatabaseExec nvarchar(MAX)
SELECT @dropDatabaseExec = 'IF  EXISTS (SELECT [name] FROM [sys].[databases] WHERE [name] = ''' + @databaseName + ''') ' +
	'BEGIN ' + 
	'ALTER DATABASE [' + @databaseName + '] SET SINGLE_USER WITH ROLLBACK IMMEDIATE ' +
	'DROP DATABASE [' + @databaseName + '] ' +
	'END'
EXECUTE sp_executesql @dropDatabaseExec

-- Create the database anew
DECLARE @mdfFileDirectory varchar(MAX)
SELECT @mdfFileDirectory = N'C:\Program Files\Microsoft SQL Server\MSSQL10.MSSQLSERVER\MSSQL\DATA\' 
--SELECT @mdfFileDirectory = N'C:\Program Files\Microsoft SQL Server\MSSQL11.MSSQLSERVER\MSSQL\DATA\'

DECLARE @mdfFileName varchar(MAX)
DECLARE @mdfLogFileName varchar(MAX)

SELECT @mdfFileName = @mdfFileDirectory + @databaseName + N'.mdf', 
	   @mdfLogFileName = @mdfFileDirectory + @databaseName + N'_log.ldf'

DECLARE @createDatabaseExec nvarchar(MAX)
SELECT @createDatabaseExec = N'CREATE DATABASE [' + @databaseName + '] ON PRIMARY ' +
	'(NAME = ''' + @databaseName + ''', FILENAME = ''' + @mdfFileName + ''', SIZE = 4096KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB) LOG ON ' +
	'(NAME = ''' + @databaseName + '_log'', FILENAME = ''' + @mdfLogFileName + ''' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%) ' +
	--'GO ' +
	'ALTER DATABASE [' + @databaseName + '] SET COMPATIBILITY_LEVEL = 100 ' + 
	--'GO ' +
	'IF (1 = FULLTEXTSERVICEPROPERTY(''IsFullTextInstalled'')) BEGIN EXEC [' + @databaseName + '].[dbo].[sp_fulltext_database] @action = ''enable'' END'
EXECUTE sp_executesql @createDatabaseExec

GO

-- Create schemas
USE [CompJSdb]
GO

IF NOT EXISTS (SELECT 1 FROM [information_schema].[schemata] WHERE [schema_name] = 'dev' ) 
BEGIN
	EXEC sp_executesql N'CREATE SCHEMA [dev]'
END
GO

IF NOT EXISTS (SELECT 1 FROM [information_schema].[schemata] WHERE [schema_name] = 'compjs' ) 
BEGIN
	EXEC sp_executesql N'CREATE SCHEMA [compjs]'
END
GO

IF NOT EXISTS (SELECT 1 FROM [information_schema].[schemata] WHERE [schema_name] = 'game' ) 
BEGIN
	EXEC sp_executesql N'CREATE SCHEMA [game]'
END
GO