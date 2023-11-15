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
var _Token_location, _Token_text, _TokenGroup_tokens, _TokenGroup_current;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenGroup = exports.Token = void 0;
class Token {
    constructor(location, text) {
        _Token_location.set(this, void 0);
        _Token_text.set(this, void 0);
        __classPrivateFieldSet(this, _Token_location, location, "f");
        __classPrivateFieldSet(this, _Token_text, text, "f");
    }
    get Location() {
        return __classPrivateFieldGet(this, _Token_location, "f");
    }
    get Text() {
        return __classPrivateFieldGet(this, _Token_text, "f");
    }
    get json() {
        return {
            location: __classPrivateFieldGet(this, _Token_location, "f").json,
            text: __classPrivateFieldGet(this, _Token_text, "f"),
        };
    }
}
exports.Token = Token;
_Token_location = new WeakMap(), _Token_text = new WeakMap();
class TokenGroup {
    constructor(tokens) {
        _TokenGroup_tokens.set(this, void 0);
        _TokenGroup_current.set(this, void 0);
        __classPrivateFieldSet(this, _TokenGroup_tokens, tokens, "f");
        __classPrivateFieldSet(this, _TokenGroup_current, __classPrivateFieldGet(this, _TokenGroup_tokens, "f").next(), "f");
    }
    next() {
        const result = __classPrivateFieldGet(this, _TokenGroup_current, "f");
        __classPrivateFieldSet(this, _TokenGroup_current, __classPrivateFieldGet(this, _TokenGroup_tokens, "f").next(), "f");
        return result;
    }
    peek() {
        if (__classPrivateFieldGet(this, _TokenGroup_current, "f").done)
            return undefined;
        return __classPrivateFieldGet(this, _TokenGroup_current, "f").value;
    }
}
exports.TokenGroup = TokenGroup;
_TokenGroup_tokens = new WeakMap(), _TokenGroup_current = new WeakMap();
//# sourceMappingURL=token.js.map