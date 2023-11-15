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
var _ReferenceNameIndexingVisitor_instances, _ReferenceNameIndexingVisitor_functions, _ReferenceNameIndexingVisitor_namespace, _ReferenceNameIndexingVisitor_using, _ReferenceNameIndexingVisitor_parameters, _ReferenceNameIndexingVisitor_locals, _ReferenceNameIndexingVisitor_add_local, _ReferenceNameIndexingVisitor_drop, _ReferenceNameIndexingVisitor_raise;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferenceNameIndexingVisitor = void 0;
const ast_1 = require("#compiler/ast");
const error_1 = require("../error");
class ReferenceNameIndexingVisitor extends ast_1.Visitor {
    constructor(functions) {
        super();
        _ReferenceNameIndexingVisitor_instances.add(this);
        _ReferenceNameIndexingVisitor_functions.set(this, void 0);
        _ReferenceNameIndexingVisitor_namespace.set(this, "");
        _ReferenceNameIndexingVisitor_using.set(this, []);
        _ReferenceNameIndexingVisitor_parameters.set(this, {});
        _ReferenceNameIndexingVisitor_locals.set(this, [{}]);
        __classPrivateFieldSet(this, _ReferenceNameIndexingVisitor_functions, functions, "f");
    }
    find(name) {
        for (const layer of __classPrivateFieldGet(this, _ReferenceNameIndexingVisitor_locals, "f"))
            if (layer[name])
                return layer[name];
        if (__classPrivateFieldGet(this, _ReferenceNameIndexingVisitor_parameters, "f")[name])
            return __classPrivateFieldGet(this, _ReferenceNameIndexingVisitor_parameters, "f")[name];
        for (const area of __classPrivateFieldGet(this, _ReferenceNameIndexingVisitor_using, "f")) {
            const full = `${area}.${name}`;
            const possible = __classPrivateFieldGet(this, _ReferenceNameIndexingVisitor_functions, "f")[full];
            if (!possible)
                continue;
            if (area === __classPrivateFieldGet(this, _ReferenceNameIndexingVisitor_namespace, "f") ||
                possible instanceof ast_1.ExternalFunctionDeclaration)
                return possible;
            if (possible.Exported)
                return possible;
        }
        return undefined;
    }
    get OperatesOn() {
        return [
            ast_1.Namespace,
            ast_1.UsingEntity,
            ast_1.FunctionEntity,
            ast_1.StoreStatement,
            ast_1.MakeExpression,
            ast_1.IfExpression,
            ast_1.CountExpression,
            ast_1.IterateExpression,
            ast_1.LambdaExpression,
        ];
    }
    Visit(target) {
        if (target instanceof ast_1.Namespace) {
            __classPrivateFieldSet(this, _ReferenceNameIndexingVisitor_namespace, target.Name, "f");
            __classPrivateFieldSet(this, _ReferenceNameIndexingVisitor_using, [target.Name], "f");
            return {
                result: undefined,
                cleanup: () => {
                    __classPrivateFieldSet(this, _ReferenceNameIndexingVisitor_using, [], "f");
                    __classPrivateFieldSet(this, _ReferenceNameIndexingVisitor_parameters, {}, "f");
                    __classPrivateFieldSet(this, _ReferenceNameIndexingVisitor_locals, [], "f");
                    __classPrivateFieldSet(this, _ReferenceNameIndexingVisitor_namespace, "", "f");
                },
            };
        }
        else if (target instanceof ast_1.UsingEntity) {
            __classPrivateFieldSet(this, _ReferenceNameIndexingVisitor_using, [...__classPrivateFieldGet(this, _ReferenceNameIndexingVisitor_using, "f"), target.Name], "f");
            return {
                result: undefined,
                cleanup: () => { },
            };
        }
        else if (target instanceof ast_1.FunctionEntity) {
            __classPrivateFieldSet(this, _ReferenceNameIndexingVisitor_parameters, [...target.Parameters.iterator()]
                .map((p) => {
                if (!(p instanceof ast_1.FunctionParameter) || !p.Type)
                    throw new error_1.LinkerError(p.Location, "Top level functions must have parameter types");
                return [p.Name, p];
            })
                .reduce((c, [n, t]) => ({ ...c, [n]: t }), {}), "f");
            return {
                result: undefined,
                cleanup: () => {
                    __classPrivateFieldSet(this, _ReferenceNameIndexingVisitor_parameters, {}, "f");
                    __classPrivateFieldSet(this, _ReferenceNameIndexingVisitor_locals, [], "f");
                },
            };
        }
        else if (target instanceof ast_1.StoreStatement) {
            __classPrivateFieldGet(this, _ReferenceNameIndexingVisitor_instances, "m", _ReferenceNameIndexingVisitor_add_local).call(this, target.Name, target);
            return {
                result: undefined,
                cleanup: () => { },
            };
        }
        else if (target instanceof ast_1.CountExpression ||
            target instanceof ast_1.IterateExpression) {
            __classPrivateFieldGet(this, _ReferenceNameIndexingVisitor_instances, "m", _ReferenceNameIndexingVisitor_raise).call(this);
            __classPrivateFieldGet(this, _ReferenceNameIndexingVisitor_instances, "m", _ReferenceNameIndexingVisitor_add_local).call(this, target.As, target);
            return {
                result: undefined,
                cleanup: () => __classPrivateFieldGet(this, _ReferenceNameIndexingVisitor_instances, "m", _ReferenceNameIndexingVisitor_drop).call(this),
            };
        }
        else if (target instanceof ast_1.IfExpression) {
            __classPrivateFieldGet(this, _ReferenceNameIndexingVisitor_instances, "m", _ReferenceNameIndexingVisitor_raise).call(this);
            return {
                result: undefined,
                cleanup: () => __classPrivateFieldGet(this, _ReferenceNameIndexingVisitor_instances, "m", _ReferenceNameIndexingVisitor_drop).call(this),
            };
        }
        else if (target instanceof ast_1.MakeExpression) {
            __classPrivateFieldGet(this, _ReferenceNameIndexingVisitor_instances, "m", _ReferenceNameIndexingVisitor_raise).call(this);
            return {
                result: undefined,
                cleanup: () => __classPrivateFieldGet(this, _ReferenceNameIndexingVisitor_instances, "m", _ReferenceNameIndexingVisitor_drop).call(this),
            };
        }
        else if (target instanceof ast_1.LambdaExpression) {
            __classPrivateFieldGet(this, _ReferenceNameIndexingVisitor_instances, "m", _ReferenceNameIndexingVisitor_raise).call(this);
            const locals = [...target.Parameters.iterator()]
                .map((p) => {
                if (!(p instanceof ast_1.FunctionParameter) || !p.Type)
                    throw new error_1.LinkerError(p.Location, "Currently, lambdas must have parameter types");
                return [p.Name, p];
            })
                .reduce((c, [n, t]) => ({ ...c, [n]: t }), {});
            for (const local in locals)
                __classPrivateFieldGet(this, _ReferenceNameIndexingVisitor_instances, "m", _ReferenceNameIndexingVisitor_add_local).call(this, local, locals[local]);
            return {
                result: undefined,
                cleanup: () => {
                    __classPrivateFieldGet(this, _ReferenceNameIndexingVisitor_instances, "m", _ReferenceNameIndexingVisitor_drop).call(this);
                },
            };
        }
        throw new error_1.LinkerError(target.Location, "Component is not a recognised type");
    }
}
exports.ReferenceNameIndexingVisitor = ReferenceNameIndexingVisitor;
_ReferenceNameIndexingVisitor_functions = new WeakMap(), _ReferenceNameIndexingVisitor_namespace = new WeakMap(), _ReferenceNameIndexingVisitor_using = new WeakMap(), _ReferenceNameIndexingVisitor_parameters = new WeakMap(), _ReferenceNameIndexingVisitor_locals = new WeakMap(), _ReferenceNameIndexingVisitor_instances = new WeakSet(), _ReferenceNameIndexingVisitor_add_local = function _ReferenceNameIndexingVisitor_add_local(name, statement) {
    __classPrivateFieldGet(this, _ReferenceNameIndexingVisitor_locals, "f")[__classPrivateFieldGet(this, _ReferenceNameIndexingVisitor_locals, "f").length - 1][name] = statement;
}, _ReferenceNameIndexingVisitor_drop = function _ReferenceNameIndexingVisitor_drop() {
    __classPrivateFieldSet(this, _ReferenceNameIndexingVisitor_locals, __classPrivateFieldGet(this, _ReferenceNameIndexingVisitor_locals, "f").slice(0, __classPrivateFieldGet(this, _ReferenceNameIndexingVisitor_locals, "f").length - 1), "f");
}, _ReferenceNameIndexingVisitor_raise = function _ReferenceNameIndexingVisitor_raise() {
    __classPrivateFieldSet(this, _ReferenceNameIndexingVisitor_locals, [...__classPrivateFieldGet(this, _ReferenceNameIndexingVisitor_locals, "f"), {}], "f");
};
//# sourceMappingURL=reference-name-indexing-visitor.js.map