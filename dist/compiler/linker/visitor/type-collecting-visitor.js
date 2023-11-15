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
var _TypeCollectingVisitor_types, _TypeCollectingVisitor_namespace;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeCollectingVisitor = void 0;
const ast_1 = require("#compiler/ast");
const error_1 = require("../error");
class TypeCollectingVisitor extends ast_1.Visitor {
    constructor() {
        super();
        _TypeCollectingVisitor_types.set(this, {});
        _TypeCollectingVisitor_namespace.set(this, "");
    }
    get Types() {
        return __classPrivateFieldGet(this, _TypeCollectingVisitor_types, "f");
    }
    get OperatesOn() {
        return [ast_1.Namespace, ast_1.StructEntity, ast_1.SchemaEntity];
    }
    Visit(target) {
        if (target instanceof ast_1.Namespace) {
            __classPrivateFieldSet(this, _TypeCollectingVisitor_namespace, target.Name, "f");
            return {
                result: undefined,
                cleanup: () => {
                    __classPrivateFieldSet(this, _TypeCollectingVisitor_namespace, "", "f");
                },
            };
        }
        else if (target instanceof ast_1.StructEntity ||
            target instanceof ast_1.SchemaEntity) {
            __classPrivateFieldGet(this, _TypeCollectingVisitor_types, "f")[`${__classPrivateFieldGet(this, _TypeCollectingVisitor_namespace, "f")}.${target.Name}`] = target;
            return {
                result: undefined,
                cleanup: () => { },
            };
        }
        throw new error_1.LinkerError(target.Location, "Component is not a recognised type");
    }
}
exports.TypeCollectingVisitor = TypeCollectingVisitor;
_TypeCollectingVisitor_types = new WeakMap(), _TypeCollectingVisitor_namespace = new WeakMap();
