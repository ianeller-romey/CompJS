USE [CompJSdb]

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

/******************************************************************************************************************************************/
/******************************************************************************************************************************************/
/******************************************************************************************************************************************/

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[compjs].[RetrieveAudioTypes]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [compjs].[RetrieveAudioTypes] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/12/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [compjs].[RetrieveAudioTypes]
AS
BEGIN

	SELECT
		[Id]
		,[Name]
	FROM [compjs].[AudioTypes]

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[compjs].[RetrievePhysTypes]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [compjs].[RetrievePhysTypes] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/12/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [compjs].[RetrievePhysTypes]
AS
BEGIN

	SELECT
		[Id]
		,[Name]
	FROM [compjs].[PhysTypes]

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[compjs].[RetrieveCollisionTypes]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [compjs].[RetrieveCollisionTypes] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/12/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [compjs].[RetrieveCollisionTypes]
AS
BEGIN

	SELECT
		[Id]
		,[Name]
	FROM [compjs].[CollisionTypes]

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[game].[RetrieveAllGames]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [game].[RetrieveAllGames] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/19/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [game].[RetrieveAllGames]
AS
BEGIN

	SELECT
		[Id]
		,[Name]
	FROM [game].[Games]

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[game].[RetrieveAllAudioForGame]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [game].[RetrieveAllAudioForGame] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/12/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [game].[RetrieveAllAudioForGame]
	@gameId int
AS
BEGIN

	SELECT
		[Id]
		,[AudioTypeId]
		,[AudioFile]
		,[Name]
	FROM [game].[Audio]
	WHERE [GameId] = @gameId

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[game].[RetrieveBhvCompDefinitionForEntity]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [game].[RetrieveBhvCompDefinitionForEntity] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/12/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [game].[RetrieveBhvCompDefinitionForEntity]
	@entityTypeId int
AS
BEGIN

	SELECT
		[Id]
		,[EntityTypeId]
		,[StateFile]
		,[BehaviorConstructor]
	FROM [game].[BhvCompDefinitions]
	WHERE [EntityTypeId] = @entityTypeId

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[game].[RetrieveBhvCompDefinition]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [game].[RetrieveBhvCompDefinition] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/15/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [game].[RetrieveBhvCompDefinition]
	@id int
AS
BEGIN

	SELECT
		[Id]
		,[EntityTypeId]
		,[StateFile]
		,[BehaviorConstructor]
	FROM [game].[BhvCompDefinitions]
	WHERE [Id] = @id

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[game].[RetrieveAllBhvCompDefinitionsForGame]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [game].[RetrieveAllBhvCompDefinitionsForGame] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/15/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [game].[RetrieveAllBhvCompDefinitionsForGame]
	@gameId int
AS
BEGIN

	SELECT
		bhv.[Id]
		,bhv.[EntityTypeId]
		,bhv.[StateFile]
		,bhv.[BehaviorConstructor]
	FROM [game].[BhvCompDefinitions] bhv
	INNER JOIN [game].[EntityTypes] ent
	ON bhv.[EntityTypeId] = ent.[Id]
	WHERE ent.[GameId] = @gameId

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[game].[RetrieveGfxCompDefinitionForEntity]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [game].[RetrieveGfxCompDefinitionForEntity] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/12/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [game].[RetrieveGfxCompDefinitionForEntity]
	@entityTypeId int
AS
BEGIN

	SELECT
		[Id]
		,[EntityTypeId]
	FROM [game].[GfxCompDefinitions]
	WHERE [EntityTypeId] = @entityTypeId

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[game].[RetrieveGfxCompDefinition]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [game].[RetrieveGfxCompDefinition] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/15/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [game].[RetrieveGfxCompDefinition]
	@id int
AS
BEGIN

	SELECT
		[Id]
		,[EntityTypeId]
	FROM [game].[GfxCompDefinitions]
	WHERE [Id] = @id

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[game].[RetrieveAllGfxCompDefinitionsForGame]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [game].[RetrieveAllGfxCompDefinitionsForGame] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/15/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [game].[RetrieveAllGfxCompDefinitionsForGame]
	@gameId int
AS
BEGIN

	SELECT
		gfx.[Id]
		,gfx.[EntityTypeId]
	FROM [game].[GfxCompDefinitions] gfx
	INNER JOIN [game].[EntityTypes] ent
	ON gfx.[EntityTypeId] = ent.[Id]
	WHERE ent.[GameId] = @gameId

	SELECT
		anis.[Id]
		,anis.[GfxCompDefinitionId]
		,anis.[State]
	FROM [game].[AnimationStateDefinitions] anis
	INNER JOIN [game].[GfxCompDefinitions] gfx
	ON anis.[GfxCompDefinitionId] = gfx.[Id]
	INNER JOIN [game].[EntityTypes] ent
	ON gfx.[EntityTypeId] = ent.[Id]
	WHERE ent.[GameId] = @gameId

	SELECT
		anif.[Id]
		,anif.[AnimationStateDefinitionId]
		,anif.[Frame]
		,anif.[Duration]
		,anif.[Texture]
		,anif.[Width]
		,anif.[Height]
		,anif.[TexCoordTL]
		,anif.[TexCoordTR]
		,anif.[TexCoordBR]
		,anif.[TexCoordBL]
	FROM [game].[AnimationFrameDefinitions] anif
	INNER JOIN [game].[AnimationStateDefinitions] anis
	ON anif.[AnimationStateDefinitionId] = anis.[Id]
	INNER JOIN [game].[GfxCompDefinitions] gfx
	ON anis.[GfxCompDefinitionId] = gfx.[Id]
	INNER JOIN [game].[EntityTypes] ent
	ON gfx.[EntityTypeId] = ent.[Id]
	WHERE ent.[GameId] = @gameId
	
	/* TODO: SELECT FONTS */

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[game].[RetrieveAnimationStateDefinitionsForGfxCompDefinition]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [game].[RetrieveAnimationStateDefinitionsForGfxCompDefinition] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/13/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [game].[RetrieveAnimationStateDefinitionsForGfxCompDefinition]
	@gfxCompDefinitionId int
AS
BEGIN

	SELECT
		[Id]
		,[GfxCompDefinitionId]
		,[State]
	FROM [game].[AnimationStateDefinitions]
	WHERE [GfxCompDefinitionId] = @gfxCompDefinitionId

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[game].[RetrieveAnimationFrameDefinitionsForAnimationStateDefinition]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [game].[RetrieveAnimationFrameDefinitionsForAnimationStateDefinition] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/13/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [game].[RetrieveAnimationFrameDefinitionsForAnimationStateDefinition]
	@animationStateDefinitionId int
AS
BEGIN

	SELECT
		[Id]
		,[AnimationStateDefinitionId]
		,[Frame]
		,[Duration]
		,[Texture]
		,[Width]
		,[Height]
		,[TexCoordTL]
		,[TexCoordTR]
		,[TexCoordBR]
		,[TexCoordBL]
	FROM [game].[AnimationFrameDefinitions]
	WHERE [AnimationStateDefinitionId] = @animationStateDefinitionId

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[game].[RetrieveFontTextureDefinitionsForGfxComp]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [game].[RetrieveFontTextureDefinitionsForGfxComp] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/24/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [game].[RetrieveFontTextureDefinitionsForGfxComp]
	@gfxCompDefinitionId int
AS
BEGIN

	SELECT
		[Id]
		,[GfxCompDefinitionId]
		,[Texture]
		,[CharacterWidth]
		,[CharacterHeight]
	FROM [game].[FontTextureDefinitions]
	WHERE [GfxCompDefinitionId] = @gfxCompDefinitionId

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[game].[RetrievePhysCompDefinitionForEntity]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [game].[RetrievePhysCompDefinitionForEntity] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/12/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [game].[RetrievePhysCompDefinitionForEntity]
	@entityTypeId int
AS
BEGIN

	SELECT
		[Id]
		,[EntityTypeId]
		,[PhysTypeId]
		,[CollisionTypeId]
		,[BoundingData]
	FROM [game].[PhysCompDefinitions]
	WHERE [EntityTypeId] = @entityTypeId

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[game].[RetrievePhysCompDefinition]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [game].[RetrievePhysCompDefinition] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/15/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [game].[RetrievePhysCompDefinition]
	@id int
AS
BEGIN

	SELECT
		[Id]
		,[EntityTypeId]
		,[PhysTypeId]
		,[CollisionTypeId]
		,[BoundingData]
	FROM [game].[PhysCompDefinitions]
	WHERE [Id] = @id

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[game].[RetrieveAllPhysCompDefinitionsForGame]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [game].[RetrieveAllPhysCompDefinitionsForGame] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/15/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [game].[RetrieveAllPhysCompDefinitionsForGame]
	@gameId int
AS
BEGIN

	SELECT
		phys.[Id]
		,phys.[EntityTypeId]
		,phys.[PhysTypeId]
		,phys.[CollisionTypeId]
		,phys.[BoundingData]
	FROM [game].[PhysCompDefinitions] phys
	INNER JOIN [game].[EntityTypes] ent
	ON phys.[EntityTypeId] = ent.[Id]
	WHERE ent.[GameId] = @gameId

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[game].[RetrieveEntity]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [game].[RetrieveEntity] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/12/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [game].[RetrieveEntity]
	@entityTypeId int
AS
BEGIN

	SELECT
		[Id]
		,[Name]
		,[GameId]
	FROM [game].[EntityTypes]
	WHERE [Id] = @entityTypeId

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[game].[RetrieveAllEntityTypeDefinitionsForGame]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [game].[RetrieveAllEntityTypeDefinitionsForGame] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/15/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [game].[RetrieveAllEntityTypeDefinitionsForGame]
	@gameId int
AS
BEGIN

	SELECT
		ent.[Id]
		,ent.[Name]
		,bhv.[Id] AS [Behavior]
		,gfx.[Id] AS [Graphics]
		,phys.[Id] AS [Physics]
	FROM [game].[EntityTypes] ent
	LEFT JOIN [game].[BhvCompDefinitions] bhv
	ON bhv.[EntityTypeId] = ent.[Id]
	LEFT JOIN [game].[GfxCompDefinitions] gfx
	ON gfx.[EntityTypeId] = ent.[Id]
	LEFT JOIN [game].[PhysCompDefinitions] phys
	ON phys.[EntityTypeId] = ent.[Id]
	WHERE ent.[GameId] = @gameId

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[game].[RetrieveAllShadersForGame]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [game].[RetrieveAllShadersForGame] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/19/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [game].[RetrieveAllShadersForGame]
	@gameId int
AS
BEGIN

	SELECT
		[Id]
		,[Name]
		,[ShaderFile]
		,[GameId]
	FROM [game].[Shaders]
	WHERE [GameId] = @gameId

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[game].[RetrieveAllLevelsForGame]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [game].[RetrieveAllLevelsForGame] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/19/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [game].[RetrieveAllLevelsForGame]
	@gameId int
AS
BEGIN

	SELECT
		[Id]
		,[Order]
		,[Name]
		,[GameId]
	FROM [game].[Levels]
	WHERE [GameId] = @gameId
	ORDER BY [Order] ASC

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[game].[RetrieveLevelLayoutsForLevel]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [game].[RetrieveLevelLayoutsForLevel] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/12/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [game].[RetrieveLevelLayoutsForLevel]
	@levelId int
AS
BEGIN

	SELECT
		e.[Id] AS [EntityTypeId],
		e.[Name] AS [EntityTypeName],
		l.[LevelId],
		l.[X],
		l.[Y]
	FROM [game].[LevelLayouts] l
	INNER JOIN [game].[EntityTypes] e
	ON l.[EntityTypeId] = e.[Id]
	WHERE [LevelId] = @levelId

	SELECT
		e.[Id]
		,e.[Name]
		,e.[GameId]
	FROM [game].[EntityTypes] e
	INNER JOIN [game].[EntityTypesOnAllLevels] eoal
	ON eoal.[EntityTypeId] = e.[Id]

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[game].[CreateHighScoreForGame]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [game].[CreateHighScoreForGame] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/12/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [game].[CreateHighScoreForGame]
	@playerName varchar(100),
	@score bigint,
	@gameId int
AS
BEGIN

	INSERT INTO [game].[HighScores] ([PlayerName], [Score], [GameId])
	VALUES(@playerName, @score, @gameId)
	
	RETURN SCOPE_IDENTITY()

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[game].[RetrieveTopHighScoresForGame]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [game].[RetrieveTopHighScoresForGame] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/12/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [game].[RetrieveTopHighScoresForGame]
	@count int,
	@gameId int
AS
BEGIN

	SELECT TOP(@count)
		[Id]
		,[PlayerName]
		,[Score]
		,[GameId]
	FROM [game].[HighScores]
	WHERE [GameId] = @gameId
	ORDER BY [Score] DESC

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[game].[RetrieveAllHighScoresForGame]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [game].[RetrieveAllHighScoresForGame] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/12/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [game].[RetrieveAllHighScoresForGame]
	@gameId int
AS
BEGIN

	SELECT
		[Id]
		,[PlayerName]
		,[Score]
		,[GameId]
	FROM [game].[HighScores]
	WHERE [GameId] = @gameId
	ORDER BY [Score] DESC

END
GO