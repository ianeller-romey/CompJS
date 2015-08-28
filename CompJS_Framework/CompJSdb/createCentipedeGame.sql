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
			@width = 16.0,
			@height = 16.0,
			@pixCoordTL = 0.0,
			@pixCoordTR = 16.0,
			@pixCoordBR = 16.0,
			@pixCoordBL = 0.0,
			@textureWidth = 256.0
			
		EXEC @altAltId = [dev].[dev_CreateAnimationFrameDefinitionFromPixels]
			@animationStateDefinitionId = @altId,
			@frame = 1,
			@duration = null,
			@texture = 'http://arcade/cabinet/compjs/images/centipede/textures.png',
			@width = 16.0,
			@height = 16.0,
			@pixCoordTL = 0.0,
			@pixCoordTR = 32.0,
			@pixCoordBR = 16.0,
			@pixCoordBL = 16.0,
			@textureWidth = 256.0
			
		EXEC @altAltId = [dev].[dev_CreateAnimationFrameDefinitionFromPixels]
			@animationStateDefinitionId = @altId,
			@frame = 2,
			@duration = null,
			@texture = 'http://arcade/cabinet/compjs/images/centipede/textures.png',
			@width = 16.0,
			@height = 16.0,
			@pixCoordTL = 0.0,
			@pixCoordTR = 48.0,
			@pixCoordBR = 16.0,
			@pixCoordBL = 32.0,
			@textureWidth = 256.0
			
		EXEC @altAltId = [dev].[dev_CreateAnimationFrameDefinitionFromPixels]
			@animationStateDefinitionId = @altId,
			@frame = 3,
			@duration = null,
			@texture = 'http://arcade/cabinet/compjs/images/centipede/textures.png',
			@width = 16.0,
			@height = 16.0,
			@pixCoordTL = 0.0,
			@pixCoordTR = 64.0,
			@pixCoordBR = 16.0,
			@pixCoordBL = 48.0,
			@textureWidth = 256.0
	
		EXEC @altId = [dev].[dev_CreateAnimationStateDefinition]
			@gfxCompDefinitionId = @compDefinitionId,
			@state = 1
			
		EXEC @altAltId = [dev].[dev_CreateAnimationFrameDefinitionFromPixels]
			@animationStateDefinitionId = @altId,
			@frame = 0,
			@duration = null,
			@texture = 'http://arcade/cabinet/compjs/images/centipede/textures.png',
			@width = 16.0,
			@height = 16.0,
			@pixCoordTL = 17.0,
			@pixCoordTR = 16.0,
			@pixCoordBR = 33.0,
			@pixCoordBL = 0.0,
			@textureWidth = 256.0
			
		EXEC @altAltId = [dev].[dev_CreateAnimationFrameDefinitionFromPixels]
			@animationStateDefinitionId = @altId,
			@frame = 1,
			@duration = null,
			@texture = 'http://arcade/cabinet/compjs/images/centipede/textures.png',
			@width = 16.0,
			@height = 16.0,
			@pixCoordTL = 17.0,
			@pixCoordTR = 32.0,
			@pixCoordBR = 33.0,
			@pixCoordBL = 16.0,
			@textureWidth = 256.0
			
		EXEC @altAltId = [dev].[dev_CreateAnimationFrameDefinitionFromPixels]
			@animationStateDefinitionId = @altId,
			@frame = 2,
			@duration = null,
			@texture = 'http://arcade/cabinet/compjs/images/centipede/textures.png',
			@width = 16.0,
			@height = 16.0,
			@pixCoordTL = 17.0,
			@pixCoordTR = 48.0,
			@pixCoordBR = 32.0,
			@pixCoordBL = 33.0,
			@textureWidth = 256.0
			
		EXEC @altAltId = [dev].[dev_CreateAnimationFrameDefinitionFromPixels]
			@animationStateDefinitionId = @altId,
			@frame = 3,
			@duration = null,
			@texture = 'http://arcade/cabinet/compjs/images/centipede/textures.png',
			@width = 16.0,
			@height = 16.0,
			@pixCoordTL = 17.0,
			@pixCoordTR = 64.0,
			@pixCoordBR = 33.0,
			@pixCoordBL = 48.0,
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
			@originX = 8.0,
			@originY = 8.0,
			@radius = 7.5
	
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
			@width = 16.0,
			@height = 16.0,
			@pixCoordTL = 0.0,
			@pixCoordTR = 81.0,
			@pixCoordBR = 16.0,
			@pixCoordBL = 65.0,
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
			@originX = 8.0,
			@originY = 8.0,
			@radius = 7.0
	
	END

	EXEC [dev].[dev_CreateLevelLayout]
	@levelId = @levelId,
	@entityTypeId = @id,
	@x = 256.0,
	@y = 500.0
		
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
			@width = 2.0,
			@height = 12.0,
			@pixCoordTL = 0.0,
			@pixCoordTR = 84.0,
			@pixCoordBR = 12.0,
			@pixCoordBL = 82.0,
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
			@originX = 1.0,
			@originY = 6.0,
			@halfWidth = 1.0,
			@halfHeight = 6.0
	
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
			@width = 42.0,
			@height = 25.0,
			@pixCoordTL = 0.0,
			@pixCoordTR = 127.0,
			@pixCoordBR = 25.0,
			@pixCoordBL = 85.0,
			@textureWidth = 256.0
			
		EXEC @altAltId = [dev].[dev_CreateAnimationFrameDefinitionFromPixels]
			@animationStateDefinitionId = @altId,
			@frame = 1,
			@duration = 50,
			@texture = 'http://arcade/cabinet/compjs/images/centipede/textures.png',
			@width = 42.0,
			@height = 25.0,
			@pixCoordTL = 0.0,
			@pixCoordTR = 170.0,
			@pixCoordBR = 25.0,
			@pixCoordBL = 128.0,
			@textureWidth = 256.0
			
		EXEC @altAltId = [dev].[dev_CreateAnimationFrameDefinitionFromPixels]
			@animationStateDefinitionId = @altId,
			@frame = 2,
			@duration = 50,
			@texture = 'http://arcade/cabinet/compjs/images/centipede/textures.png',
			@width = 42.0,
			@height = 25.0,
			@pixCoordTL = 26.0,
			@pixCoordTR = 127.0,
			@pixCoordBR = 51.0,
			@pixCoordBL = 85.0,
			@textureWidth = 256.0
			
		EXEC @altAltId = [dev].[dev_CreateAnimationFrameDefinitionFromPixels]
			@animationStateDefinitionId = @altId,
			@frame = 3,
			@duration = 50,
			@texture = 'http://arcade/cabinet/compjs/images/centipede/textures.png',
			@width = 42.0,
			@height = 25.0,
			@pixCoordTL = 26.0,
			@pixCoordTR = 170.0,
			@pixCoordBR = 51.0,
			@pixCoordBL = 128.0,
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
			@originX = 21.0,
			@originY = 12.5,
			@halfWidth = 21.0,
			@halfHeight = 12.5
	
	END
	
END

IF NOT EXISTS (SELECT [Id] FROM [game].[EntityTypes] WHERE [GameId] = @gameId AND [Name] = 'Scorpion')
BEGIN
	EXEC @id = [dev].[dev_CreateEntityType]
		@name = 'Scorpion',
		@gameId = @gameId
		
	IF NOT EXISTS (SELECT [Id] FROM [game].[BhvCompDefinitions] WHERE [EntityTypeId] = @id)
	BEGIN
		EXEC @compDefinitionId = [dev].[dev_CreateBhvCompDefinition]
			@entityTypeId = @id,
			@stateFile = 'http://arcade/cabinet/compjs/lib/behaviors/centipede/behavior-scorpion.js',
			@behaviorConstructor = 'BehaviorScorpion'
			
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
			@width = 32.0,
			@height = 16.0,
			@pixCoordTL = 61.0,
			@pixCoordTR = 223.0,
			@pixCoordBR = 16.0,
			@pixCoordBL = 191.0,
			@textureWidth = 256.0
			
		EXEC @altAltId = [dev].[dev_CreateAnimationFrameDefinitionFromPixels]
			@animationStateDefinitionId = @altId,
			@frame = 1,
			@duration = 50,
			@texture = 'http://arcade/cabinet/compjs/images/centipede/textures.png',
			@width = 32.0,
			@height = 16.0,
			@pixCoordTL = 0.0,
			@pixCoordTR = 256.0,
			@pixCoordBR = 16.0,
			@pixCoordBL = 224.0,
			@textureWidth = 256.0
	
		EXEC @altId = [dev].[dev_CreateAnimationStateDefinition]
			@gfxCompDefinitionId = @compDefinitionId,
			@state = 1
			
		EXEC @altAltId = [dev].[dev_CreateAnimationFrameDefinitionFromPixels]
			@animationStateDefinitionId = @altId,
			@frame = 0,
			@duration = 50,
			@texture = 'http://arcade/cabinet/compjs/images/centipede/textures.png',
			@width = 32.0,
			@height = 16.0,
			@pixCoordTL = 17.0,
			@pixCoordTR = 223.0,
			@pixCoordBR = 33.0,
			@pixCoordBL = 191.0,
			@textureWidth = 256.0
			
		EXEC @altAltId = [dev].[dev_CreateAnimationFrameDefinitionFromPixels]
			@animationStateDefinitionId = @altId,
			@frame = 1,
			@duration = 50,
			@texture = 'http://arcade/cabinet/compjs/images/centipede/textures.png',
			@width = 32.0,
			@height = 16.0,
			@pixCoordTL = 17.0,
			@pixCoordTR = 256.0,
			@pixCoordBR = 33.0,
			@pixCoordBL = 224.0,
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
			@originX = 16.0,
			@originY = 8.0,
			@halfWidth = 16.0,
			@halfHeight = 8.0
	
	END
	
END

IF NOT EXISTS (SELECT [Id] FROM [game].[EntityTypes] WHERE [GameId] = @gameId AND [Name] = 'MinionManager')
BEGIN
	EXEC @id = [dev].[dev_CreateEntityType]
		@name = 'MinionManager',
		@gameId = @gameId
		
	IF NOT EXISTS (SELECT [Id] FROM [game].[BhvCompDefinitions] WHERE [EntityTypeId] = @id)
	BEGIN
		EXEC @compDefinitionId = [dev].[dev_CreateBhvCompDefinition]
			@entityTypeId = @id,
			@stateFile = 'http://arcade/cabinet/compjs/lib/behaviors/centipede/behavior-minion-manager.js',
			@behaviorConstructor = 'BehaviorMinionManager'
			
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