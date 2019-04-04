"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Relationship_1 = require("./Relationship");
function belongsTo(options) {
    if (options === void 0) { options = {}; }
    return Relationship_1.relationship(Relationship_1.RelationshipType.BelongsTo, options);
}
exports.belongsTo = belongsTo;
