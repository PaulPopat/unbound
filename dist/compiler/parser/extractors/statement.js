"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtractStatementBlock = exports.ExtractStatement = void 0;
const ast_1 = require("#compiler/ast");
const error_1 = require("../error");
const utils_1 = require("../utils");
const expression_1 = require("./expression");
function ExtractStore(tokens) {
    const name = (0, utils_1.NextBlock)(tokens).Text;
    (0, utils_1.ExpectNext)(tokens, "=");
    return { name, equals: (0, expression_1.ExtractExpression)(tokens) };
}
function ExtractAssign(tokens) {
    const name = (0, utils_1.NextBlock)(tokens).Text;
    (0, utils_1.ExpectNext)(tokens, "=");
    return { name, equals: (0, expression_1.ExtractExpression)(tokens) };
}
function ExtractReturn(tokens) {
    return (0, expression_1.ExtractExpression)(tokens);
}
function ExtractPanic(tokens) {
    return { error: (0, expression_1.ExtractExpression)(tokens) };
}
function ExtractStatement(tokens) {
    const current = (0, utils_1.NextBlock)(tokens);
    switch (current.Text) {
        case "store": {
            const { name, equals } = ExtractStore(tokens);
            return new ast_1.StoreStatement(current.Location, name, equals);
        }
        case "return": {
            return new ast_1.ReturnStatement(current.Location, ExtractReturn(tokens));
        }
        case "assign": {
            const { name, equals } = ExtractAssign(tokens);
            return new ast_1.AssignStatement(current.Location, name, equals);
        }
        case "panic": {
            const { error } = ExtractPanic(tokens);
            return new ast_1.PanicStatement(current.Location, error);
        }
        default:
            throw error_1.ParserError.UnexpectedSymbol(current, "store", "return", "assign", "panic");
    }
}
exports.ExtractStatement = ExtractStatement;
function ExtractStatementBlock(tokens) {
    return new ast_1.ComponentGroup(...(0, utils_1.BuildWhile)(tokens, "{", ";", "}", () => ExtractStatement(tokens)));
}
exports.ExtractStatementBlock = ExtractStatementBlock;
//# sourceMappingURL=statement.js.map