
var PhysicsComponent = function (physCompDefinition, transformation) {
    this.physTypeId = physCompDefinition.physTypeId;
    this.collisionTypeId = physCompDefinition.collisionTypeId;
    this.boundingData = physCompDefinition.boundingData;
    this.colliders = [];

    // TODO: Update bounding data when position changes
    //transformation.position.notifyMe();
};

var PhysicsComponentInstance = function (entity, physCompDefinition) {
    this.instanceId = entity.instanceId;
    this.entityTypeName = entity.typeName;
    this.transformation = entity.transformation;
    this.physics = new PhysicsComponent(physCompDefinition);
};
