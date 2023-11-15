"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtractType = exports.ExtractProperty = exports.ExtractFunctionParameter = void 0;
const ast_1 = require("#compiler/ast");
const utils_1 = require("../utils");
function ExtractFunctionParameter(tokens) {
    const name = (0, utils_1.NextBlock)(tokens);
    if (tokens.peek()?.Text !== ":") {
        return new ast_1.FunctionParameter(name.Location, name.Text, undefined);
    }
    (0, utils_1.ExpectNext)(tokens, ":");
    const type = ExtractType(tokens);
    return new ast_1.FunctionParameter(name.Location, name.Text, type);
}
exports.ExtractFunctionParameter = ExtractFunctionParameter;
function ExtractProperty(tokens) {
    const name = (0, utils_1.NextBlock)(tokens);
    (0, utils_1.ExpectNext)(tokens, ":");
    const type = ExtractType(tokens);
    return new ast_1.Property(name.Location, name.Text, type);
}
exports.ExtractProperty = ExtractProperty;
function ExtractFunction(tokens) {
    const parameters = (0, utils_1.BuildWhileOnStart)(tokens, ",", ")", () => ExtractFunctionParameter(tokens));
    (0, utils_1.ExpectNext)(tokens, "->");
    return {
        parameters,
        returns: ExtractType(tokens),
    };
}
function ExtractSchema(tokens) {
    const name = (0, utils_1.NextBlock)(tokens).Text;
    const properties = (0, utils_1.BuildWhile)(tokens, "{", ";", "}", () => ExtractProperty(tokens));
    return { name, properties };
}
function ExtractIterable(tokens) {
    const result = ExtractType(tokens);
    (0, utils_1.ExpectNext)(tokens, "]");
    return result;
}
function ExtractUse(tokens) {
    const constraints = (0, utils_1.BuildWhileOnStart)(tokens, "|", "=", () => ExtractType(tokens));
    return {
        name: (0, utils_1.NextBlock)(tokens).Text,
        constraints,
    };
}
function ExtractType(tokens) {
    const current = (0, utils_1.NextBlock)(tokens);
    switch (current.Text) {
        case "use": {
            const { name, constraints } = ExtractUse(tokens);
            return new ast_1.UseType(current.Location, name, new ast_1.ComponentGroup(...constraints));
        }
        case "[": {
            return new ast_1.IterableType(current.Location, ExtractIterable(tokens));
        }
        case "(": {
            const { parameters, returns } = ExtractFunction(tokens);
            return new ast_1.FunctionType(current.Location, new ast_1.ComponentGroup(...parameters), returns);
        }
        case "schema": {
            const { properties, name } = ExtractSchema(tokens);
            return new ast_1.SchemaType(current.Location, name, new ast_1.ComponentGroup(...properties));
        }
        default:
            return new ast_1.ReferenceType(current.Location, current.Text);
    }
}
exports.ExtractType = ExtractType;
//# sourceMappingURL=type.js.map