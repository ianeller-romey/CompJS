USE [CentipedeDb]

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
	@name varchar(256)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	INSERT INTO [compjs].[Audio] ([AudioTypeId], [AudioFile], [Name])
	VALUES (@audioTypeId, @audioFile, @name)
	
	RETURN SCOPE_IDENTITY()

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[dev].[dev_CreateBhvComp]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [dev].[dev_CreateBhvComp] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/12/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [dev].[dev_CreateBhvComp]
	@entityId int,
	@stateFile varchar(1000),
	@behaviorConstructor varchar(256)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	INSERT INTO [compjs].[BhvComps] ([EntityId], [StateFile], [BehaviorConstructor])
	VALUES (@entityId, @stateFile, @behaviorConstructor)
	
	RETURN SCOPE_IDENTITY()

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[dev].[dev_CreateGfxComp]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [dev].[dev_CreateGfxComp] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/12/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [dev].[dev_CreateGfxComp]
	@entityId int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	INSERT INTO [compjs].[GfxComps] ([EntityId])
	VALUES (@entityId)
	
	RETURN SCOPE_IDENTITY()

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[dev].[dev_CreateAnimationState]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [dev].[dev_CreateAnimationState] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/13/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [dev].[dev_CreateAnimationState]
	@gfxCompId int,
	@state int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	INSERT INTO [compjs].[AnimationStates] ([GfxCompId], [State])
	VALUES (@gfxCompId, @state)
	
	RETURN SCOPE_IDENTITY()

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[dev].[dev_CreateAnimationFrame]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [dev].[dev_CreateAnimationFrame] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/13/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [dev].[dev_CreateAnimationFrame]
	@animationStateId int,
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

	INSERT INTO [compjs].[AnimationFrames] ([AnimationStateId], [Frame], [Duration], [Texture], [Width], [Height], [TexCoordTL], [TexCoordTR], [TexCoordBR], [TexCoordBL])
	VALUES (@animationStateId, @frame, @duration, @texture, @width, @height, @texCoordTL, @texCoordTR, @texCoordBR, @texCoordBL)
	
	RETURN SCOPE_IDENTITY()

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[dev].[dev_CreateAnimationFrameFromPixels]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [dev].[dev_CreateAnimationFrameFromPixels] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/13/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [dev].[dev_CreateAnimationFrameFromPixels]
	@animationStateId int,
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

	INSERT INTO [compjs].[AnimationFrames] ([AnimationStateId], [Frame], [Duration], [Texture], [Width], [Height], [TexCoordTL], [TexCoordTR], [TexCoordBR], [TexCoordBL])
	VALUES (@animationStateId, @frame, @duration, @texture, @width, @height, @texCoordTL, @texCoordTR, @texCoordBR, @texCoordBL)
	
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

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[dev].[dev_CreatePhysComp]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [dev].[dev_CreatePhysComp] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/12/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [dev].[dev_CreatePhysComp]
	@entityId int,
	@physTypeId int,
	@collisionTypeId int,
	@boundingData varchar(1000)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	INSERT INTO [compjs].[PhysComps] ([EntityId], [PhysTypeId], [CollisionTypeId], [BoundingData])
	VALUES (@entityId, @physTypeId, @collisionTypeId, @boundingData)
	
	RETURN SCOPE_IDENTITY()

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[dev].[dev_CreatePhysCompWithCircleBoundingData]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [dev].[dev_CreatePhysCompWithCircleBoundingData] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/17/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [dev].[dev_CreatePhysCompWithCircleBoundingData]
	@entityId int,
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

	INSERT INTO [compjs].[PhysComps] ([EntityId], [PhysTypeId], [CollisionTypeId], [BoundingData])
	VALUES (@entityId, @physTypeId, @collisionTypeId, @boundingData)
	
	RETURN SCOPE_IDENTITY()

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[dev].[dev_CreatePhysCompWithAABBBoundingData]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [dev].[dev_CreatePhysCompWithAABBBoundingData] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/17/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [dev].[dev_CreatePhysCompWithAABBBoundingData]
	@entityId int,
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

	INSERT INTO [compjs].[PhysComps] ([EntityId], [PhysTypeId], [CollisionTypeId], [BoundingData])
	VALUES (@entityId, @physTypeId, @collisionTypeId, @boundingData)
	
	RETURN SCOPE_IDENTITY()

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[dev].[dev_CreateEntity]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [dev].[dev_CreateEntity] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/12/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [dev].[dev_CreateEntity]
	@name varchar(256)
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	INSERT INTO [compjs].[Entities] ([Name])
	VALUES (@name)
	
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
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	INSERT INTO [game].[Levels]
	DEFAULT VALUES
	
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
	@entityId int,
	@x float,
	@y float
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	INSERT INTO [game].[LevelLayouts] ([LevelId], [EntityId], [X], [Y])
	VALUES (@levelId, @entityId, @x, @y)
	
	RETURN SCOPE_IDENTITY()

END
GO

IF NOT EXISTS (SELECT 1 FROM [dbo].[sysobjects] WHERE [id] = object_id(N'[dev].[dev_CreateEntitiesOnAllLevels]') AND OBJECTPROPERTY([id], N'IsProcedure') = 1)
  EXEC('CREATE PROCEDURE [dev].[dev_CreateEntitiesOnAllLevels] AS SELECT 1')
GO
-- =============================================
-- Author:		Ian Eller-Romey
-- Create date: 8/14/2015
-- Description:	
-- =============================================
ALTER PROCEDURE [dev].[dev_CreateEntitiesOnAllLevels]
	@entityId int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

	INSERT INTO [game].[EntitiesOnAllLevels] ([EntityId])
	VALUES (@entityId)
	
	RETURN SCOPE_IDENTITY()

END
GO