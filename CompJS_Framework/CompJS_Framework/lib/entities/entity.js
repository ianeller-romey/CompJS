
var Entity = function (instanceId, entityId, name, position) {
    this.instanceId = instanceId;
    this.entityId = entityId;
    this.name = name;

    this.transformation = {
        position: position,
        rotation: 0,
        scale: {
            x: 1,
            y: 1
        },
        velocity: {
            x: 0,
            y: 0
        }
    };
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