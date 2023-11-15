"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _StringTraversal_data, _StringTraversal_index, _StringTraversal_line, _StringTraversal_column;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SplitTokens = void 0;
const location_1 = require("#compiler/location");
const error_1 = require("./error");
const token_1 = require("./token");
class StringTraversal {
    constructor(data) {
        _StringTraversal_data.set(this, void 0);
        _StringTraversal_index.set(this, 0);
        _StringTraversal_line.set(this, 0);
        _StringTraversal_column.set(this, 0);
        __classPrivateFieldSet(this, _StringTraversal_data, data, "f");
    }
    get current() {
        return __classPrivateFieldGet(this, _StringTraversal_data, "f")[__classPrivateFieldGet(this, _StringTraversal_index, "f")] ?? "";
    }
    move() {
        __classPrivateFieldSet(this, _StringTraversal_index, __classPrivateFieldGet(this, _StringTraversal_index, "f") + 1, "f");
        switch (__classPrivateFieldGet(this, _StringTraversal_data, "f")[__classPrivateFieldGet(this, _StringTraversal_index, "f")]) {
            case "\n":
                __classPrivateFieldSet(this, _StringTraversal_line, __classPrivateFieldGet(this, _StringTraversal_line, "f") + 1, "f");
                __classPrivateFieldSet(this, _StringTraversal_column, -1, "f");
                break;
            default:
                __classPrivateFieldSet(this, _StringTraversal_column, __classPrivateFieldGet(this, _StringTraversal_column, "f") + 1, "f");
        }
        return __classPrivateFieldGet(this, _StringTraversal_data, "f")[__classPrivateFieldGet(this, _StringTraversal_index, "f")] ?? "";
    }
    get line() {
        return __classPrivateFieldGet(this, _StringTraversal_line, "f");
    }
    get column() {
        return __classPrivateFieldGet(this, _StringTraversal_column, "f");
    }
}
_StringTraversal_data = new WeakMap(), _StringTraversal_index = new WeakMap(), _StringTraversal_line = new WeakMap(), _StringTraversal_column = new WeakMap();
const is_symbol_character = /^[=\-\/\\+?*<>]+$/gm;
const is_word_character = /^[a-zA-Z0-9_]+$/gm;
const is_quote_mark = /^['"`]$/gm;
function VisitWord(data, file_name) {
    let result = data.current;
    const start = { line: data.line, column: data.column };
    while (data.move().match(is_word_character)) {
        result += data.current;
    }
    return new token_1.Token(new location_1.Location(file_name, start.line, start.column, data.line, data.column), result);
}
function VisitString(data, file_name) {
    let result = "";
    const start = { line: data.line, column: data.column };
    while (data.current !== result[0]) {
        if (data.current === "\n" && result[0] !== "`")
            throw new error_1.ParserError(new location_1.Location(file_name, start.line, start.column, data.line, data.column), "Unexpected new line");
        result += data.current;
        data.move();
    }
    result += data.current;
    data.move();
    return new token_1.Token(new location_1.Location(file_name, start.line, start.column, data.line, data.column), result);
}
function VisitMaths(data, file_name) {
    let result = data.current;
    const start = { line: data.line, column: data.column };
    while (data.move().match(is_symbol_character)) {
        result += data.current;
    }
    return new token_1.Token(new location_1.Location(file_name, start.line, start.column, data.line, data.column), result);
}
function* SplitTokens(code, file_name) {
    const data = new StringTraversal(code);
    while (data.current) {
        if (data.current.match(is_word_character))
            yield VisitWord(data, file_name);
        else if (data.current.match(is_symbol_character))
            yield VisitMaths(data, file_name);
        else if (data.current.match(is_quote_mark))
            yield VisitString(data, file_name);
        else if (data.current.trim()) {
            yield new token_1.Token(new location_1.Location(file_name, data.line, data.column, data.line, data.column + 1), data.current.trim());
            data.move();
        }
        else {
            data.move();
        }
    }
}
exports.SplitTokens = SplitTokens;
//# sourceMappingURL=tokeniser.js.map