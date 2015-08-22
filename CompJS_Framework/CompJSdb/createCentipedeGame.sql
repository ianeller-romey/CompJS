USE [CompJSdb]

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

IF NOT EXISTS (SELECT [Id] FROM [compjs].[PhysTypes] WHERE [Name] = 'AABB')
BEGIN
	EXEC [dev].[dev_CreatePhysType]
		@name = 'AABB'
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

DECLARE @gameId int
IF NOT EXISTS (SELECT [Id] FROM [game].[Games] WHERE [Name] = 'Centipede')
BEGIN
	EXEC [dev].[dev_CreateGame]
		@name = 'Centipede'
		
END
SELECT @gameId = [Id] FROM [game].[Games] WHERE [Name] = 'Centipede'

DECLARE @levelId int
IF NOT EXISTS (SELECT [Id] FROM [game].[Levels] WHERE [GameId] = @gameId AND [Order] = 0)
BEGIN
	EXEC [dev].[dev_CreateLevel]
		@order = 0,
		@name = null,
		@gameId = @gameId
		
END
SELECT @levelId = [Id] FROM [game].[Levels] WHERE [GameId] = @gameId AND [Order] = 0

DECLARE @id int
DECLARE @compDefinitionId int
DECLARE @altId int
DECLARE @altAltId int
DECLARE @levelLayoutId int
DECLARE @name varchar(256)

IF NOT EXISTS (SELECT [Id] FROM [game].[EntityTypes] WHERE [GameId] = @gameId AND [Name] = 'Mushroom')
BEGIN
	EXEC @id = [dev].[dev_CreateEntityType]
		@name = 'Mushroom',
		@gameId = @gameId
		
	IF NOT EXISTS (SELECT [Id] FROM [game].[BhvCompDefinitions] WHERE [EntityTypeId] = @id)
	BEGIN
		EXEC @compDefinitionId = [dev].[dev_CreateBhvCompDefinition]
			@entityTypeId = @id,
			@stateFile = 'http://arcade/cabinet/compjs/lib/behaviors/centipede/behavior-mushroom.js',
			@behaviorConstructor = 'BehaviorMushroom'
			
	END
		
	IF NOT EXISTS (SELECT [Id] FROM [game].[GfxCompDefinitions] WHERE [EntityTypeId] = @id)
	BEGIN
		EXEC @compDefinitionId = [dev].[dev_CreateGfxCompDefinition]
			@entityTypeId = @id
	
		EXEC @altId = [dev].[dev_CreateAnimationStateDefinition]
			@gfxCompDefinitionId = @compDefinitionId,
			@state = 0
			
		EXEC @altAltId = [dev].[dev_CreateAnimationFrameDefinitionFromPixels]
			@animationStateDefinitionId = @altId,
			@frame = 0,
			@duration = null,
			@texture = 'http://arcade/cabinet/compjs/images/centipede/textures.png',
			@width = 52.0,
			@height = 52.0,
			@pixCoordTL = 0.0,
			@pixCoordTR = 26.0,
			@pixCoordBR = 26.0,
			@pixCoordBL = 0.0,
			@textureWidth = 256.0
	
		EXEC @altId = [dev].[dev_CreateAnimationStateDefinition]
			@gfxCompDefinitionId = @compDefinitionId,
			@state = 1
			
		EXEC @altAltId = [dev].[dev_CreateAnimationFrameDefinitionFromPixels]
			@animationStateDefinitionId = @altId,
			@frame = 0,
			@duration = null,
			@texture = 'http://arcade/cabinet/compjs/images/centipede/textures.png',
			@width = 52.0,
			@height = 52.0,
			@pixCoordTL = 0.0,
			@pixCoordTR = 52.0,
			@pixCoordBR = 26.0,
			@pixCoordBL = 26.0,
			@textureWidth = 256.0
	
		EXEC @altId = [dev].[dev_CreateAnimationStateDefinition]
			@gfxCompDefinitionId = @compDefinitionId,
			@state = 2
			
		EXEC @altAltId = [dev].[dev_CreateAnimationFrameDefinitionFromPixels]
			@animationStateDefinitionId = @altId,
			@frame = 0,
			@duration = null,
			@texture = 'http://arcade/cabinet/compjs/images/centipede/textures.png',
			@width = 52.0,
			@height = 52.0,
			@pixCoordTL = 0.0,
			@pixCoordTR = 78.0,
			@pixCoordBR = 26.0,
			@pixCoordBL = 52.0,
			@textureWidth = 256.0
	
		EXEC @altId = [dev].[dev_CreateAnimationStateDefinition]
			@gfxCompDefinitionId = @compDefinitionId,
			@state = 3
			
		EXEC @altAltId = [dev].[dev_CreateAnimationFrameDefinitionFromPixels]
			@animationStateDefinitionId = @altId,
			@frame = 0,
			@duration = null,
			@texture = 'http://arcade/cabinet/compjs/images/centipede/textures.png',
			@width = 52.0,
			@height = 52.0,
			@pixCoordTL = 0.0,
			@pixCoordTR = 104.0,
			@pixCoordBR = 26.0,
			@pixCoordBL = 78.0,
			@textureWidth = 256.0
	END
		
	IF NOT EXISTS (SELECT [Id] FROM [game].[PhysCompDefinitions] WHERE [EntityTypeId] = @id)
	BEGIN
		SELECT @altId = [Id] FROM [compjs].[PhysTypes] WHERE [Name] = 'Circle'
		SELECT @altAltId = [Id] FROM [compjs].[CollisionTypes] WHERE [Name] = 'Static'
	
		EXEC @compDefinitionId = [dev].[dev_CreatePhysCompDefinitionWithCircleBoundingData]
			@entityTypeId = @id,
			@physTypeId = @altId,
			@collisionTypeId = @altAltId,
			@originX = 26.0,
			@originY = 26.0,
			@radius = 20.0
	
	END

END

IF NOT EXISTS (SELECT [Id] FROM [game].[EntityTypes] WHERE [GameId] = @gameId AND [Name] = 'MushroomManager')
BEGIN
	EXEC @id = [dev].[dev_CreateEntityType]
		@name = 'MushroomManager',
		@gameId = @gameId
		
	IF NOT EXISTS (SELECT [Id] FROM [game].[BhvCompDefinitions] WHERE [EntityTypeId] = @id)
	BEGIN
		EXEC @compDefinitionId = [dev].[dev_CreateBhvCompDefinition]
			@entityTypeId = @id,
			@stateFile = 'http://arcade/cabinet/compjs/lib/behaviors/centipede/behavior-mushroom-manager.js',
			@behaviorConstructor = 'BehaviorMushroomManager'
			
	END
		
	EXEC [dev].[dev_CreateEntityTypesOnAllLevels]
	@entityTypeId = @id,
	@gameId = @gameId
	
END

IF NOT EXISTS (SELECT [Id] FROM [game].[EntityTypes] WHERE [GameId] = @gameId AND [Name] = 'Player')
BEGIN
	EXEC @id = [dev].[dev_CreateEntityType]
		@name = 'Player',
		@gameId = @gameId
		
	IF NOT EXISTS (SELECT [Id] FROM [game].[BhvCompDefinitions] WHERE [EntityTypeId] = @id)
	BEGIN
		EXEC @compDefinitionId = [dev].[dev_CreateBhvCompDefinition]
			@entityTypeId = @id,
			@stateFile = 'http://arcade/cabinet/compjs/lib/behaviors/centipede/behavior-player.js',
			@behaviorConstructor = 'BehaviorPlayer'
			
	END
		
	IF NOT EXISTS (SELECT [Id] FROM [game].[GfxCompDefinitions] WHERE [EntityTypeId] = @id)
	BEGIN
		EXEC @compDefinitionId = [dev].[dev_CreateGfxCompDefinition]
			@entityTypeId = @id
	
		EXEC @altId = [dev].[dev_CreateAnimationStateDefinition]
			@gfxCompDefinitionId = @compDefinitionId,
			@state = 0
			
		EXEC @altAltId = [dev].[dev_CreateAnimationFrameDefinitionFromPixels]
			@animationStateDefinitionId = @altId,
			@frame = 0,
			@duration = null,
			@texture = 'http://arcade/cabinet/compjs/images/centipede/textures.png',
			@width = 36.0,
			@height = 52.0,
			@pixCoordTL = 0.0,
			@pixCoordTR = 122.0,
			@pixCoordBR = 26.0,
			@pixCoordBL = 104.0,
			@textureWidth = 256.0
			
	END
		
	IF NOT EXISTS (SELECT [Id] FROM [game].[PhysCompDefinitions] WHERE [EntityTypeId] = @id)
	BEGIN
		SELECT @altId = [Id] FROM [compjs].[PhysTypes] WHERE [Name] = 'Circle'
		SELECT @altAltId = [Id] FROM [compjs].[CollisionTypes] WHERE [Name] = 'Nonstatic'
	
		EXEC @compDefinitionId = [dev].[dev_CreatePhysCompDefinitionWithCircleBoundingData]
			@entityTypeId = @id,
			@physTypeId = @altId,
			@collisionTypeId = @altAltId,
			@originX = 18.0,
			@originY = 26.0,
			@radius = 14.0
	
	END

	EXEC [dev].[dev_CreateLevelLayout]
	@levelId = @levelId,
	@entityTypeId = @id,
	@x = 512.0,
	@y = 950.0
		
END

IF NOT EXISTS (SELECT [Id] FROM [game].[EntityTypes] WHERE [GameId] = @gameId AND [Name] = 'PlayerBullet')
BEGIN
	EXEC @id = [dev].[dev_CreateEntityType]
		@name = 'PlayerBullet',
		@gameId = @gameId
		
	IF NOT EXISTS (SELECT [Id] FROM [game].[BhvCompDefinitions] WHERE [EntityTypeId] = @id)
	BEGIN
		EXEC @compDefinitionId = [dev].[dev_CreateBhvCompDefinition]
			@entityTypeId = @id,
			@stateFile = 'http://arcade/cabinet/compjs/lib/behaviors/centipede/behavior-player-bullet.js',
			@behaviorConstructor = 'BehaviorPlayerBullet'
			
	END
		
	IF NOT EXISTS (SELECT [Id] FROM [game].[GfxCompDefinitions] WHERE [EntityTypeId] = @id)
	BEGIN
		EXEC @compDefinitionId = [dev].[dev_CreateGfxCompDefinition]
			@entityTypeId = @id
	
		EXEC @altId = [dev].[dev_CreateAnimationStateDefinition]
			@gfxCompDefinitionId = @compDefinitionId,
			@state = 0
			
		EXEC @altAltId = [dev].[dev_CreateAnimationFrameDefinitionFromPixels]
			@animationStateDefinitionId = @altId,
			@frame = 0,
			@duration = null,
			@texture = 'http://arcade/cabinet/compjs/images/centipede/textures.png',
			@width = 12.0,
			@height = 28.0,
			@pixCoordTL = 0.0,
			@pixCoordTR = 128.0,
			@pixCoordBR = 14.0,
			@pixCoordBL = 122.0,
			@textureWidth = 256.0
			
	END
		
	IF NOT EXISTS (SELECT [Id] FROM [game].[PhysCompDefinitions] WHERE [EntityTypeId] = @id)
	BEGIN
		SELECT @altId = [Id] FROM [compjs].[PhysTypes] WHERE [Name] = 'AABB'
		SELECT @altAltId = [Id] FROM [compjs].[CollisionTypes] WHERE [Name] = 'Ghost'
	
		EXEC @compDefinitionId = [dev].[dev_CreatePhysCompDefinitionWithAABBBoundingData]
			@entityTypeId = @id,
			@physTypeId = @altId,
			@collisionTypeId = @altAltId,
			@originX = 6.0,
			@originY = 14.0,
			@halfWidth = 6.0,
			@halfHeight = 14.0
	
	END
	
END

IF NOT EXISTS (SELECT [Id] FROM [game].[EntityTypes] WHERE [GameId] = @gameId AND [Name] = 'Spider')
BEGIN
	EXEC @id = [dev].[dev_CreateEntityType]
		@name = 'Spider',
		@gameId = @gameId
		
	IF NOT EXISTS (SELECT [Id] FROM [game].[BhvCompDefinitions] WHERE [EntityTypeId] = @id)
	BEGIN
		EXEC @compDefinitionId = [dev].[dev_CreateBhvCompDefinition]
			@entityTypeId = @id,
			@stateFile = 'http://arcade/cabinet/compjs/lib/behaviors/centipede/behavior-spider.js',
			@behaviorConstructor = 'BehaviorSpider'
			
	END
		
	IF NOT EXISTS (SELECT [Id] FROM [game].[GfxCompDefinitions] WHERE [EntityTypeId] = @id)
	BEGIN
		EXEC @compDefinitionId = [dev].[dev_CreateGfxCompDefinition]
			@entityTypeId = @id
	
		EXEC @altId = [dev].[dev_CreateAnimationStateDefinition]
			@gfxCompDefinitionId = @compDefinitionId,
			@state = 0
			
		EXEC @altAltId = [dev].[dev_CreateAnimationFrameDefinitionFromPixels]
			@animationStateDefinitionId = @altId,
			@frame = 0,
			@duration = 50,
			@texture = 'http://arcade/cabinet/compjs/images/centipede/textures.png',
			@width = 96.0,
			@height = 60.0,
			@pixCoordTL = 0.0,
			@pixCoordTR = 176.0,
			@pixCoordBR = 30.0,
			@pixCoordBL = 128.0,
			@textureWidth = 256.0
			
		EXEC @altAltId = [dev].[dev_CreateAnimationFrameDefinitionFromPixels]
			@animationStateDefinitionId = @altId,
			@frame = 1,
			@duration = 50,
			@texture = 'http://arcade/cabinet/compjs/images/centipede/textures.png',
			@width = 96.0,
			@height = 60.0,
			@pixCoordTL = 0.0,
			@pixCoordTR = 225.0,
			@pixCoordBR = 30.0,
			@pixCoordBL = 177.0,
			@textureWidth = 256.0
			
		EXEC @altAltId = [dev].[dev_CreateAnimationFrameDefinitionFromPixels]
			@animationStateDefinitionId = @altId,
			@frame = 2,
			@duration = 50,
			@texture = 'http://arcade/cabinet/compjs/images/centipede/textures.png',
			@width = 96.0,
			@height = 60.0,
			@pixCoordTL = 30.0,
			@pixCoordTR = 176.0,
			@pixCoordBR = 60.0,
			@pixCoordBL = 128.0,
			@textureWidth = 256.0
			
		EXEC @altAltId = [dev].[dev_CreateAnimationFrameDefinitionFromPixels]
			@animationStateDefinitionId = @altId,
			@frame = 3,
			@duration = 50,
			@texture = 'http://arcade/cabinet/compjs/images/centipede/textures.png',
			@width = 96.0,
			@height = 60.0,
			@pixCoordTL = 30.0,
			@pixCoordTR = 225.0,
			@pixCoordBR = 60.0,
			@pixCoordBL = 177.0,
			@textureWidth = 256.0
			
	END
		
	IF NOT EXISTS (SELECT [Id] FROM [game].[PhysCompDefinitions] WHERE [EntityTypeId] = @id)
	BEGIN
		SELECT @altId = [Id] FROM [compjs].[PhysTypes] WHERE [Name] = 'AABB'
		SELECT @altAltId = [Id] FROM [compjs].[CollisionTypes] WHERE [Name] = 'Ghost'
	
		EXEC @compDefinitionId = [dev].[dev_CreatePhysCompDefinitionWithAABBBoundingData]
			@entityTypeId = @id,
			@physTypeId = @altId,
			@collisionTypeId = @altAltId,
			@originX = 48.0,
			@originY = 30.0,
			@halfWidth = 40.0,
			@halfHeight = 25.0
	
	END
	
END

IF NOT EXISTS (SELECT [Id] FROM [game].[EntityTypes] WHERE [GameId] = @gameId AND [Name] = 'SpiderManager')
BEGIN
	EXEC @id = [dev].[dev_CreateEntityType]
		@name = 'SpiderManager',
		@gameId = @gameId
		
	IF NOT EXISTS (SELECT [Id] FROM [game].[BhvCompDefinitions] WHERE [EntityTypeId] = @id)
	BEGIN
		EXEC @compDefinitionId = [dev].[dev_CreateBhvCompDefinition]
			@entityTypeId = @id,
			@stateFile = 'http://arcade/cabinet/compjs/lib/behaviors/centipede/behavior-spider-manager.js',
			@behaviorConstructor = 'BehaviorSpiderManager'
			
	END
		
	EXEC [dev].[dev_CreateEntityTypesOnAllLevels]
	@entityTypeId = @id,
	@gameId = @gameId
	
END

IF NOT EXISTS (SELECT [Id] FROM [game].[Shaders] WHERE [GameId] = @gameId AND [Name] = 'Texture')
BEGIN
	EXEC [dev].[dev_CreateShader]
		@name = 'Texture',
		@shaderFile = 'http://arcade/cabinet/compjs/lib/shaders/centipede/shader-texture.js',
		@gameId = @gameId
	
END

IF NOT EXISTS (SELECT [Id] FROM [game].[Shaders] WHERE [GameId] = @gameId AND [Name] = 'Emboss')
BEGIN
	EXEC [dev].[dev_CreateShader]
		@name = 'Emboss',
		@shaderFile = 'http://arcade/cabinet/compjs/lib/shaders/centipede/shader-emboss.js',
		@gameId = @gameId
	
END

IF NOT EXISTS (SELECT [Id] FROM [game].[Shaders] WHERE [GameId] = @gameId AND [Name] = 'PointLight')
BEGIN
	EXEC [dev].[dev_CreateShader]
		@name = 'PointLight',
		@shaderFile = 'http://arcade/cabinet/compjs/lib/shaders/centipede/shader-point-light.js',
		@gameId = @gameId
	
END

GO