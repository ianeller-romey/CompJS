USE [CompJSdb]

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
			   INNER JOIN [sys].[schemas] s ON (t.[schema_id] = s.[schema_id]) WHERE s.[name] = 'game' and t.[name] = 'Games')
BEGIN
	CREATE TABLE [game].[Games] (
		[Id] int PRIMARY KEY CLUSTERED IDENTITY,
		[Name] varchar(256) NOT NULL
	)
	DBCC CHECKIDENT ('[game].[Games]', RESEED, 0)
END

IF NOT EXISTS (SELECT 1 FROM [sys].[tables] t 
			   INNER JOIN [sys].[schemas] s ON (t.[schema_id] = s.[schema_id]) WHERE s.[name] = 'game' and t.[name] = 'Audio')
BEGIN
	CREATE TABLE [game].[Audio] (
		[Id] int PRIMARY KEY CLUSTERED IDENTITY,
		[AudioTypeId] int NOT NULL FOREIGN KEY REFERENCES [compjs].[AudioTypes]([Id]),
		[AudioFile] varchar(1000) NOT NULL,
		[Name] varchar(256) NOT NULL,
		[GameId] int NOT NULL FOREIGN KEY REFERENCES [game].[Games]([Id])
	)
	CREATE NONCLUSTERED INDEX IX__Audio__GameId ON [game].[Audio]([GameId])
	INCLUDE([AudioTypeId], [AudioFile], [Name])
	DBCC CHECKIDENT ('[game].[Audio]', RESEED, 0)
END

IF NOT EXISTS (SELECT 1 FROM [sys].[tables] t 
			   INNER JOIN [sys].[schemas] s ON (t.[schema_id] = s.[schema_id]) WHERE s.[name] = 'game' and t.[name] = 'EntityTypes')
BEGIN
	CREATE TABLE [game].[EntityTypes] (
		[Id] int PRIMARY KEY NONCLUSTERED IDENTITY,
		[Name] varchar(256) NOT NULL,
		[GameId] int NOT NULL FOREIGN KEY REFERENCES [game].[Games]([Id])
	)
	CREATE NONCLUSTERED INDEX IX__EntityTypes__GameId ON [game].[EntityTypes]([GameId])
	INCLUDE([Name])
	DBCC CHECKIDENT ('[game].[EntityTypes]', RESEED, 0)
END

IF NOT EXISTS (SELECT 1 FROM [sys].[tables] t 
			   INNER JOIN [sys].[schemas] s ON (t.[schema_id] = s.[schema_id]) WHERE s.[name] = 'game' and t.[name] = 'BhvCompDefinitions')
BEGIN
	CREATE TABLE [game].[BhvCompDefinitions] (
		[Id] int PRIMARY KEY NONCLUSTERED IDENTITY,
		[EntityTypeId] int NOT NULL FOREIGN KEY REFERENCES [game].[EntityTypes]([Id]),
		[StateFile] varchar(1000) NOT NULL,
		[BehaviorConstructor] varchar(256) NOT NULL
	)
	CREATE UNIQUE CLUSTERED INDEX IX__BhvCompDefinitions__EntityTypeId ON [game].[BhvCompDefinitions]([EntityTypeId])
	DBCC CHECKIDENT ('[game].[BhvCompDefinitions]', RESEED, 0)
END

IF NOT EXISTS (SELECT 1 FROM [sys].[tables] t 
			   INNER JOIN [sys].[schemas] s ON (t.[schema_id] = s.[schema_id]) WHERE s.[name] = 'game' and t.[name] = 'GfxCompDefinitions')
BEGIN
	CREATE TABLE [game].[GfxCompDefinitions] (
		[Id] int PRIMARY KEY NONCLUSTERED IDENTITY,
		[EntityTypeId] int NOT NULL FOREIGN KEY REFERENCES [game].[EntityTypes]([Id])
	)
	CREATE UNIQUE CLUSTERED INDEX IX__GfxCompDefinitions__EntityTypeId ON [game].[GfxCompDefinitions]([EntityTypeId])
	DBCC CHECKIDENT ('[game].[GfxCompDefinitions]', RESEED, 0)
END

IF NOT EXISTS (SELECT 1 FROM [sys].[tables] t 
			   INNER JOIN [sys].[schemas] s ON (t.[schema_id] = s.[schema_id]) WHERE s.[name] = 'game' and t.[name] = 'AnimationStateDefinitions')
BEGIN
	CREATE TABLE [game].[AnimationStateDefinitions] (
		[Id] int PRIMARY KEY CLUSTERED IDENTITY,
		[GfxCompDefinitionId] int NOT NULL FOREIGN KEY REFERENCES [game].[GfxCompDefinitions]([Id]),
		[State] int NOT NULL
	)
	CREATE NONCLUSTERED INDEX IX__AnimationStateDefinitions__GfxCompDefinitionId ON [game].[AnimationStateDefinitions]([GfxCompDefinitionId])
	INCLUDE([State])
	DBCC CHECKIDENT ('[game].[AnimationStateDefinitions]', RESEED, 0)
END

IF NOT EXISTS (SELECT 1 FROM [sys].[tables] t 
			   INNER JOIN [sys].[schemas] s ON (t.[schema_id] = s.[schema_id]) WHERE s.[name] = 'game' and t.[name] = 'AnimationFrameDefinitions')
BEGIN
	CREATE TABLE [game].[AnimationFrameDefinitions] (
		[Id] int PRIMARY KEY CLUSTERED IDENTITY,
		[AnimationStateDefinitionId] int NOT NULL FOREIGN KEY REFERENCES [game].[AnimationStateDefinitions]([Id]),
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
	CREATE NONCLUSTERED INDEX IX__AnimationFrameDefinitions__AnimationStateDefinitionId ON [game].[AnimationFrameDefinitions]([AnimationStateDefinitionId])
	INCLUDE([Frame], [Texture], [Width], [Height], [TexCoordTL], [TexCoordTR], [TexCoordBR], [TexCoordBL])
	DBCC CHECKIDENT ('[game].[AnimationFrameDefinitions]', RESEED, 0)
END

IF NOT EXISTS (SELECT 1 FROM [sys].[tables] t 
			   INNER JOIN [sys].[schemas] s ON (t.[schema_id] = s.[schema_id]) WHERE s.[name] = 'game' and t.[name] = 'FontTextureDefinitions')
BEGIN
	CREATE TABLE [game].[FontTextureDefinitions] (
		[Id] int PRIMARY KEY CLUSTERED IDENTITY,
		[GfxCompDefinitionId] int NOT NULL FOREIGN KEY REFERENCES [game].[GfxCompDefinitions]([Id]),
		[Texture] varchar(1000) NOT NULL,
		[CharacterWidth] float NOT NULL,
		[CharacterHeight] float NOT NULL,
	)
	CREATE NONCLUSTERED INDEX IX__FontTextureDefinitions__GfxCompDefinitionId ON [game].[FontTextureDefinitions]([GfxCompDefinitionId])
	INCLUDE([Texture], [CharacterWidth], [CharacterHeight])
	DBCC CHECKIDENT ('[game].[FontTextureDefinitions]', RESEED, 0)
END

IF NOT EXISTS (SELECT 1 FROM [sys].[tables] t 
			   INNER JOIN [sys].[schemas] s ON (t.[schema_id] = s.[schema_id]) WHERE s.[name] = 'game' and t.[name] = 'PhysCompDefinitions')
BEGIN
	CREATE TABLE [game].[PhysCompDefinitions] (
		[Id] int PRIMARY KEY NONCLUSTERED IDENTITY,
		[EntityTypeId] int NOT NULL FOREIGN KEY REFERENCES [game].[EntityTypes]([Id]),
		[PhysTypeId] int NOT NULL FOREIGN KEY REFERENCES [compjs].[PhysTypes]([Id]),
		[CollisionTypeId] int NOT NULL FOREIGN KEY REFERENCES [compjs].[CollisionTypes]([Id]),
		[BoundingData] varchar(1000) NOT NULL
	)
	CREATE UNIQUE CLUSTERED INDEX IX__PhysCompDefinitions__EntityTypeId ON [game].[PhysCompDefinitions]([EntityTypeId])
	DBCC CHECKIDENT ('[game].[PhysCompDefinitions]', RESEED, 0)
END

IF NOT EXISTS (SELECT 1 FROM [sys].[tables] t 
			   INNER JOIN [sys].[schemas] s ON (t.[schema_id] = s.[schema_id]) WHERE s.[name] = 'game' and t.[name] = 'Shaders')
BEGIN
	CREATE TABLE [game].[Shaders] (
		[Id] int PRIMARY KEY NONCLUSTERED IDENTITY,
		[Name] varchar(256) NOT NULL,
		[ShaderFile] varchar(1000) NOT NULL,
		[GameId] int NOT NULL FOREIGN KEY REFERENCES [game].[Games]([Id])
	)
	CREATE NONCLUSTERED INDEX IX__Shaders__GameId ON [game].[Shaders]([GameId])
	INCLUDE([Name])
	DBCC CHECKIDENT ('[game].[Shaders]', RESEED, 0)
END

IF NOT EXISTS (SELECT 1 FROM [sys].[tables] t 
			   INNER JOIN [sys].[schemas] s ON (t.[schema_id] = s.[schema_id]) WHERE s.[name] = 'game' and t.[name] = 'Levels')
BEGIN
	CREATE TABLE [game].[Levels] (
		[Id] int PRIMARY KEY CLUSTERED IDENTITY,
		[Order] int NOT NULL,
		[Name] varchar(256) NULL,
		[GameId] int NOT NULL FOREIGN KEY REFERENCES [game].[Games]([Id])
	)
	CREATE NONCLUSTERED INDEX IX__Levels__GameId ON [game].[Levels]([GameId])
	INCLUDE([Order], [Name])
	DBCC CHECKIDENT ('[game].[Levels]', RESEED, 0)
END

IF NOT EXISTS (SELECT 1 FROM [sys].[tables] t 
			   INNER JOIN [sys].[schemas] s ON (t.[schema_id] = s.[schema_id]) WHERE s.[name] = 'game' and t.[name] = 'LevelLayouts')
BEGIN
	CREATE TABLE [game].[LevelLayouts] (
		[Id] int PRIMARY KEY CLUSTERED IDENTITY,
		[LevelId] int NOT NULL FOREIGN KEY REFERENCES [game].[Levels]([Id]),
		[EntityTypeId] int NOT NULL FOREIGN KEY REFERENCES [game].[EntityTypes]([Id]),
		[X] float NOT NULL,
		[Y] float NOT NULL
	)
	CREATE NONCLUSTERED INDEX IX__LevelLayouts__LevelId ON [game].[LevelLayouts]([LevelId])
	INCLUDE([EntityTypeId], [X], [Y])
	DBCC CHECKIDENT ('[game].[LevelLayouts]', RESEED, 0)
END

IF NOT EXISTS (SELECT 1 FROM [sys].[tables] t 
			   INNER JOIN [sys].[schemas] s ON (t.[schema_id] = s.[schema_id]) WHERE s.[name] = 'game' and t.[name] = 'EntityTypesOnAllLevels')
BEGIN
	CREATE TABLE [game].[EntityTypesOnAllLevels] (
		[Id] int PRIMARY KEY NONCLUSTERED IDENTITY,
		[EntityTypeId] int FOREIGN KEY REFERENCES [game].[EntityTypes]([Id]),
		[GameId] int NOT NULL FOREIGN KEY REFERENCES [game].[Games]([Id])
	)
	CREATE CLUSTERED INDEX IX__EntityTypesOnAllLevels__GameId ON [game].[EntityTypesOnAllLevels]([GameId])
	DBCC CHECKIDENT ('[game].[EntityTypesOnAllLevels]', RESEED, 0)
END

IF NOT EXISTS (SELECT 1 FROM [sys].[tables] t 
			   INNER JOIN [sys].[schemas] s ON (t.[schema_id] = s.[schema_id]) WHERE s.[name] = 'game' and t.[name] = 'HighScores')
BEGIN
	CREATE TABLE [game].[HighScores] (
		[Id] int PRIMARY KEY NONCLUSTERED IDENTITY,
		[PlayerName] varchar(100) NOT NULL,
		[Score] bigint NOT NULL,
		[GameId] int NOT NULL FOREIGN KEY REFERENCES [game].[Games]([Id])
	)
	CREATE CLUSTERED INDEX IX__HighScores__GameId ON [game].[HighScores]([GameId])
	DBCC CHECKIDENT ('[game].[HighScores]', RESEED, 0)
END