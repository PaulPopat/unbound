"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IfIs = exports.BuildWhileOnStart = exports.BuildWhile = exports.BuildWhilePeek = exports.ExpectNext = exports.NextBlock = void 0;
const error_1 = require("./error");
function NextBlock(tokens) {
    const first = tokens.next();
    if (first.done)
        throw error_1.ParserError.EndOfFile;
    return first.value;
}
exports.NextBlock = NextBlock;
function ExpectNext(tokens, ...expected) {
    const item = NextBlock(tokens);
    if (!expected.includes(item.Text))
        throw error_1.ParserError.UnexpectedSymbol(item, ...expected);
    return item;
}
exports.ExpectNext = ExpectNext;
function BuildWhilePeek(tokens, to_next, handler) {
    const result = [];
    while (to_next(tokens.peek()?.Text ?? "")) {
        result.push(handler());
    }
    return result;
}
exports.BuildWhilePeek = BuildWhilePeek;
function BuildWhile(tokens, expect_start, to_next, end, handler) {
    const result = [];
    let next = expect_start
        ? ExpectNext(tokens, expect_start)
        : NextBlock(tokens);
    while (next.Text === to_next || next.Text === expect_start) {
        if (tokens.peek()?.Text === end) {
            next = NextBlock(tokens);
            break;
        }
        result.push(handler());
        next = NextBlock(tokens);
    }
    if (next.Text !== end)
        throw error_1.ParserError.UnexpectedSymbol(next, end, to_next);
    return result;
}
exports.BuildWhile = BuildWhile;
function BuildWhileOnStart(tokens, to_next, end, handler) {
    const result = [handler()];
    let next = NextBlock(tokens);
    while (next.Text === to_next) {
        result.push(handler());
        next = NextBlock(tokens);
    }
    if (next.Text !== end)
        throw error_1.ParserError.UnexpectedSymbol(next, end, to_next);
    return result;
}
exports.BuildWhileOnStart = BuildWhileOnStart;
function IfIs(tokens, expected, handler) {
    if (tokens.peek()?.Text === expected) {
        NextBlock(tokens);
        return handler();
    }
    return undefined;
}
exports.IfIs = IfIs;
//# sourceMappingURL=utils.js.map