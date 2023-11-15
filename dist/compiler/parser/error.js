"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _ParserError_location, _ParserError_message;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ParserError = void 0;
const location_1 = require("#compiler/location");
class ParserError extends Error {
    constructor(location, message) {
        super(`${message}${location}`);
        _ParserError_location.set(this, void 0);
        _ParserError_message.set(this, void 0);
        __classPrivateFieldSet(this, _ParserError_location, location ?? new location_1.Location("", -1, -1, -1, -1), "f");
        __classPrivateFieldSet(this, _ParserError_message, message, "f");
    }
    static get EndOfFile() {
        return new ParserError(undefined, "Unexpected end of file");
    }
    static UnexpectedSymbol(received, ...expected) {
        return new ParserError(received.Location, `Unexpected symbol. Expected one of ${expected
            .map((e) => `'${e}'`)
            .join(", ")} but received '${received.Text}'`);
    }
}
exports.ParserError = ParserError;
_ParserError_location = new WeakMap(), _ParserError_message = new WeakMap();
//# sourceMappingURL=error.js.map