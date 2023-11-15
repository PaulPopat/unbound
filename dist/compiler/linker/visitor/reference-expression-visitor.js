"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferenceExpressionVisitor = void 0;
const ast_1 = require("#compiler/ast");
const error_1 = require("../error");
const reference_name_indexing_visitor_1 = require("./reference-name-indexing-visitor");
class ReferenceExpressionVisitor extends reference_name_indexing_visitor_1.ReferenceNameIndexingVisitor {
    constructor(functions) {
        super(functions);
    }
    get OperatesOn() {
        return [...super.OperatesOn, ast_1.ReferenceExpression];
    }
    Visit(target) {
        if (target instanceof ast_1.ReferenceExpression) {
            const map = this.find(target.Name);
            if (!map) {
                throw new error_1.LinkerError(target.Location, `Could not resolve symbol ${target.Name}`);
            }
            return {
                result: new ast_1.ReferenceExpression(target.Location, target.Name, map),
                cleanup: () => { },
            };
        }
        return super.Visit(target);
    }
}
exports.ReferenceExpressionVisitor = ReferenceExpressionVisitor;
//# sourceMappingURL=reference-expression-visitor.js.map