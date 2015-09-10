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
			@stateFile = 'lib/behaviors/centipede/behavior-mushroom.js',
			@behaviorConstructor = 'BehaviorMushroom'
			
	END
		
	IF NOT EXISTS (SELECT [Id] FROM [game].[GfxCompDefinitions] WHERE [EntityTypeId] = @id)
	BEGIN
		EXEC @compDefinitionId = [dev].[dev_CreateGfxCompDefinition]
			@entityTypeId = @id,
			@renderPass = 0
	
		EXEC @altId = [dev].[dev_CreateAnimationStateDefinition]
			@gfxCompDefinitionId = @compDefinitionId,
			@state = 0
			
		EXEC @altAltId = [dev].[dev_CreateAnimationFrameDefinitionFromPixels]
			@animationStateDefinitionId = @altId,
			@frame = 0,
			@duration = null,
			@texture = 'images/centipede/textures.png',
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
			@texture = 'images/centipede/textures.png',
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
			@texture = 'images/centipede/textures.png',
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
			@texture = 'images/centipede/textures.png',
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
			@texture = 'images/centipede/textures.png',
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
			@texture = 'images/centipede/textures.png',
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
			@texture = 'images/centipede/textures.png',
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
			@texture = 'images/centipede/textures.png',
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

IF NOT EXISTS (SELECT [Id] FROM [game].[EntityTypes] WHERE [GameId] = @gameId AND [Name] = 'MushroomWaiter')
BEGIN
	EXEC @id = [dev].[dev_CreateEntityType]
		@name = 'MushroomWaiter',
		@gameId = @gameId
		
	IF NOT EXISTS (SELECT [Id] FROM [game].[BhvCompDefinitions] WHERE [EntityTypeId] = @id)
	BEGIN
		EXEC @compDefinitionId = [dev].[dev_CreateBhvCompDefinition]
			@entityTypeId = @id,
			@stateFile = 'lib/behaviors/centipede/behavior-mushroom-waiter.js',
			@behaviorConstructor = 'BehaviorMushroomWaiter'
			
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
			@stateFile = 'lib/behaviors/centipede/behavior-mushroom-manager.js',
			@behaviorConstructor = 'BehaviorMushroomManager'
			
	END
	
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
			@stateFile = 'lib/behaviors/centipede/behavior-player.js',
			@behaviorConstructor = 'BehaviorPlayer'
			
	END
		
	IF NOT EXISTS (SELECT [Id] FROM [game].[GfxCompDefinitions] WHERE [EntityTypeId] = @id)
	BEGIN
		EXEC @compDefinitionId = [dev].[dev_CreateGfxCompDefinition]
			@entityTypeId = @id,
			@renderPass = 0
	
		EXEC @altId = [dev].[dev_CreateAnimationStateDefinition]
			@gfxCompDefinitionId = @compDefinitionId,
			@state = 0
			
		EXEC @altAltId = [dev].[dev_CreateAnimationFrameDefinitionFromPixels]
			@animationStateDefinitionId = @altId,
			@frame = 0,
			@duration = null,
			@texture = 'images/centipede/textures.png',
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
			@stateFile = 'lib/behaviors/centipede/behavior-player-bullet.js',
			@behaviorConstructor = 'BehaviorPlayerBullet'
			
	END
		
	IF NOT EXISTS (SELECT [Id] FROM [game].[GfxCompDefinitions] WHERE [EntityTypeId] = @id)
	BEGIN
		EXEC @compDefinitionId = [dev].[dev_CreateGfxCompDefinition]
			@entityTypeId = @id,
			@renderPass = 0
	
		EXEC @altId = [dev].[dev_CreateAnimationStateDefinition]
			@gfxCompDefinitionId = @compDefinitionId,
			@state = 0
			
		EXEC @altAltId = [dev].[dev_CreateAnimationFrameDefinitionFromPixels]
			@animationStateDefinitionId = @altId,
			@frame = 0,
			@duration = null,
			@texture = 'images/centipede/textures.png',
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

IF NOT EXISTS (SELECT [Id] FROM [game].[EntityTypes] WHERE [GameId] = @gameId AND [Name] = 'CentipedeSegment')
BEGIN
	EXEC @id = [dev].[dev_CreateEntityType]
		@name = 'CentipedeSegment',
		@gameId = @gameId
		
	IF NOT EXISTS (SELECT [Id] FROM [game].[BhvCompDefinitions] WHERE [EntityTypeId] = @id)
	BEGIN
		EXEC @compDefinitionId = [dev].[dev_CreateBhvCompDefinition]
			@entityTypeId = @id,
			@stateFile = 'lib/behaviors/centipede/behavior-centipede-segment.js',
			@behaviorConstructor = 'BehaviorCentipedeSegment'
			
	END
		
	IF NOT EXISTS (SELECT [Id] FROM [game].[GfxCompDefinitions] WHERE [EntityTypeId] = @id)
	BEGIN
		EXEC @compDefinitionId = [dev].[dev_CreateGfxCompDefinition]
			@entityTypeId = @id,
			@renderPass = 0
	
		EXEC @altId = [dev].[dev_CreateAnimationStateDefinition]
			@gfxCompDefinitionId = @compDefinitionId,
			@state = 0
			
		EXEC @altAltId = [dev].[dev_CreateAnimationFrameDefinitionFromPixels]
			@animationStateDefinitionId = @altId,
			@frame = 0,
			@duration = 50,
			@texture = 'images/centipede/textures.png',
			@width = 16.0,
			@height = 16.0,
			@pixCoordTL = 34.0,
			@pixCoordTR = 16.0,
			@pixCoordBR = 50.0,
			@pixCoordBL = 0.0,
			@textureWidth = 256.0
			
		EXEC @altAltId = [dev].[dev_CreateAnimationFrameDefinitionFromPixels]
			@animationStateDefinitionId = @altId,
			@frame = 1,
			@duration = 50,
			@texture = 'images/centipede/textures.png',
			@width = 16.0,
			@height = 16.0,
			@pixCoordTL = 34.0,
			@pixCoordTR = 33.0,
			@pixCoordBR = 50.0,
			@pixCoordBL = 17.0,
			@textureWidth = 256.0
	
		EXEC @altId = [dev].[dev_CreateAnimationStateDefinition]
			@gfxCompDefinitionId = @compDefinitionId,
			@state = 1
			
		EXEC @altAltId = [dev].[dev_CreateAnimationFrameDefinitionFromPixels]
			@animationStateDefinitionId = @altId,
			@frame = 0,
			@duration = 50,
			@texture = 'images/centipede/textures.png',
			@width = 16.0,
			@height = 16.0,
			@pixCoordTL = 51.0,
			@pixCoordTR = 16.0,
			@pixCoordBR = 67.0,
			@pixCoordBL = 0.0,
			@textureWidth = 256.0
			
		EXEC @altAltId = [dev].[dev_CreateAnimationFrameDefinitionFromPixels]
			@animationStateDefinitionId = @altId,
			@frame = 1,
			@duration = 50,
			@texture = 'images/centipede/textures.png',
			@width = 16.0,
			@height = 16.0,
			@pixCoordTL = 51.0,
			@pixCoordTR = 33.0,
			@pixCoordBR = 67.0,
			@pixCoordBL = 17.0,
			@textureWidth = 256.0
	
		EXEC @altId = [dev].[dev_CreateAnimationStateDefinition]
			@gfxCompDefinitionId = @compDefinitionId,
			@state = 2
			
		EXEC @altAltId = [dev].[dev_CreateAnimationFrameDefinitionFromPixels]
			@animationStateDefinitionId = @altId,
			@frame = 0,
			@duration = 50,
			@texture = 'images/centipede/textures.png',
			@width = 16.0,
			@height = 16.0,
			@pixCoordTL = 34.0,
			@pixCoordTR = 50.0,
			@pixCoordBR = 50.0,
			@pixCoordBL = 34.0,
			@textureWidth = 256.0
			
		EXEC @altAltId = [dev].[dev_CreateAnimationFrameDefinitionFromPixels]
			@animationStateDefinitionId = @altId,
			@frame = 1,
			@duration = 50,
			@texture = 'images/centipede/textures.png',
			@width = 16.0,
			@height = 16.0,
			@pixCoordTL = 34.0,
			@pixCoordTR = 67.0,
			@pixCoordBR = 50.0,
			@pixCoordBL = 51.0,
			@textureWidth = 256.0
	
		EXEC @altId = [dev].[dev_CreateAnimationStateDefinition]
			@gfxCompDefinitionId = @compDefinitionId,
			@state = 3
			
		EXEC @altAltId = [dev].[dev_CreateAnimationFrameDefinitionFromPixels]
			@animationStateDefinitionId = @altId,
			@frame = 0,
			@duration = 50,
			@texture = 'images/centipede/textures.png',
			@width = 16.0,
			@height = 16.0,
			@pixCoordTL = 51.0,
			@pixCoordTR = 50.0,
			@pixCoordBR = 67.0,
			@pixCoordBL = 34.0,
			@textureWidth = 256.0
			
		EXEC @altAltId = [dev].[dev_CreateAnimationFrameDefinitionFromPixels]
			@animationStateDefinitionId = @altId,
			@frame = 1,
			@duration = 50,
			@texture = 'images/centipede/textures.png',
			@width = 16.0,
			@height = 16.0,
			@pixCoordTL = 51.0,
			@pixCoordTR = 67.0,
			@pixCoordBR = 67.0,
			@pixCoordBL = 51.0,
			@textureWidth = 256.0
			
	END
		
	IF NOT EXISTS (SELECT [Id] FROM [game].[PhysCompDefinitions] WHERE [EntityTypeId] = @id)
	BEGIN
		SELECT @altId = [Id] FROM [compjs].[PhysTypes] WHERE [Name] = 'Circle'
		SELECT @altAltId = [Id] FROM [compjs].[CollisionTypes] WHERE [Name] = 'Ghost'
	
		EXEC @compDefinitionId = [dev].[dev_CreatePhysCompDefinitionWithCircleBoundingData]
			@entityTypeId = @id,
			@physTypeId = @altId,
			@collisionTypeId = @altAltId,
			@originX = 8.0,
			@originY = 8.0,
			@radius = 7.5
	
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
			@stateFile = 'lib/behaviors/centipede/behavior-spider.js',
			@behaviorConstructor = 'BehaviorSpider'
			
	END
		
	IF NOT EXISTS (SELECT [Id] FROM [game].[GfxCompDefinitions] WHERE [EntityTypeId] = @id)
	BEGIN
		EXEC @compDefinitionId = [dev].[dev_CreateGfxCompDefinition]
			@entityTypeId = @id,
			@renderPass = 0
	
		EXEC @altId = [dev].[dev_CreateAnimationStateDefinition]
			@gfxCompDefinitionId = @compDefinitionId,
			@state = 0
			
		EXEC @altAltId = [dev].[dev_CreateAnimationFrameDefinitionFromPixels]
			@animationStateDefinitionId = @altId,
			@frame = 0,
			@duration = 50,
			@texture = 'images/centipede/textures.png',
			@width = 32.0,
			@height = 16.0,
			@pixCoordTL = 0.0,
			@pixCoordTR = 127.0,
			@pixCoordBR = 25.0,
			@pixCoordBL = 85.0,
			@textureWidth = 256.0
			
		EXEC @altAltId = [dev].[dev_CreateAnimationFrameDefinitionFromPixels]
			@animationStateDefinitionId = @altId,
			@frame = 1,
			@duration = 50,
			@texture = 'images/centipede/textures.png',
			@width = 32.0,
			@height = 16.0,
			@pixCoordTL = 0.0,
			@pixCoordTR = 170.0,
			@pixCoordBR = 25.0,
			@pixCoordBL = 128.0,
			@textureWidth = 256.0
			
		EXEC @altAltId = [dev].[dev_CreateAnimationFrameDefinitionFromPixels]
			@animationStateDefinitionId = @altId,
			@frame = 2,
			@duration = 50,
			@texture = 'images/centipede/textures.png',
			@width = 32.0,
			@height = 16.0,
			@pixCoordTL = 26.0,
			@pixCoordTR = 127.0,
			@pixCoordBR = 51.0,
			@pixCoordBL = 85.0,
			@textureWidth = 256.0
			
		EXEC @altAltId = [dev].[dev_CreateAnimationFrameDefinitionFromPixels]
			@animationStateDefinitionId = @altId,
			@frame = 3,
			@duration = 50,
			@texture = 'images/centipede/textures.png',
			@width = 32.0,
			@height = 16.0,
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
			@originX = 16.0,
			@originY = 8.0,
			@halfWidth = 16.0,
			@halfHeight = 8.0
	
	END
	
END

IF NOT EXISTS (SELECT [Id] FROM [game].[EntityTypes] WHERE [GameId] = @gameId AND [Name] = 'Flea')
BEGIN
	EXEC @id = [dev].[dev_CreateEntityType]
		@name = 'Flea',
		@gameId = @gameId
		
	IF NOT EXISTS (SELECT [Id] FROM [game].[BhvCompDefinitions] WHERE [EntityTypeId] = @id)
	BEGIN
		EXEC @compDefinitionId = [dev].[dev_CreateBhvCompDefinition]
			@entityTypeId = @id,
			@stateFile = 'lib/behaviors/centipede/behavior-flea.js',
			@behaviorConstructor = 'BehaviorFlea'
			
	END
		
	IF NOT EXISTS (SELECT [Id] FROM [game].[GfxCompDefinitions] WHERE [EntityTypeId] = @id)
	BEGIN
		EXEC @compDefinitionId = [dev].[dev_CreateGfxCompDefinition]
			@entityTypeId = @id,
			@renderPass = 0
	
		EXEC @altId = [dev].[dev_CreateAnimationStateDefinition]
			@gfxCompDefinitionId = @compDefinitionId,
			@state = 0
			
		EXEC @altAltId = [dev].[dev_CreateAnimationFrameDefinitionFromPixels]
			@animationStateDefinitionId = @altId,
			@frame = 0,
			@duration = null,
			@texture = 'images/centipede/textures.png',
			@width = 19.0,
			@height = 16.0,
			@pixCoordTL = 0.0,
			@pixCoordTR = 190.0,
			@pixCoordBR = 16.0,
			@pixCoordBL = 171.0,
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
			@originX = 9.5,
			@originY = 8.0,
			@halfWidth = 9.5,
			@halfHeight = 8.0
	
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
			@stateFile = 'lib/behaviors/centipede/behavior-scorpion.js',
			@behaviorConstructor = 'BehaviorScorpion'
			
	END
		
	IF NOT EXISTS (SELECT [Id] FROM [game].[GfxCompDefinitions] WHERE [EntityTypeId] = @id)
	BEGIN
		EXEC @compDefinitionId = [dev].[dev_CreateGfxCompDefinition]
			@entityTypeId = @id,
			@renderPass = 0
	
		EXEC @altId = [dev].[dev_CreateAnimationStateDefinition]
			@gfxCompDefinitionId = @compDefinitionId,
			@state = 0
			
		EXEC @altAltId = [dev].[dev_CreateAnimationFrameDefinitionFromPixels]
			@animationStateDefinitionId = @altId,
			@frame = 0,
			@duration = 50,
			@texture = 'images/centipede/textures.png',
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
			@texture = 'images/centipede/textures.png',
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
			@texture = 'images/centipede/textures.png',
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
			@texture = 'images/centipede/textures.png',
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
			@halfHeight = 7.0
	
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
			@stateFile = 'lib/behaviors/centipede/behavior-minion-manager.js',
			@behaviorConstructor = 'BehaviorMinionManager'
			
	END
	
END

IF NOT EXISTS (SELECT [Id] FROM [game].[EntityTypes] WHERE [GameId] = @gameId AND [Name] = 'CentipedeManager')
BEGIN
	EXEC @id = [dev].[dev_CreateEntityType]
		@name = 'CentipedeManager',
		@gameId = @gameId
		
	IF NOT EXISTS (SELECT [Id] FROM [game].[BhvCompDefinitions] WHERE [EntityTypeId] = @id)
	BEGIN
		EXEC @compDefinitionId = [dev].[dev_CreateBhvCompDefinition]
			@entityTypeId = @id,
			@stateFile = 'lib/behaviors/centipede/behavior-centipede-manager.js',
			@behaviorConstructor = 'BehaviorCentipedeManager'
			
	END
	
END

IF NOT EXISTS (SELECT [Id] FROM [game].[EntityTypes] WHERE [GameId] = @gameId AND [Name] = 'GameStateManager')
BEGIN
	EXEC @id = [dev].[dev_CreateEntityType]
		@name = 'GameStateManager',
		@gameId = @gameId
		
	IF NOT EXISTS (SELECT [Id] FROM [game].[BhvCompDefinitions] WHERE [EntityTypeId] = @id)
	BEGIN
		EXEC @compDefinitionId = [dev].[dev_CreateBhvCompDefinition]
			@entityTypeId = @id,
			@stateFile = 'lib/behaviors/centipede/behavior-game-state-manager.js',
			@behaviorConstructor = 'BehaviorGameStateManager'
			
	END
		
	EXEC [dev].[dev_CreateEntityTypesOnAllLevels]
	@entityTypeId = @id,
	@gameId = @gameId
	
END

IF NOT EXISTS (SELECT [Id] FROM [game].[EntityTypes] WHERE [GameId] = @gameId AND [Name] = 'Lives')
BEGIN
	EXEC @id = [dev].[dev_CreateEntityType]
		@name = 'Lives',
		@gameId = @gameId
		
	IF NOT EXISTS (SELECT [Id] FROM [game].[BhvCompDefinitions] WHERE [EntityTypeId] = @id)
	BEGIN
		EXEC @compDefinitionId = [dev].[dev_CreateBhvCompDefinition]
			@entityTypeId = @id,
			@stateFile = 'lib/behaviors/centipede/behavior-lives.js',
			@behaviorConstructor = 'BehaviorLives'
			
	END
	
END

IF NOT EXISTS (SELECT [Id] FROM [game].[EntityTypes] WHERE [GameId] = @gameId AND [Name] = 'Life')
BEGIN
	EXEC @id = [dev].[dev_CreateEntityType]
		@name = 'Life',
		@gameId = @gameId
		
	IF NOT EXISTS (SELECT [Id] FROM [game].[BhvCompDefinitions] WHERE [EntityTypeId] = @id)
	BEGIN
		EXEC @compDefinitionId = [dev].[dev_CreateBhvCompDefinition]
			@entityTypeId = @id,
			@stateFile = 'lib/behaviors/centipede/behavior-life.js',
			@behaviorConstructor = 'BehaviorLife'
			
	END
		
	IF NOT EXISTS (SELECT [Id] FROM [game].[GfxCompDefinitions] WHERE [EntityTypeId] = @id)
	BEGIN
		EXEC @compDefinitionId = [dev].[dev_CreateGfxCompDefinition]
			@entityTypeId = @id,
			@renderPass = 1
	
		EXEC @altId = [dev].[dev_CreateAnimationStateDefinition]
			@gfxCompDefinitionId = @compDefinitionId,
			@state = 0
			
		EXEC @altAltId = [dev].[dev_CreateAnimationFrameDefinitionFromPixels]
			@animationStateDefinitionId = @altId,
			@frame = 0,
			@duration = null,
			@texture = 'images/centipede/textures.png',
			@width = 16.0,
			@height = 16.0,
			@pixCoordTL = 0.0,
			@pixCoordTR = 81.0,
			@pixCoordBR = 16.0,
			@pixCoordBL = 65.0,
			@textureWidth = 256.0
			
	END
	
END

IF NOT EXISTS (SELECT [Id] FROM [game].[EntityTypes] WHERE [GameId] = @gameId AND [Name] = 'Score')
BEGIN
	EXEC @id = [dev].[dev_CreateEntityType]
		@name = 'Score',
		@gameId = @gameId
		
	IF NOT EXISTS (SELECT [Id] FROM [game].[BhvCompDefinitions] WHERE [EntityTypeId] = @id)
	BEGIN
		EXEC @compDefinitionId = [dev].[dev_CreateBhvCompDefinition]
			@entityTypeId = @id,
			@stateFile = 'lib/behaviors/centipede/behavior-score.js',
			@behaviorConstructor = 'BehaviorScore'
			
	END
	
END

IF NOT EXISTS (SELECT [Id] FROM [game].[EntityTypes] WHERE [GameId] = @gameId AND [Name] = 'MenuCursor')
BEGIN
	EXEC @id = [dev].[dev_CreateEntityType]
		@name = 'MenuCursor',
		@gameId = @gameId
		
	IF NOT EXISTS (SELECT [Id] FROM [game].[GfxCompDefinitions] WHERE [EntityTypeId] = @id)
	BEGIN
		EXEC @compDefinitionId = [dev].[dev_CreateGfxCompDefinition]
			@entityTypeId = @id,
			@renderPass = 1
	
		EXEC @altId = [dev].[dev_CreateAnimationStateDefinition]
			@gfxCompDefinitionId = @compDefinitionId,
			@state = 0
			
		EXEC @altAltId = [dev].[dev_CreateAnimationFrameDefinitionFromPixels]
			@animationStateDefinitionId = @altId,
			@frame = 0,
			@duration = null,
			@texture = 'images/centipede/textures.png',
			@width = 16.0,
			@height = 16.0,
			@pixCoordTL = 0.0,
			@pixCoordTR = 81.0,
			@pixCoordBR = 16.0,
			@pixCoordBL = 65.0,
			@textureWidth = 256.0
			
	END
	
END

IF NOT EXISTS (SELECT [Id] FROM [game].[EntityTypes] WHERE [GameId] = @gameId AND [Name] = 'Text_LargeRedFont')
BEGIN
	EXEC @id = [dev].[dev_CreateEntityType]
		@name = 'Text_LargeRedFont',
		@gameId = @gameId
		
	IF NOT EXISTS (SELECT [Id] FROM [game].[GfxCompDefinitions] WHERE [EntityTypeId] = @id)
	BEGIN
		EXEC @compDefinitionId = [dev].[dev_CreateGfxCompDefinition]
			@entityTypeId = @id,
			@renderPass = 1
			
		EXEC @altAltId = [dev].[dev_CreateFontTextureDefinition]
			@gfxCompDefinitionId = @compDefinitionId,
			@texture = 'images/centipede/fonts.png',
			@textureWidth = 512.0,
			@startT = 0.0,
			@startL = 0.0,
			@characterWidth = 12.0,
			@characterHeight = 16.0
			
	END
	
END

IF NOT EXISTS (SELECT [Id] FROM [game].[EntityTypes] WHERE [GameId] = @gameId AND [Name] = 'Text_SmallWhiteFont')
BEGIN
	EXEC @id = [dev].[dev_CreateEntityType]
		@name = 'Text_SmallWhiteFont',
		@gameId = @gameId
		
	IF NOT EXISTS (SELECT [Id] FROM [game].[GfxCompDefinitions] WHERE [EntityTypeId] = @id)
	BEGIN
		EXEC @compDefinitionId = [dev].[dev_CreateGfxCompDefinition]
			@entityTypeId = @id,
			@renderPass = 1
			
		EXEC @altAltId = [dev].[dev_CreateFontTextureDefinition]
			@gfxCompDefinitionId = @compDefinitionId,
			@texture = 'images/centipede/fonts.png',
			@textureWidth = 512.0,
			@startT = 64.0,
			@startL = 0.0,
			@characterWidth = 6.0,
			@characterHeight = 8.0
			
	END
	
END

IF NOT EXISTS (SELECT [Id] FROM [game].[EntityTypes] WHERE [GameId] = @gameId AND [Name] = 'Text_LargeGreenFont')
BEGIN
	EXEC @id = [dev].[dev_CreateEntityType]
		@name = 'Text_LargeGreenFont',
		@gameId = @gameId
		
	IF NOT EXISTS (SELECT [Id] FROM [game].[GfxCompDefinitions] WHERE [EntityTypeId] = @id)
	BEGIN
		EXEC @compDefinitionId = [dev].[dev_CreateGfxCompDefinition]
			@entityTypeId = @id,
			@renderPass = 1
			
		EXEC @altAltId = [dev].[dev_CreateFontTextureDefinition]
			@gfxCompDefinitionId = @compDefinitionId,
			@texture = 'images/centipede/fonts.png',
			@textureWidth = 512.0,
			@startT = 100.0,
			@startL = 1.0,
			@characterWidth = 16.0,
			@characterHeight = 29.0
			
	END
	
END

IF NOT EXISTS (SELECT [Id] FROM [game].[Shaders] WHERE [GameId] = @gameId AND [Name] = 'Texture')
BEGIN
	EXEC [dev].[dev_CreateShader]
		@name = 'Texture',
		@shaderFile = 'lib/shaders/centipede/shader-texture.js',
		@gameId = @gameId
	
END

IF NOT EXISTS (SELECT [Id] FROM [game].[Shaders] WHERE [GameId] = @gameId AND [Name] = 'TextureColorChange')
BEGIN
	EXEC [dev].[dev_CreateShader]
		@name = 'TextureColorChange',
		@shaderFile = 'lib/shaders/centipede/shader-texture-color-change.js',
		@gameId = @gameId
	
END

IF NOT EXISTS (SELECT [Id] FROM [game].[Shaders] WHERE [GameId] = @gameId AND [Name] = 'Emboss')
BEGIN
	EXEC [dev].[dev_CreateShader]
		@name = 'Emboss',
		@shaderFile = 'lib/shaders/centipede/shader-emboss.js',
		@gameId = @gameId
	
END

IF NOT EXISTS (SELECT [Id] FROM [game].[Shaders] WHERE [GameId] = @gameId AND [Name] = 'PointLight')
BEGIN
	EXEC [dev].[dev_CreateShader]
		@name = 'PointLight',
		@shaderFile = 'lib/shaders/centipede/shader-point-light.js',
		@gameId = @gameId
	
END

IF NOT EXISTS (SELECT [Id] FROM [game].[HighScores] WHERE [GameId] = @gameId AND [PlayerName] = 'Dona Bailey')
BEGIN
	EXEC [game].[CreateHighScoreForGame]
		@playerName = 'Dona Bailey',
		@score = 100000,
		@gameId = @gameId
END

IF NOT EXISTS (SELECT [Id] FROM [game].[HighScores] WHERE [GameId] = @gameId AND [PlayerName] = 'Microsoft Bob')
BEGIN
	EXEC [game].[CreateHighScoreForGame]
		@playerName = 'Microsoft Bob',
		@score = 99999,
		@gameId = @gameId
END

IF NOT EXISTS (SELECT [Id] FROM [game].[HighScores] WHERE [GameId] = @gameId AND [PlayerName] = 'Bill Gates')
BEGIN
	EXEC [game].[CreateHighScoreForGame]
		@playerName = 'Bill Gates',
		@score = 80000,
		@gameId = @gameId
END

IF NOT EXISTS (SELECT [Id] FROM [game].[HighScores] WHERE [GameId] = @gameId AND [PlayerName] = 'Paul Allen')
BEGIN
	EXEC [game].[CreateHighScoreForGame]
		@playerName = 'Paul Allen',
		@score = 75000,
		@gameId = @gameId
END

IF NOT EXISTS (SELECT [Id] FROM [game].[HighScores] WHERE [GameId] = @gameId AND [PlayerName] = 'Peter Klaebe')
BEGIN
	EXEC [game].[CreateHighScoreForGame]
		@playerName = 'Peter Klaebe',
		@score = 50000,
		@gameId = @gameId
END

IF NOT EXISTS (SELECT [Id] FROM [game].[HighScores] WHERE [GameId] = @gameId AND [PlayerName] = 'Master Chief')
BEGIN
	EXEC [game].[CreateHighScoreForGame]
		@playerName = 'Master Chief',
		@score = 20000,
		@gameId = @gameId
END

IF NOT EXISTS (SELECT [Id] FROM [game].[HighScores] WHERE [GameId] = @gameId AND [PlayerName] = 'Skele-Tom')
BEGIN
	EXEC [game].[CreateHighScoreForGame]
		@playerName = 'Skele-Tom',
		@score = 10000,
		@gameId = @gameId
END

IF NOT EXISTS (SELECT [Id] FROM [game].[HighScores] WHERE [GameId] = @gameId AND [PlayerName] = 'v-iaelle')
BEGIN
	EXEC [game].[CreateHighScoreForGame]
		@playerName = 'v-iaelle',
		@score = 5000,
		@gameId = @gameId
END

IF NOT EXISTS (SELECT [Id] FROM [game].[HighScores] WHERE [GameId] = @gameId AND [PlayerName] = 'Clippy')
BEGIN
	EXEC [game].[CreateHighScoreForGame]
		@playerName = 'Clippy',
		@score = 1000,
		@gameId = @gameId
END

IF NOT EXISTS (SELECT [Id] FROM [game].[HighScores] WHERE [GameId] = @gameId AND [PlayerName] = 'Marcus Fenix')
BEGIN
	EXEC [game].[CreateHighScoreForGame]
		@playerName = 'Marcus Fenix',
		@score = 1,
		@gameId = @gameId
END

GO