"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferenceTypeVisitor = void 0;
const ast_1 = require("#compiler/ast");
const type_collector_visitor_1 = require("./type-collector-visitor");
const error_1 = require("../error");
class ReferenceTypeVisitor extends type_collector_visitor_1.TypeCollectorVisitor {
    constructor(types) {
        super(types);
    }
    get OperatesOn() {
        return [...super.OperatesOn, ast_1.ReferenceType, ast_1.MakeExpression];
    }
    Visit(target) {
        if (target instanceof ast_1.ReferenceType) {
            const possible = this.find(target.Name);
            if (possible)
                return {
                    result: new ast_1.ReferenceType(target.Location, target.Name, possible),
                    cleanup: () => { },
                };
            if ((0, ast_1.IsPrimitiveName)(target.Name))
                return {
                    result: new ast_1.PrimitiveType(target.Location, target.Name),
                    cleanup: () => { },
                };
            throw new error_1.LinkerError(target.Location, `Could not resolve symbol: ${target.Name}`);
        }
        else if (target instanceof ast_1.MakeExpression) {
            const result = this.find(target.Struct);
            if (!(result instanceof ast_1.StructEntity))
                throw new error_1.LinkerError(target.Location, "Only structs may be made");
            return {
                result: new ast_1.MakeExpression(target.Location, target.Struct, target.Using, result),
                cleanup: () => { },
            };
        }
        return super.Visit(target);
    }
}
exports.ReferenceTypeVisitor = ReferenceTypeVisitor;
//# sourceMappingURL=reference-type-visitor.js.map