
var Entity = function (instanceId, entityTypeId, entityTypeName, position, rotation, scale, velocity) {
    this.instanceId = instanceId;
    this.typeId = entityTypeId;
    this.typeName = entityTypeName;

    this.transformation = new TransformationInstance(position, rotation, scale, velocity);
};

Entity.hasBehavior = function (ent) {
    return ent.behavior != undefined && ent.behavior != null;
};

Entity.hasGraphics = function (ent) {
    return ent.graphics != undefined && ent.graphics != null;
};

Entity.hasPhysics = function (ent) {
    return ent.physics != undefined && ent.physics != null;
};