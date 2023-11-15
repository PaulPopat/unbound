"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParseUnbound = void 0;
const ast_1 = require("#compiler/ast");
const tokeniser_1 = require("./tokeniser");
const token_1 = require("./token");
const error_1 = require("./error");
const utils_1 = require("./utils");
const entity_1 = require("./extractors/entity");
function ExtractNamespace(tokens, exported = false) {
    const start = tokens.peek();
    if (!start)
        throw new error_1.ParserError(undefined, "No namespace implementation");
    if (start.Text === "export") {
        (0, utils_1.NextBlock)(tokens);
        return ExtractNamespace(tokens, true);
    }
    const name = (0, utils_1.BuildWhile)(tokens, "namespace", ".", "{", () => (0, utils_1.NextBlock)(tokens).Text).join(".");
    const entities = (0, utils_1.BuildWhilePeek)(tokens, (v) => v !== "}", () => (0, entity_1.ExtractEntity)(tokens));
    (0, utils_1.ExpectNext)(tokens, "}");
    return new ast_1.Namespace(start.Location, exported, name, new ast_1.ComponentGroup(...entities));
}
function ParseUnbound(input, file_name) {
    const tokens = (0, tokeniser_1.SplitTokens)(input, file_name);
    const group = new token_1.TokenGroup(tokens);
    const result = [];
    while (group.peek()) {
        result.push(ExtractNamespace(group));
    }
    return new ast_1.ComponentGroup(...result);
}
exports.ParseUnbound = ParseUnbound;
//# sourceMappingURL=index.js.map