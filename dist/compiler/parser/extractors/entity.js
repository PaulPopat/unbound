"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtractEntity = void 0;
const ast_1 = require("#compiler/ast");
const utils_1 = require("../utils");
const type_1 = require("./type");
const error_1 = require("../error");
const statement_1 = require("./statement");
const expression_1 = require("./expression");
function ExtractExternalFunction(tokens) {
    const start = (0, utils_1.ExpectNext)(tokens, "fn");
    const name = (0, utils_1.NextBlock)(tokens).Text;
    const parameters = (0, utils_1.BuildWhile)(tokens, "(", ",", ")", () => (0, type_1.ExtractFunctionParameter)(tokens));
    (0, utils_1.ExpectNext)(tokens, ":");
    const returns = (0, type_1.ExtractType)(tokens);
    (0, utils_1.ExpectNext)(tokens, ";");
    return new ast_1.ExternalFunctionDeclaration(start.Location, name, new ast_1.ComponentGroup(...parameters), returns);
}
function ExtractFunction(tokens) {
    const name = (0, utils_1.NextBlock)(tokens).Text;
    const parameters = (0, utils_1.BuildWhile)(tokens, "(", ",", ")", () => (0, type_1.ExtractFunctionParameter)(tokens));
    const returns = (0, utils_1.IfIs)(tokens, ":", () => (0, type_1.ExtractType)(tokens));
    return { name, parameters, returns, body: (0, statement_1.ExtractStatementBlock)(tokens) };
}
function ExtractLib(tokens) {
    const path = (0, expression_1.ExtractExpression)(tokens);
    const declarations = (0, utils_1.BuildWhile)(tokens, "{", ";", "}", () => ExtractExternalFunction(tokens));
    return { path: path, declarations };
}
function ExtractSystem(tokens) {
    const declarations = (0, utils_1.BuildWhile)(tokens, "{", ";", "}", () => ExtractExternalFunction(tokens));
    return { declarations };
}
function ExtractSchemaOrStruct(tokens) {
    const name = (0, utils_1.NextBlock)(tokens).Text;
    const properties = (0, utils_1.BuildWhile)(tokens, "{", ";", "}", () => (0, type_1.ExtractProperty)(tokens));
    return { name, properties };
}
function ExtractUsing(tokens) {
    return (0, utils_1.BuildWhileOnStart)(tokens, ".", ";", () => (0, utils_1.NextBlock)(tokens).Text).join(".");
}
function ExtractEntity(tokens, exported) {
    const current = (0, utils_1.NextBlock)(tokens);
    switch (current.Text) {
        case "schema": {
            const { name, properties } = ExtractSchemaOrStruct(tokens);
            return new ast_1.SchemaEntity(current.Location, exported ?? false, name, new ast_1.ComponentGroup(...properties));
        }
        case "struct": {
            const { name, properties } = ExtractSchemaOrStruct(tokens);
            return new ast_1.StructEntity(current.Location, exported ?? false, name, new ast_1.ComponentGroup(...properties));
        }
        case "using": {
            return new ast_1.UsingEntity(current.Location, false, ExtractUsing(tokens));
        }
        case "export": {
            return ExtractEntity(tokens, true);
        }
        case "lib": {
            const { path, declarations } = ExtractLib(tokens);
            return new ast_1.LibEntity(current.Location, exported ?? false, path, new ast_1.ComponentGroup(...declarations));
        }
        case "system": {
            const { declarations } = ExtractSystem(tokens);
            return new ast_1.SystemEntity(current.Location, exported ?? false, new ast_1.ComponentGroup(...declarations));
        }
        case "fn": {
            const { name, parameters, returns, body } = ExtractFunction(tokens);
            return new ast_1.FunctionEntity(current.Location, exported ?? false, name, new ast_1.ComponentGroup(...parameters), returns, body);
        }
        default:
            throw error_1.ParserError.UnexpectedSymbol(current, "schema", "struct", "fn", "using", "lib", "system", "export");
    }
}
exports.ExtractEntity = ExtractEntity;
//# sourceMappingURL=entity.js.map