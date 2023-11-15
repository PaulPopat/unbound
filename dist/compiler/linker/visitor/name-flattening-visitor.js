"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NameFlatteningVisitor = void 0;
const ast_1 = require("#compiler/ast");
const location_1 = require("#compiler/location");
const pattern_match_1 = require("../pattern-match");
const name_chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
class NameFlatteningVisitor extends ast_1.Visitor {
    constructor() {
        super();
    }
    get OperatesOn() {
        return [ast_1.FunctionEntity, ast_1.StructEntity, ast_1.StoreStatement];
    }
    Visit(target) {
        return (0, pattern_match_1.PatternMatch)(ast_1.FunctionEntity, ast_1.StructEntity, ast_1.StoreStatement)((func) => ({
            result: new ast_1.FunctionEntity(func.Location, func.Exported, location_1.Namer.GetName(), func.Parameters, func.Returns, func.Content),
            cleanup: () => { },
        }), (struct) => ({
            result: new ast_1.StructEntity(struct.Location, struct.Exported, location_1.Namer.GetName(), struct.Properties),
            cleanup: () => { },
        }), (store) => ({
            result: new ast_1.StoreStatement(store.Location, location_1.Namer.GetName(), store.Equals, store.Type),
            cleanup: () => { },
        }))(target);
    }
}
exports.NameFlatteningVisitor = NameFlatteningVisitor;
//# sourceMappingURL=name-flattening-visitor.js.map