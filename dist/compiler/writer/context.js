"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _CFile_content;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CFile = void 0;
class CFile {
    constructor() {
        _CFile_content.set(this, []);
    }
    add_c(text) {
        __classPrivateFieldSet(this, _CFile_content, [...__classPrivateFieldGet(this, _CFile_content, "f"), text], "f");
    }
}
exports.CFile = CFile;
_CFile_content = new WeakMap();
//# sourceMappingURL=context.js.map