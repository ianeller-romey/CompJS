USE [CompJSdb]

SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

/******************************************************************************************************************************************/
/******************************************************************************************************************************************/
/******************************************************************************************************************************************/

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[dev].[dev_CreateAudioType]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [dev].[dev_CreateAudioType] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/12/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [dev].[dev_CreateAudioType]
	@name varchar(256)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	INSERT INTO [compjs].[AudioTypes] ([Name])
	VALUES (@name)
	
	RETURN SCOPE_IDENTITY()

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[dev].[dev_CreatePhysType]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [dev].[dev_CreatePhysType] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/12/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [dev].[dev_CreatePhysType]
	@name varchar(256)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	INSERT INTO [compjs].[PhysTypes] ([Name])
	VALUES (@name)
	
	RETURN SCOPE_IDENTITY()

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[dev].[dev_CreateCollisionType]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [dev].[dev_CreateCollisionType] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/12/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [dev].[dev_CreateCollisionType]
	@name varchar(256)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	INSERT INTO [compjs].[CollisionTypes] ([Name])
	VALUES (@name)
	
	RETURN SCOPE_IDENTITY()

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[dev].[dev_CreateGame]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [dev].[dev_CreateGame] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/19/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [dev].[dev_CreateGame]
	@name varchar(256)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	INSERT INTO [game].[Games] ([Name])
	VALUES (@name)
	
	RETURN SCOPE_IDENTITY()

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[dev].[dev_CreateAudio]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [dev].[dev_CreateAudio] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/12/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [dev].[dev_CreateAudio]
	@audioTypeId int,
	@audioFile varchar(1000),
	@name varchar(256),
	@gameId int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	INSERT INTO [game].[Audio] ([AudioTypeId], [AudioFile], [Name], [GameId])
	VALUES (@audioTypeId, @audioFile, @name, @gameId)
	
	RETURN SCOPE_IDENTITY()

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[dev].[dev_CreateEntityType]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [dev].[dev_CreateEntityType] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/12/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [dev].[dev_CreateEntityType]
	@name varchar(256),
	@gameId int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	INSERT INTO [game].[EntityTypes] ([Name], [GameId])
	VALUES (@name, @gameId)
	
	RETURN SCOPE_IDENTITY()

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[dev].[dev_CreateBhvCompDefinition]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [dev].[dev_CreateBhvCompDefinition] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/12/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [dev].[dev_CreateBhvCompDefinition]
	@entityTypeId int,
	@stateFile varchar(1000),
	@behaviorConstructor varchar(256)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	INSERT INTO [game].[BhvCompDefinitions] ([EntityTypeId], [StateFile], [BehaviorConstructor])
	VALUES (@entityTypeId, @stateFile, @behaviorConstructor)
	
	RETURN SCOPE_IDENTITY()

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[dev].[dev_CreateGfxCompDefinition]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [dev].[dev_CreateGfxCompDefinition] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/12/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [dev].[dev_CreateGfxCompDefinition]
	@entityTypeId int,
	@renderPass int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	INSERT INTO [game].[GfxCompDefinitions] ([EntityTypeId], [RenderPass])
	VALUES (@entityTypeId, @renderPass)
	
	RETURN SCOPE_IDENTITY()

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[dev].[dev_CreateAnimationStateDefinition]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [dev].[dev_CreateAnimationStateDefinition] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/13/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [dev].[dev_CreateAnimationStateDefinition]
	@gfxCompDefinitionId int,
	@state int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	INSERT INTO [game].[AnimationStateDefinitions] ([GfxCompDefinitionId], [State])
	VALUES (@gfxCompDefinitionId, @state)
	
	RETURN SCOPE_IDENTITY()

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[dev].[dev_CreateAnimationFrameDefinition]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [dev].[dev_CreateAnimationFrameDefinition] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/13/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [dev].[dev_CreateAnimationFrameDefinition]
	@animationStateDefinitionId int,
	@frame int,
	@duration float,
	@texture varchar(1000),
	@width float,
	@height float,
	@texCoordTL float,
	@texCoordTR float,
	@texCoordBR float,
	@texCoordBL float
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	INSERT INTO [game].[AnimationFrameDefinitions] ([AnimationStateDefinitionId], [Frame], [Duration], [Texture], [Width], [Height], [TexCoordTL], [TexCoordTR], [TexCoordBR], [TexCoordBL])
	VALUES (@animationStateDefinitionId, @frame, @duration, @texture, @width, @height, @texCoordTL, @texCoordTR, @texCoordBR, @texCoordBL)
	
	RETURN SCOPE_IDENTITY()

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[dev].[dev_CreateAnimationFrameDefinitionFromPixels]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [dev].[dev_CreateAnimationFrameDefinitionFromPixels] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/13/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [dev].[dev_CreateAnimationFrameDefinitionFromPixels]
	@animationStateDefinitionId int,
	@frame int,
	@duration float,
	@texture varchar(1000),
	@width float,
	@height float,
	@pixCoordTL float,
	@pixCoordTR float,
	@pixCoordBR float,
	@pixCoordBL float,
	@textureWidth float
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	
	DECLARE @texCoordTL float
	DECLARE @texCoordTR float
	DECLARE @texCoordBR float
	DECLARE @texCoordBL float
	
	SET @texCoordTL = (2 * @pixCoordTL + 1)/(2 * @textureWidth)
	SET @texCoordTR = (2 * @pixCoordTR + 1)/(2 * @textureWidth)
	SET @texCoordBR = (2 * @pixCoordBR + 1)/(2 * @textureWidth)
	SET @texCoordBL = (2 * @pixCoordBL + 1)/(2 * @textureWidth)

	INSERT INTO [game].[AnimationFrameDefinitions] ([AnimationStateDefinitionId], [Frame], [Duration], [Texture], [Width], [Height], [TexCoordTL], [TexCoordTR], [TexCoordBR], [TexCoordBL])
	VALUES (@animationStateDefinitionId, @frame, @duration, @texture, @width, @height, @texCoordTL, @texCoordTR, @texCoordBR, @texCoordBL)
	
	RETURN SCOPE_IDENTITY()

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[dev].[dev_CreateFontTextureDefinition]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [dev].[dev_CreateFontTextureDefinition] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/24/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [dev].[dev_CreateFontTextureDefinition]
	@gfxCompDefinitionId int,
	@texture varchar(1000),
	@textureWidth float,
	@startT float,
	@startL float,
	@characterWidth float,
	@characterHeight float
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	INSERT INTO [game].[FontTextureDefinitions] ([GfxCompDefinitionId], [Texture], [TextureWidth], [StartT], [StartL], [CharacterWidth], [CharacterHeight])
	VALUES (@gfxCompDefinitionId, @texture, @textureWidth, @startT, @startL, @characterWidth, @characterHeight)
	
	RETURN SCOPE_IDENTITY()

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[dev].[dev_CreatePhysCompDefinition]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [dev].[dev_CreatePhysCompDefinition] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/12/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [dev].[dev_CreatePhysCompDefinition]
	@entityTypeId int,
	@physTypeId int,
	@collisionTypeId int,
	@boundingData varchar(1000)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	INSERT INTO [game].[PhysCompDefinitions] ([EntityTypeId], [PhysTypeId], [CollisionTypeId], [BoundingData])
	VALUES (@entityTypeId, @physTypeId, @collisionTypeId, @boundingData)
	
	RETURN SCOPE_IDENTITY()

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[dev].[dev_CreatePhysCompDefinitionWithCircleBoundingData]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [dev].[dev_CreatePhysCompDefinitionWithCircleBoundingData] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/17/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [dev].[dev_CreatePhysCompDefinitionWithCircleBoundingData]
	@entityTypeId int,
	@physTypeId int,
	@collisionTypeId int,
	@originX float,
	@originY float,
	@radius float
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	
	DECLARE @boundingData varchar(1000)
	SET @boundingData = '{"origin":{"x":' + LTRIM(STR(@originX)) + ',"y":' + LTRIM(STR(@originY)) + '}, "radius":' + LTRIM(STR(@radius)) + '}'

	INSERT INTO [game].[PhysCompDefinitions] ([EntityTypeId], [PhysTypeId], [CollisionTypeId], [BoundingData])
	VALUES (@entityTypeId, @physTypeId, @collisionTypeId, @boundingData)
	
	RETURN SCOPE_IDENTITY()

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[dev].[dev_CreatePhysCompDefinitionWithAABBBoundingData]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [dev].[dev_CreatePhysCompDefinitionWithAABBBoundingData] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/17/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [dev].[dev_CreatePhysCompDefinitionWithAABBBoundingData]
	@entityTypeId int,
	@physTypeId int,
	@collisionTypeId int,
	@originX float,
	@originY float,
	@halfWidth float,
	@halfHeight float
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;
	
	DECLARE @boundingData varchar(1000)
	SET @boundingData = '{"origin":{"x":' + LTRIM(STR(@originX)) + ',"y":' + LTRIM(STR(@originY)) + '}, "halfValues":{"width":' + LTRIM(STR(@halfWidth)) + ',"height":' + LTRIM(STR(@halfHeight)) + '}' + '}'

	INSERT INTO [game].[PhysCompDefinitions] ([EntityTypeId], [PhysTypeId], [CollisionTypeId], [BoundingData])
	VALUES (@entityTypeId, @physTypeId, @collisionTypeId, @boundingData)
	
	RETURN SCOPE_IDENTITY()

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[dev].[dev_CreateShader]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [dev].[dev_CreateShader] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/19/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [dev].[dev_CreateShader]
	@name varchar(256),
	@shaderFile varchar(1000),
	@gameId int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	INSERT INTO [game].[Shaders] ([Name], [ShaderFile], [GameId])
	VALUES (@name, @shaderFile, @gameId)
	
	RETURN SCOPE_IDENTITY()

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[dev].[dev_CreateLevel]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [dev].[dev_CreateLevel] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/12/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [dev].[dev_CreateLevel]
	@order int,
	@name varchar(256),
	@gameId int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	INSERT INTO [game].[Levels] ([Order], [Name], [GameId])
	VALUES(@order, @name, @gameId)
	
	RETURN SCOPE_IDENTITY()

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[dev].[dev_CreateLevelLayout]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [dev].[dev_CreateLevelLayout] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/14/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [dev].[dev_CreateLevelLayout]
	@levelId int,
	@entityTypeId int,
	@x float,
	@y float
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	INSERT INTO [game].[LevelLayouts] ([LevelId], [EntityTypeId], [X], [Y])
	VALUES (@levelId, @entityTypeId, @x, @y)
	
	RETURN SCOPE_IDENTITY()

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[dev].[dev_CreateEntityTypesOnAllLevels]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [dev].[dev_CreateEntityTypesOnAllLevels] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/14/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [dev].[dev_CreateEntityTypesOnAllLevels]
	@entityTypeId int,
	@gameId int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	INSERT INTO [game].[EntityTypesOnAllLevels] ([EntityTypeId], [GameId])
	VALUES (@entityTypeId, @gameId)
	
	RETURN SCOPE_IDENTITY()

END
GO