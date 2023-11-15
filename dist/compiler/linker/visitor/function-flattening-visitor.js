"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionFlatteningVisitor = void 0;
const ast_1 = require("#compiler/ast");
const reference_name_indexing_visitor_1 = require("./reference-name-indexing-visitor");
const error_1 = require("../error");
class FunctionFlatteningVisitor extends reference_name_indexing_visitor_1.ReferenceNameIndexingVisitor {
    get OperatesOn() {
        return [...super.OperatesOn, ast_1.InvokationExpression];
    }
    Visit(target) {
        if (target instanceof ast_1.InvokationExpression) {
            const subject = target.Subject;
            if (subject instanceof ast_1.AccessExpression) {
                const accessing = subject.Subject;
                if (accessing instanceof ast_1.ReferenceExpression &&
                    accessing.References instanceof ast_1.StructEntity &&
                    accessing.References.HasKey(accessing.Name)) {
                    return {
                        result: undefined,
                        cleanup: () => { },
                    };
                }
                const found = this.find(subject.Target);
                if (!found)
                    throw new error_1.LinkerError(target.Location, `Reference not found ${subject.Target}`);
                return {
                    result: new ast_1.InvokationExpression(target.Location, found, new ast_1.ComponentGroup(accessing, ...target.Parameters.iterator())),
                    cleanup: () => { },
                };
            }
        }
        return super.Visit(target);
    }
}
exports.FunctionFlatteningVisitor = FunctionFlatteningVisitor;
//# sourceMappingURL=function-flattening-visitor.js.map