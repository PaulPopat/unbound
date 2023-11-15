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
var _TypeCollectorVisitor_types, _TypeCollectorVisitor_namespace, _TypeCollectorVisitor_using, _TypeCollectorVisitor_uses;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeCollectorVisitor = void 0;
const ast_1 = require("#compiler/ast");
const pattern_match_1 = require("../pattern-match");
class TypeCollectorVisitor extends ast_1.Visitor {
    constructor(types) {
        super();
        _TypeCollectorVisitor_types.set(this, void 0);
        _TypeCollectorVisitor_namespace.set(this, "");
        _TypeCollectorVisitor_using.set(this, []);
        _TypeCollectorVisitor_uses.set(this, {});
        __classPrivateFieldSet(this, _TypeCollectorVisitor_types, types, "f");
    }
    find(name) {
        if (__classPrivateFieldGet(this, _TypeCollectorVisitor_uses, "f")[name])
            return __classPrivateFieldGet(this, _TypeCollectorVisitor_uses, "f")[name];
        for (const area of __classPrivateFieldGet(this, _TypeCollectorVisitor_using, "f")) {
            const full = `${area}.${name}`;
            const possible = __classPrivateFieldGet(this, _TypeCollectorVisitor_types, "f")[full];
            if (!possible)
                continue;
            if (area === __classPrivateFieldGet(this, _TypeCollectorVisitor_namespace, "f"))
                return possible;
            if (possible.Exported)
                return possible;
        }
        return undefined;
    }
    get OperatesOn() {
        return [ast_1.Namespace, ast_1.UsingEntity, ast_1.FunctionEntity, ast_1.UseType];
    }
    Visit(target) {
        return (0, pattern_match_1.PatternMatch)(ast_1.Namespace, ast_1.UsingEntity, ast_1.FunctionEntity, ast_1.UseType)((namespace) => {
            __classPrivateFieldSet(this, _TypeCollectorVisitor_namespace, namespace.Name, "f");
            __classPrivateFieldSet(this, _TypeCollectorVisitor_using, [namespace.Name], "f");
            return {
                result: undefined,
                cleanup: () => {
                    __classPrivateFieldSet(this, _TypeCollectorVisitor_using, [], "f");
                    __classPrivateFieldSet(this, _TypeCollectorVisitor_uses, {}, "f");
                    __classPrivateFieldSet(this, _TypeCollectorVisitor_namespace, "", "f");
                },
            };
        }, (using) => {
            __classPrivateFieldSet(this, _TypeCollectorVisitor_using, [...__classPrivateFieldGet(this, _TypeCollectorVisitor_using, "f"), using.Name], "f");
            return {
                result: undefined,
                cleanup: () => { },
            };
        }, (functione) => {
            __classPrivateFieldSet(this, _TypeCollectorVisitor_uses, {}, "f");
            return {
                result: undefined,
                cleanup: () => {
                    __classPrivateFieldSet(this, _TypeCollectorVisitor_uses, {}, "f");
                },
            };
        }, (use) => {
            __classPrivateFieldGet(this, _TypeCollectorVisitor_uses, "f")[use.Name] = use;
            return {
                result: undefined,
                cleanup: () => { },
            };
        })(target);
    }
}
exports.TypeCollectorVisitor = TypeCollectorVisitor;
_TypeCollectorVisitor_types = new WeakMap(), _TypeCollectorVisitor_namespace = new WeakMap(), _TypeCollectorVisitor_using = new WeakMap(), _TypeCollectorVisitor_uses = new WeakMap();
//# sourceMappingURL=type-collector-visitor.js.map