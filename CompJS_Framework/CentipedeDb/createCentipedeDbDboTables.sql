USE [CentipedeDb]

IF NOT EXISTS (SELECT 1 FROM [sys].[tables] t 
			   INNER JOIN [sys].[schemas] s ON (t.[schema_id] = s.[schema_id]) WHERE s.[name] = 'compjs' and t.[name] = 'AudioTypes')
BEGIN
	CREATE TABLE [compjs].[AudioTypes] (
		[Id] int PRIMARY KEY CLUSTERED IDENTITY,
		[Name] varchar(256) NOT NULL
	)
	DBCC CHECKIDENT ('[compjs].[AudioTypes]', RESEED, 0)
END

IF NOT EXISTS (SELECT 1 FROM [sys].[tables] t 
			   INNER JOIN [sys].[schemas] s ON (t.[schema_id] = s.[schema_id]) WHERE s.[name] = 'compjs' and t.[name] = 'Audio')
BEGIN
	CREATE TABLE [compjs].[Audio] (
		[Id] int PRIMARY KEY CLUSTERED IDENTITY,
		[AudioTypeId] int NOT NULL FOREIGN KEY REFERENCES [compjs].[AudioTypes]([Id]),
		[AudioFile] varchar(1000) NOT NULL,
		[Name] varchar(256) NOT NULL
	)
	DBCC CHECKIDENT ('[compjs].[Audio]', RESEED, 0)
END

IF NOT EXISTS (SELECT 1 FROM [sys].[tables] t 
			   INNER JOIN [sys].[schemas] s ON (t.[schema_id] = s.[schema_id]) WHERE s.[name] = 'compjs' and t.[name] = 'Entities')
BEGIN
	CREATE TABLE [compjs].[Entities] (
		[Id] int PRIMARY KEY CLUSTERED IDENTITY,
		[Name] varchar(256) NOT NULL
	)
	DBCC CHECKIDENT ('[compjs].[Entities]', RESEED, 0)
END

IF NOT EXISTS (SELECT 1 FROM [sys].[tables] t 
			   INNER JOIN [sys].[schemas] s ON (t.[schema_id] = s.[schema_id]) WHERE s.[name] = 'compjs' and t.[name] = 'BhvComps')
BEGIN
	CREATE TABLE [compjs].[BhvComps] (
		[Id] int PRIMARY KEY NONCLUSTERED IDENTITY,
		[EntityId] int NOT NULL FOREIGN KEY REFERENCES [compjs].[Entities]([Id]),
		[StateFile] varchar(1000) NOT NULL,
		[BehaviorConstructor] varchar(256) NOT NULL
	)
	CREATE UNIQUE CLUSTERED INDEX IX__BhvComps__EntityId ON [compjs].[BhvComps]([EntityId])
	DBCC CHECKIDENT ('[compjs].[BhvComps]', RESEED, 0)
END

IF NOT EXISTS (SELECT 1 FROM [sys].[tables] t 
			   INNER JOIN [sys].[schemas] s ON (t.[schema_id] = s.[schema_id]) WHERE s.[name] = 'compjs' and t.[name] = 'GfxComps')
BEGIN
	CREATE TABLE [compjs].[GfxComps] (
		[Id] int PRIMARY KEY NONCLUSTERED IDENTITY,
		[EntityId] int NOT NULL FOREIGN KEY REFERENCES [compjs].[Entities]([Id])
	)
	CREATE UNIQUE CLUSTERED INDEX IX__GfxComps__EntityId ON [compjs].[GfxComps]([EntityId])
	DBCC CHECKIDENT ('[compjs].[GfxComps]', RESEED, 0)
END

IF NOT EXISTS (SELECT 1 FROM [sys].[tables] t 
			   INNER JOIN [sys].[schemas] s ON (t.[schema_id] = s.[schema_id]) WHERE s.[name] = 'compjs' and t.[name] = 'AnimationStates')
BEGIN
	CREATE TABLE [compjs].[AnimationStates] (
		[Id] int PRIMARY KEY CLUSTERED IDENTITY,
		[GfxCompId] int NOT NULL FOREIGN KEY REFERENCES [compjs].[GfxComps]([Id]),
		[State] int NOT NULL
	)
	CREATE NONCLUSTERED INDEX IX__AnimationStates__GfxCompId ON [compjs].[AnimationStates]([GfxCompId])
	INCLUDE([State])
	DBCC CHECKIDENT ('[compjs].[AnimationStates]', RESEED, 0)
END

IF NOT EXISTS (SELECT 1 FROM [sys].[tables] t 
			   INNER JOIN [sys].[schemas] s ON (t.[schema_id] = s.[schema_id]) WHERE s.[name] = 'compjs' and t.[name] = 'AnimationFrames')
BEGIN
	CREATE TABLE [compjs].[AnimationFrames] (
		[Id] int PRIMARY KEY CLUSTERED IDENTITY,
		[AnimationStateId] int NOT NULL FOREIGN KEY REFERENCES [compjs].[AnimationStates]([Id]),
		[Frame] int NOT NULL,
		[Duration] float NULL,
		[Texture] varchar(1000) NOT NULL,
		[Width] float NOT NULL,
		[Height] float NOT NULL,
		[TexCoordTL] float NOT NULL,
		[TexCoordTR] float NOT NULL,
		[TexCoordBR] float NOT NULL,
		[TexCoordBL] float NOT NULL
	)
	CREATE NONCLUSTERED INDEX IX__AnimationFrames__AnimationStatesId ON [compjs].[AnimationFrames]([AnimationStateId])
	INCLUDE([Frame], [Texture], [Width], [Height], [TexCoordTL], [TexCoordTR], [TexCoordBR], [TexCoordBL])
	DBCC CHECKIDENT ('[compjs].[AnimationFrames]', RESEED, 0)
END

IF NOT EXISTS (SELECT 1 FROM [sys].[tables] t 
			   INNER JOIN [sys].[schemas] s ON (t.[schema_id] = s.[schema_id]) WHERE s.[name] = 'compjs' and t.[name] = 'PhysTypes')
BEGIN
	CREATE TABLE [compjs].[PhysTypes] (
		[Id] int PRIMARY KEY CLUSTERED IDENTITY,
		[Name] varchar(256) NOT NULL
	)
	DBCC CHECKIDENT ('[compjs].[PhysTypes]', RESEED, 0)
END

IF NOT EXISTS (SELECT 1 FROM [sys].[tables] t 
			   INNER JOIN [sys].[schemas] s ON (t.[schema_id] = s.[schema_id]) WHERE s.[name] = 'compjs' and t.[name] = 'CollisionTypes')
BEGIN
	CREATE TABLE [compjs].[CollisionTypes] (
		[Id] int PRIMARY KEY CLUSTERED IDENTITY,
		[Name] varchar(256) NOT NULL
	)
	DBCC CHECKIDENT ('[compjs].[CollisionTypes]', RESEED, 0)
END

IF NOT EXISTS (SELECT 1 FROM [sys].[tables] t 
			   INNER JOIN [sys].[schemas] s ON (t.[schema_id] = s.[schema_id]) WHERE s.[name] = 'compjs' and t.[name] = 'PhysComps')
BEGIN
	CREATE TABLE [compjs].[PhysComps] (
		[Id] int PRIMARY KEY NONCLUSTERED IDENTITY,
		[EntityId] int NOT NULL FOREIGN KEY REFERENCES [compjs].[Entities]([Id]),
		[PhysTypeId] int NOT NULL FOREIGN KEY REFERENCES [compjs].[PhysTypes]([Id]),
		[CollisionTypeId] int NOT NULL FOREIGN KEY REFERENCES [compjs].[CollisionTypes]([Id]),
		[BoundingData] varchar(1000) NOT NULL
	)
	CREATE UNIQUE CLUSTERED INDEX IX__PhysComps__EntityId ON [compjs].[PhysComps]([EntityId])
	DBCC CHECKIDENT ('[compjs].[PhysComps]', RESEED, 0)
END

IF NOT EXISTS (SELECT 1 FROM [sys].[tables] t 
			   INNER JOIN [sys].[schemas] s ON (t.[schema_id] = s.[schema_id]) WHERE s.[name] = 'game' and t.[name] = 'Levels')
BEGIN
	CREATE TABLE [game].[Levels] (
		[Id] int PRIMARY KEY CLUSTERED IDENTITY
	)
	DBCC CHECKIDENT ('[game].[Levels]', RESEED, 0)
END

IF NOT EXISTS (SELECT 1 FROM [sys].[tables] t 
			   INNER JOIN [sys].[schemas] s ON (t.[schema_id] = s.[schema_id]) WHERE s.[name] = 'game' and t.[name] = 'LevelLayouts')
BEGIN
	CREATE TABLE [game].[LevelLayouts] (
		[Id] int PRIMARY KEY CLUSTERED IDENTITY,
		[LevelId] int NOT NULL FOREIGN KEY REFERENCES [game].[Levels]([Id]),
		[EntityId] int NOT NULL FOREIGN KEY REFERENCES [compjs].[Entities]([Id]),
		[X] float NOT NULL,
		[Y] float NOT NULL
	)
	CREATE NONCLUSTERED INDEX IX__LevelLayouts__LevelId ON [game].[LevelLayouts]([LevelId])
	INCLUDE([EntityId], [X], [Y])
	DBCC CHECKIDENT ('[game].[LevelLayouts]', RESEED, 0)
END

IF NOT EXISTS (SELECT 1 FROM [sys].[tables] t 
			   INNER JOIN [sys].[schemas] s ON (t.[schema_id] = s.[schema_id]) WHERE s.[name] = 'game' and t.[name] = 'EntitiesOnAllLevels')
BEGIN
	CREATE TABLE [game].[EntitiesOnAllLevels] (
		[Id] int PRIMARY KEY CLUSTERED IDENTITY,
		[EntityId] int FOREIGN KEY REFERENCES [compjs].[Entities]([Id])
	)
	DBCC CHECKIDENT ('[game].[EntitiesOnAllLevels]', RESEED, 0)
END

IF NOT EXISTS (SELECT 1 FROM [sys].[tables] t 
			   INNER JOIN [sys].[schemas] s ON (t.[schema_id] = s.[schema_id]) WHERE s.[name] = 'game' and t.[name] = 'HighScores')
BEGIN
	CREATE TABLE [game].[HighScores] (
		[Id] int PRIMARY KEY CLUSTERED IDENTITY,
		[PlayerName] varchar(100) NOT NULL,
		[Score] bigint NOT NULL	
	)
	DBCC CHECKIDENT ('[game].[HighScores]', RESEED, 0)
END