USE [CentipedeDb]

IF NOT EXISTS (SELECT [Id] FROM [compjs].[AudioTypes] WHERE [Name] = 'Sfx')
BEGIN
	EXEC [dev].[dev_CreateAudioType]
		@name = 'Sfx'
END

GO

IF NOT EXISTS (SELECT [Id] FROM [compjs].[AudioTypes] WHERE [Name] = 'Looped')
BEGIN
	EXEC [dev].[dev_CreateAudioType]
		@name = 'Looped'
END

GO

IF NOT EXISTS (SELECT [Id] FROM [compjs].[PhysTypes] WHERE [Name] = 'Circle')
BEGIN
	EXEC [dev].[dev_CreatePhysType]
		@name = 'Circle'
END

GO

IF NOT EXISTS (SELECT [Id] FROM [compjs].[PhysTypes] WHERE [Name] = 'Rect')
BEGIN
	EXEC [dev].[dev_CreatePhysType]
		@name = 'Rect'
END

GO

IF NOT EXISTS (SELECT [Id] FROM [compjs].[CollisionTypes] WHERE [Name] = 'Static')
BEGIN
	EXEC [dev].[dev_CreateCollisionType]
		@name = 'Static'
END

GO

IF NOT EXISTS (SELECT [Id] FROM [compjs].[CollisionTypes] WHERE [Name] = 'Nonstatic')
BEGIN
	EXEC [dev].[dev_CreateCollisionType]
		@name = 'Nonstatic'
END

IF NOT EXISTS (SELECT [Id] FROM [compjs].[CollisionTypes] WHERE [Name] = 'Ghost')
BEGIN
	EXEC [dev].[dev_CreateCollisionType]
		@name = 'Ghost'
END

GO

IF NOT EXISTS (SELECT [Id] FROM [game].[Levels] WHERE [Id] = 0)
BEGIN
	EXEC  [dev].[dev_CreateLevel]
END

GO

DECLARE @id int
DECLARE @compId int
DECLARE @altId int
DECLARE @altAltId int
DECLARE @levelId int
DECLARE @levelLayoutId int
DECLARE @name varchar(256)

IF NOT EXISTS (SELECT [Id] FROM [compjs].[Entities] WHERE [Name] = 'Mushroom')
BEGIN
	EXEC @id = [dev].[dev_CreateEntity]
		@name = 'Mushroom'
		
	IF NOT EXISTS (SELECT [Id] FROM [compjs].[GfxComps] WHERE [EntityId] = @id)
	BEGIN
		EXEC @compId = [dev].[dev_CreateGfxComp]
			@entityId = @id
	
		EXEC @altId = [dev].[dev_CreateAnimationState]
			@gfxCompID = @compId,
			@state = 0
			
		EXEC @altAltId = [dev].[dev_CreateAnimationFrameFromPixels]
			@animationStateId = @altId,
			@frame = 0,
			@duration = null,
			@texture = 'http://arcade/compjs/centipede/images/textures.png',
			@width = 52.0,
			@height = 52.0,
			@pixCoordTL = 0.0,
			@pixCoordTR = 26.0,
			@pixCoordBR = 26.0,
			@pixCoordBL = 0.0,
			@textureWidth = 256.0
	
		EXEC @altId = [dev].[dev_CreateAnimationState]
			@gfxCompID = @compId,
			@state = 1
			
		EXEC @altAltId = [dev].[dev_CreateAnimationFrameFromPixels]
			@animationStateId = @altId,
			@frame = 0,
			@duration = null,
			@texture = 'http://arcade/compjs/centipede/images/textures.png',
			@width = 52.0,
			@height = 52.0,
			@pixCoordTL = 0.0,
			@pixCoordTR = 52.0,
			@pixCoordBR = 26.0,
			@pixCoordBL = 26.0,
			@textureWidth = 256.0
	
		EXEC @altId = [dev].[dev_CreateAnimationState]
			@gfxCompID = @compId,
			@state = 2
			
		EXEC @altAltId = [dev].[dev_CreateAnimationFrameFromPixels]
			@animationStateId = @altId,
			@frame = 0,
			@duration = null,
			@texture = 'http://arcade/compjs/centipede/images/textures.png',
			@width = 52.0,
			@height = 52.0,
			@pixCoordTL = 0.0,
			@pixCoordTR = 78.0,
			@pixCoordBR = 26.0,
			@pixCoordBL = 52.0,
			@textureWidth = 256.0
	
		EXEC @altId = [dev].[dev_CreateAnimationState]
			@gfxCompID = @compId,
			@state = 3
			
		EXEC @altAltId = [dev].[dev_CreateAnimationFrameFromPixels]
			@animationStateId = @altId,
			@frame = 0,
			@duration = null,
			@texture = 'http://arcade/compjs/centipede/images/textures.png',
			@width = 52.0,
			@height = 52.0,
			@pixCoordTL = 0.0,
			@pixCoordTR = 104.0,
			@pixCoordBR = 26.0,
			@pixCoordBL = 78.0,
			@textureWidth = 256.0
	END
		
	IF NOT EXISTS (SELECT [Id] FROM [compjs].[PhysComps] WHERE [EntityId] = @id)
	BEGIN
		SELECT @altId = [Id] FROM [compjs].[PhysTypes] WHERE [Name] = 'Circle'
		SELECT @altAltId = [Id] FROM [compjs].[CollisionTypes] WHERE [Name] = 'Static'
	
		EXEC @compId = [dev].[dev_CreatePhysCompWithCircleBoundingData]
			@entityId = @id,
			@physTypeId = @altId,
			@collisionTypeId = @altAltId,
			@originX = 26.0,
			@originY = 26.0,
			@radius = 20.0
	
	END
		
ELSE
	SELECT @id = [Id] FROM [compjs].[Entities] WHERE [Name] = 'Mushroom'
END

SELECT @levelId = [Id] FROM [game].[Levels] WHERE [Id] = 0
EXEC [dev].[dev_CreateLevelLayout]
@levelId = @levelId,
@entityId = @id,
@x = 10.0,
@y = 10.0

GO

DECLARE @id int
DECLARE @compId int
DECLARE @altId int
DECLARE @altAltId int
DECLARE @levelId int
DECLARE @levelLayoutId int
DECLARE @name varchar(256)

IF NOT EXISTS (SELECT [Id] FROM [compjs].[Entities] WHERE [Name] = 'Player')
BEGIN
	EXEC @id = [dev].[dev_CreateEntity]
		@name = 'Player'
		
	IF NOT EXISTS (SELECT [Id] FROM [compjs].[BhvComps] WHERE [EntityId] = @id)
	BEGIN
		EXEC @compId = [dev].[dev_CreateBhvComp]
			@entityId = @id,
			@stateFile = 'http://arcade/compjs/centipede/lib/behaviors/behavior-player.js',
			@behaviorConstructor = 'BehaviorPlayer'
			
	END
		
	IF NOT EXISTS (SELECT [Id] FROM [compjs].[GfxComps] WHERE [EntityId] = @id)
	BEGIN
		EXEC @compId = [dev].[dev_CreateGfxComp]
			@entityId = @id
	
		EXEC @altId = [dev].[dev_CreateAnimationState]
			@gfxCompID = @compId,
			@state = 0
			
		EXEC @altAltId = [dev].[dev_CreateAnimationFrameFromPixels]
			@animationStateId = @altId,
			@frame = 0,
			@duration = null,
			@texture = 'http://arcade/compjs/centipede/images/textures.png',
			@width = 36.0,
			@height = 52.0,
			@pixCoordTL = 0.0,
			@pixCoordTR = 122.0,
			@pixCoordBR = 26.0,
			@pixCoordBL = 104.0,
			@textureWidth = 256.0
			
	END
		
	IF NOT EXISTS (SELECT [Id] FROM [compjs].[PhysComps] WHERE [EntityId] = @id)
	BEGIN
		SELECT @altId = [Id] FROM [compjs].[PhysTypes] WHERE [Name] = 'Circle'
		SELECT @altAltId = [Id] FROM [compjs].[CollisionTypes] WHERE [Name] = 'Nonstatic'
	
		EXEC @compId = [dev].[dev_CreatePhysCompWithCircleBoundingData]
			@entityId = @id,
			@physTypeId = @altId,
			@collisionTypeId = @altAltId,
			@originX = 18.0,
			@originY = 26.0,
			@radius = 14.0
	
	END
		
ELSE
	SELECT @id = [Id] FROM [compjs].[Entities] WHERE [Name] = 'Player'
END

SELECT @levelId = [Id] FROM [game].[Levels] WHERE [Id] = 0
EXEC [dev].[dev_CreateLevelLayout]
@levelId = @levelId,
@entityId = @id,
@x = 80.0,
@y = 40.0