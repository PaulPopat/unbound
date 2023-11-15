"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _WriterError_location, _WriterError_message;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WriterError = void 0;
const location_1 = require("#compiler/location");
class WriterError extends Error {
    constructor(location, message) {
        super(`${message}${location}`);
        _WriterError_location.set(this, void 0);
        _WriterError_message.set(this, void 0);
        __classPrivateFieldSet(this, _WriterError_location, location ?? new location_1.Location("", -1, -1, -1, -1), "f");
        __classPrivateFieldSet(this, _WriterError_message, message, "f");
    }
}
exports.WriterError = WriterError;
_WriterError_location = new WeakMap(), _WriterError_message = new WeakMap();
//# sourceMappingURL=error.js.map