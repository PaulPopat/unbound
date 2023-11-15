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
var _Location_file_name, _Location_start_line, _Location_start_column, _Location_end_line, _Location_end_column, _a, _Namer_index;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Namer = exports.Location = void 0;
class Location {
    constructor(file_name, start_line, start_column, end_line, end_column) {
        _Location_file_name.set(this, void 0);
        _Location_start_line.set(this, void 0);
        _Location_start_column.set(this, void 0);
        _Location_end_line.set(this, void 0);
        _Location_end_column.set(this, void 0);
        __classPrivateFieldSet(this, _Location_file_name, file_name, "f");
        __classPrivateFieldSet(this, _Location_start_line, start_line, "f");
        __classPrivateFieldSet(this, _Location_start_column, start_column, "f");
        __classPrivateFieldSet(this, _Location_end_line, end_line, "f");
        __classPrivateFieldSet(this, _Location_end_column, end_column, "f");
    }
    get FileName() {
        return __classPrivateFieldGet(this, _Location_file_name, "f");
    }
    get StartLine() {
        return __classPrivateFieldGet(this, _Location_start_line, "f");
    }
    get StartColumn() {
        return __classPrivateFieldGet(this, _Location_start_column, "f");
    }
    get EndLine() {
        return __classPrivateFieldGet(this, _Location_end_line, "f");
    }
    get EndColumn() {
        return __classPrivateFieldGet(this, _Location_end_column, "f");
    }
    get json() {
        return {
            file_name: __classPrivateFieldGet(this, _Location_file_name, "f"),
            start: { line: this.StartLine, column: this.StartColumn },
            last: { line: this.EndLine, column: this.EndColumn },
        };
    }
    toString() {
        return `\nFile: ${this.FileName}\nLine: ${this.StartLine}\nColumn: ${this.StartColumn}`;
    }
}
exports.Location = Location;
_Location_file_name = new WeakMap(), _Location_start_line = new WeakMap(), _Location_start_column = new WeakMap(), _Location_end_line = new WeakMap(), _Location_end_column = new WeakMap();
const name_chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
class Namer {
    static GetName() {
        let name = "";
        let current = __classPrivateFieldGet(this, _a, "f", _Namer_index);
        while (current >= 0) {
            name += name_chars[current];
            current -= name_chars.length;
        }
        __classPrivateFieldSet(this, _a, __classPrivateFieldGet(this, _a, "f", _Namer_index) + 1, "f", _Namer_index);
        return name;
    }
}
exports.Namer = Namer;
_a = Namer;
_Namer_index = { value: -1 };
//# sourceMappingURL=index.js.map