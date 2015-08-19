USE [CentipedeDb]

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

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[compjs].[RetrieveAllAudio]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [compjs].[RetrieveAllAudio] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/12/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [compjs].[RetrieveAllAudio]
AS
BEGIN

	SELECT
		[Id]
		,[AudioTypeId]
		,[AudioFile]
		,[Name]
	FROM [compjs].[Audio]

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[compjs].[RetrieveBhvCompForEntity]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [compjs].[RetrieveBhvCompForEntity] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/12/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [compjs].[RetrieveBhvCompForEntity]
	@entityId int
AS
BEGIN

	SELECT
		[Id]
		,[EntityId]
		,[StateFile]
		,[BehaviorConstructor]
	FROM [compjs].[BhvComps]
	WHERE [EntityId] = @entityId

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[compjs].[RetrieveBhvComp]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [compjs].[RetrieveBhvComp] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/15/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [compjs].[RetrieveBhvComp]
	@id int
AS
BEGIN

	SELECT
		[Id]
		,[EntityId]
		,[StateFile]
		,[BehaviorConstructor]
	FROM [compjs].[BhvComps]
	WHERE [Id] = @id

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[compjs].[RetrieveAllBhvComps]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [compjs].[RetrieveAllBhvComps] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/15/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [compjs].[RetrieveAllBhvComps]
AS
BEGIN

	SELECT
		[Id]
		,[EntityId]
		,[StateFile]
		,[BehaviorConstructor]
	FROM [compjs].[BhvComps]

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[compjs].[RetrieveGfxCompForEntity]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [compjs].[RetrieveGfxCompForEntity] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/12/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [compjs].[RetrieveGfxCompForEntity]
	@entityId int
AS
BEGIN

	SELECT
		[Id]
		,[EntityId]
	FROM [compjs].[GfxComps]
	WHERE [EntityId] = @entityId

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[compjs].[RetrieveGfxComp]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [compjs].[RetrieveGfxComp] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/15/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [compjs].[RetrieveGfxComp]
	@id int
AS
BEGIN

	SELECT
		[Id]
		,[EntityId]
	FROM [compjs].[GfxComps]
	WHERE [Id] = @id

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[compjs].[RetrieveAllGfxComps]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [compjs].[RetrieveAllGfxComps] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/15/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [compjs].[RetrieveAllGfxComps]
AS
BEGIN

	SELECT
		[Id]
		,[EntityId]
	FROM [compjs].[GfxComps]

	SELECT
		[Id]
		,[GfxCompId]
		,[State]
	FROM [compjs].[AnimationStates]

	SELECT
		[Id]
		,[AnimationStateId]
		,[Frame]
		,[Duration]
		,[Texture]
		,[Width]
		,[Height]
		,[TexCoordTL]
		,[TexCoordTR]
		,[TexCoordBR]
		,[TexCoordBL]
	FROM [compjs].[AnimationFrames]

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[compjs].[RetrieveAnimationStatesForGfxComp]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [compjs].[RetrieveAnimationStatesForGfxComp] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/13/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [compjs].[RetrieveAnimationStatesForGfxComp]
	@gfxCompId int
AS
BEGIN

	SELECT
		[Id]
		,[GfxCompId]
		,[State]
	FROM [compjs].[AnimationStates]
	WHERE [GfxCompId] = @gfxCompId

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[compjs].[RetrieveAnimationFramesForAnimationState]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [compjs].[RetrieveAnimationFramesForAnimationState] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/13/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [compjs].[RetrieveAnimationFramesForAnimationState]
	@animationStateId int
AS
BEGIN

	SELECT
		[Id]
		,[AnimationStateId]
		,[Frame]
		,[Duration]
		,[Texture]
		,[Width]
		,[Height]
		,[TexCoordTL]
		,[TexCoordTR]
		,[TexCoordBR]
		,[TexCoordBL]
	FROM [compjs].[AnimationFrames]
	WHERE [AnimationStateId] = @animationStateId

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

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[compjs].[RetrievePhysCompForEntity]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [compjs].[RetrievePhysCompForEntity] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/12/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [compjs].[RetrievePhysCompForEntity]
	@entityId int
AS
BEGIN

	SELECT
		[Id]
		,[EntityId]
		,[PhysTypeId]
		,[CollisionTypeId]
		,[BoundingData]
	FROM [compjs].[PhysComps]
	WHERE [EntityId] = @entityId

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[compjs].[RetrievePhysComp]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [compjs].[RetrievePhysComp] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/15/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [compjs].[RetrievePhysComp]
	@id int
AS
BEGIN

	SELECT
		[Id]
		,[EntityId]
		,[PhysTypeId]
		,[CollisionTypeId]
		,[BoundingData]
	FROM [compjs].[PhysComps]
	WHERE [Id] = @id

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[compjs].[RetrieveAllPhysComps]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [compjs].[RetrieveAllPhysComps] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/15/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [compjs].[RetrieveAllPhysComps]
AS
BEGIN

	SELECT
		[Id]
		,[EntityId]
		,[PhysTypeId]
		,[CollisionTypeId]
		,[BoundingData]
	FROM [compjs].[PhysComps]

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[compjs].[RetrieveEntity]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [compjs].[RetrieveEntity] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/12/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [compjs].[RetrieveEntity]
	@entityId int
AS
BEGIN

	SELECT
		[Id]
		,[Name]
	FROM [compjs].[Entities]
	WHERE [Id] = @entityId

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[compjs].[RetrieveAllEntityDefinitions]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [compjs].[RetrieveAllEntityDefinitions] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/15/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [compjs].[RetrieveAllEntityDefinitions]
AS
BEGIN

	SELECT
		e.[Id]
		,e.[Name]
		,b.[Id] AS [Behavior]
		,g.[Id] AS [Graphics]
		,p.[Id] AS [Physics]
	FROM [compjs].[Entities] e
	LEFT JOIN [compjs].[BhvComps] b
	ON b.[EntityId] = e.[Id]
	LEFT JOIN [compjs].[GfxComps] g
	ON g.[EntityId] = e.[Id]
	LEFT JOIN [compjs].[PhysComps] p
	ON p.[EntityId] = e.[Id]

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
		e.[Id] AS [EntityId],
		e.[Name] AS [EntityName],
		l.[LevelId],
		l.[X],
		l.[Y]
	FROM [game].[LevelLayouts] l
	INNER JOIN [compjs].[Entities] e
	ON l.[EntityId] = e.[Id]
	WHERE [LevelId] = @levelId

	SELECT
		e.[Id]
		,e.[Name]
	FROM [compjs].[Entities] e
	INNER JOIN [game].[EntitiesOnAllLevels] eoal
	ON eoal.[EntityId] = e.[Id]

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[compjs].[CreateHighScore]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [compjs].[CreateHighScore] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/12/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [compjs].[CreateHighScore]
	@playerName varchar(100),
	@score bigint
AS
BEGIN

	INSERT INTO [game].[HighScores] ([PlayerName], [Score])
	VALUES(@playerName, @score)
	
	SELECT SCOPE_IDENTITY()

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[game].[RetrieveTopHighScores]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [game].[RetrieveTopHighScores] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/12/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [game].[RetrieveTopHighScores]
	@count int
AS
BEGIN

	SELECT TOP(@count)
		[Id]
		,[PlayerName]
		,[Score]
	FROM [game].[HighScores]
	ORDER BY [Score] DESC

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[game].[RetrieveAllHighScores]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [game].[RetrieveAllHighScores] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/12/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [game].[RetrieveAllHighScores]
AS
BEGIN

	SELECT
		[Id]
		,[PlayerName]
		,[Score]
	FROM [game].[HighScores]
	ORDER BY [Score] DESC

END
GO