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
var _FunctionCollectingVisitor_functions, _FunctionCollectingVisitor_namespace;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FunctionCollectingVisitor = void 0;
const ast_1 = require("#compiler/ast");
const error_1 = require("../error");
class FunctionCollectingVisitor extends ast_1.Visitor {
    constructor() {
        super();
        _FunctionCollectingVisitor_functions.set(this, {});
        _FunctionCollectingVisitor_namespace.set(this, "");
    }
    get Functions() {
        return __classPrivateFieldGet(this, _FunctionCollectingVisitor_functions, "f");
    }
    get OperatesOn() {
        return [ast_1.Namespace, ast_1.FunctionEntity, ast_1.ExternalFunctionDeclaration];
    }
    Visit(target) {
        if (target instanceof ast_1.Namespace) {
            __classPrivateFieldSet(this, _FunctionCollectingVisitor_namespace, target.Name, "f");
            return {
                result: undefined,
                cleanup: () => {
                    __classPrivateFieldSet(this, _FunctionCollectingVisitor_namespace, "", "f");
                },
            };
        }
        else if (target instanceof ast_1.FunctionEntity ||
            target instanceof ast_1.ExternalFunctionDeclaration) {
            __classPrivateFieldGet(this, _FunctionCollectingVisitor_functions, "f")[`${__classPrivateFieldGet(this, _FunctionCollectingVisitor_namespace, "f")}.${target.Name}`] = target;
            return {
                result: undefined,
                cleanup: () => { },
            };
        }
        throw new error_1.LinkerError(target.Location, "Component is not a recognised type");
    }
}
exports.FunctionCollectingVisitor = FunctionCollectingVisitor;
_FunctionCollectingVisitor_functions = new WeakMap(), _FunctionCollectingVisitor_namespace = new WeakMap();
//# sourceMappingURL=function-collecting-visitor.js.map