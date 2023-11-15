"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtractExpression = void 0;
const ast_1 = require("#compiler/ast");
const error_1 = require("../error");
const utils_1 = require("../utils");
const statement_1 = require("./statement");
const type_1 = require("./type");
function IsOperator(item) {
    return ast_1.Operators.includes((item ?? ""));
}
function ExtractIf(tokens) {
    (0, utils_1.ExpectNext)(tokens, "(");
    const check = ExtractExpression(tokens, [")"]);
    (0, utils_1.ExpectNext)(tokens, ")");
    const if_block = (0, statement_1.ExtractStatementBlock)(tokens);
    (0, utils_1.ExpectNext)(tokens, "else");
    const else_block = (0, statement_1.ExtractStatementBlock)(tokens);
    return { check, if_block, else_block };
}
function ExtractCountOrIterate(tokens) {
    (0, utils_1.ExpectNext)(tokens, "(");
    const to = ExtractExpression(tokens, ["as"]);
    (0, utils_1.ExpectNext)(tokens, "as");
    const as = (0, utils_1.NextBlock)(tokens).Text;
    (0, utils_1.ExpectNext)(tokens, ")");
    const block = (0, statement_1.ExtractStatementBlock)(tokens);
    return { to, as, block };
}
function ExtractMake(tokens) {
    const name = (0, utils_1.NextBlock)(tokens).Text;
    const block = (0, statement_1.ExtractStatementBlock)(tokens);
    return { name, block };
}
function ExtractLambda(tokens, look_for) {
    const parameters = (0, utils_1.BuildWhile)(tokens, "(", ",", ")", () => (0, type_1.ExtractFunctionParameter)(tokens));
    (0, utils_1.ExpectNext)(tokens, "->");
    return { parameters, expression: ExtractExpression(tokens, look_for) };
}
function ExtractExpression(tokens, look_for = [";"]) {
    let result;
    while (!look_for.includes(tokens.peek()?.Text ?? "")) {
        const current = (0, utils_1.NextBlock)(tokens);
        const text = current.Text;
        if (text === "(" && !result) {
            const input = ExtractExpression(tokens, [")"]);
            (0, utils_1.ExpectNext)(tokens, ")");
            result = new ast_1.BracketsExpression(current.Location, input);
        }
        else if (IsOperator(text)) {
            if (!result)
                throw new error_1.ParserError(current.Location, "Operators must have a left hand side");
            result = new ast_1.OperatorExpression(current.Location, result, text, ExtractExpression(tokens, look_for));
        }
        else if (text === "next") {
            result = new ast_1.NextExpression(current.Location);
        }
        else if (text === "if") {
            const { check, if_block, else_block } = ExtractIf(tokens);
            result = new ast_1.IfExpression(current.Location, check, if_block, else_block);
        }
        else if (text === "count") {
            const { to, as, block } = ExtractCountOrIterate(tokens);
            result = new ast_1.CountExpression(current.Location, to, as, block);
        }
        else if (text === "iterate") {
            const { to, as, block } = ExtractCountOrIterate(tokens);
            result = new ast_1.IterateExpression(current.Location, to, as, block);
        }
        else if (text === "make") {
            const { name, block } = ExtractMake(tokens);
            result = new ast_1.MakeExpression(current.Location, name, block);
        }
        else if (text === "is") {
            if (!result)
                throw new error_1.ParserError(current.Location, "Is checks must have a left hand side");
            const right = (0, type_1.ExtractType)(tokens);
            result = new ast_1.IsExpression(current.Location, result, right);
        }
        else if (text === "fn") {
            const { parameters, expression } = ExtractLambda(tokens, look_for);
            result = new ast_1.LambdaExpression(current.Location, new ast_1.ComponentGroup(...parameters), expression);
        }
        else if (text === "(") {
            if (!result)
                throw new error_1.ParserError(current.Location, "Attempting an invokation without a referenced function");
            const parameters = tokens.peek()?.Text !== ")"
                ? (0, utils_1.BuildWhileOnStart)(tokens, ",", ")", () => ExtractExpression(tokens, [",", ")"]))
                : tokens.next() && [];
            result = new ast_1.InvokationExpression(current.Location, result, new ast_1.ComponentGroup(...parameters));
        }
        else if (text === ".") {
            if (!result)
                throw new error_1.ParserError(current.Location, "Attempting an access without a left hand side");
            const accessed = (0, utils_1.NextBlock)(tokens);
            result = new ast_1.AccessExpression(current.Location, result, accessed.Text);
        }
        else if (text.match(/^[0-9]+i$/gm)) {
            result = new ast_1.LiteralExpression(current.Location, "int", text);
        }
        else if (text.match(/^[0-9]+$/gm)) {
            (0, utils_1.ExpectNext)(tokens, ".");
            const next = (0, utils_1.NextBlock)(tokens);
            if (next.Text.match(/^[0-9]+f$/gm)) {
                result = new ast_1.LiteralExpression(current.Location, "float", text + "." + next.Text);
            }
            else if (next.Text.match(/^[0-9]+d$/gm)) {
                result = new ast_1.LiteralExpression(current.Location, "double", text + "." + next.Text);
            }
            else {
                throw new error_1.ParserError(current.Location, "Floating values must be a float or a double");
            }
        }
        else if (text.startsWith('"')) {
            if (!text.endsWith('"'))
                throw new error_1.ParserError(current.Location, "Expected end of string");
            result = new ast_1.LiteralExpression(current.Location, "string", text.substring(1, text.length - 1));
        }
        else if (text.startsWith("'")) {
            if (!text.endsWith("'"))
                throw new error_1.ParserError(current.Location, "Expected end of string");
            if (text.length !== 3)
                throw new error_1.ParserError(current.Location, "Chars may have an exact length of 1");
            result = new ast_1.LiteralExpression(current.Location, "char", text.substring(1, text.length - 1));
        }
        else {
            result = new ast_1.ReferenceExpression(current.Location, current.Text);
        }
    }
    if (!result)
        throw new error_1.ParserError(tokens.peek()?.Location, "No Expression found");
    return result;
}
exports.ExtractExpression = ExtractExpression;
//# sourceMappingURL=expression.js.map