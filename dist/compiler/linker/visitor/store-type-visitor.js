"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _StoreTypeVisitor_instances, _StoreTypeVisitor_resolve_expression;
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreTypeVisitor = void 0;
const ast_1 = require("#compiler/ast");
const type_collector_visitor_1 = require("./type-collector-visitor");
const pattern_match_1 = require("../pattern-match");
const error_1 = require("../error");
class StoreTypeVisitor extends type_collector_visitor_1.TypeCollectorVisitor {
    constructor(types) {
        super(types);
        _StoreTypeVisitor_instances.add(this);
    }
    get OperatesOn() {
        return [...super.OperatesOn, ast_1.StoreStatement];
    }
    Visit(target) {
        if (target instanceof ast_1.StoreStatement) {
            return {
                result: new ast_1.StoreStatement(target.Location, target.Name, target.Equals, __classPrivateFieldGet(this, _StoreTypeVisitor_instances, "m", _StoreTypeVisitor_resolve_expression).call(this, target.Equals)),
                cleanup: () => { },
            };
        }
        return super.Visit(target);
    }
}
exports.StoreTypeVisitor = StoreTypeVisitor;
_StoreTypeVisitor_instances = new WeakSet(), _StoreTypeVisitor_resolve_expression = function _StoreTypeVisitor_resolve_expression(expression) {
    return (0, pattern_match_1.PatternMatch)(ast_1.LiteralExpression, ast_1.NextExpression, ast_1.OperatorExpression, ast_1.IfExpression, ast_1.CountExpression, ast_1.IterateExpression, ast_1.MakeExpression, ast_1.IsExpression, ast_1.ReferenceExpression, ast_1.BracketsExpression, ast_1.LambdaExpression, ast_1.InvokationExpression, ast_1.AccessExpression)((literal) => {
        if (literal.Type === "string") {
            return new ast_1.IterableType(literal.Location, new ast_1.PrimitiveType(literal.Location, "char"));
        }
        return new ast_1.PrimitiveType(literal.Location, literal.Type === "char"
            ? "char"
            : literal.Type === "double"
                ? "double"
                : literal.Type === "float"
                    ? "float"
                    : literal.Type === "int"
                        ? "int"
                        : literal.Type === "long"
                            ? "long"
                            : literal.Type === "bool"
                                ? "bool"
                                : "any");
    }, (next) => {
        return new ast_1.PrimitiveType(next.Location, "any");
    }, (operator) => {
        return __classPrivateFieldGet(this, _StoreTypeVisitor_instances, "m", _StoreTypeVisitor_resolve_expression).call(this, operator.Right);
    }, (if_) => {
        for (const statement of if_.If.iterator())
            if (statement instanceof ast_1.ReturnStatement)
                return __classPrivateFieldGet(this, _StoreTypeVisitor_instances, "m", _StoreTypeVisitor_resolve_expression).call(this, statement.Value);
        throw new error_1.LinkerError(if_.Location, "If statements must have a return value");
    }, (count) => {
        for (const statement of count.Body.iterator())
            if (statement instanceof ast_1.ReturnStatement)
                return __classPrivateFieldGet(this, _StoreTypeVisitor_instances, "m", _StoreTypeVisitor_resolve_expression).call(this, statement.Value);
        throw new error_1.LinkerError(count.Location, "Loops must have a return value");
    }, (iterate) => {
        for (const statement of iterate.Body.iterator())
            if (statement instanceof ast_1.ReturnStatement)
                return __classPrivateFieldGet(this, _StoreTypeVisitor_instances, "m", _StoreTypeVisitor_resolve_expression).call(this, statement.Value);
        throw new error_1.LinkerError(iterate.Location, "Loops must have a return value");
    }, (make) => {
        const entity = make.StructEntity;
        if (!entity)
            throw new error_1.LinkerError(make.Location, "Could not resolve struct");
        return entity;
    }, (is) => {
        return new ast_1.PrimitiveType(is.Location, "bool");
    }, (reference) => {
        if (!reference.References)
            throw new error_1.LinkerError(reference.Location, "Unresolved reference");
        return reference.References;
    }, (bracket) => {
        return __classPrivateFieldGet(this, _StoreTypeVisitor_instances, "m", _StoreTypeVisitor_resolve_expression).call(this, bracket.Expression);
    }, (lambda) => {
        return new ast_1.FunctionType(lambda.Location, lambda.Parameters, __classPrivateFieldGet(this, _StoreTypeVisitor_instances, "m", _StoreTypeVisitor_resolve_expression).call(this, lambda.Expression));
    }, (invoke) => {
        const subject = __classPrivateFieldGet(this, _StoreTypeVisitor_instances, "m", _StoreTypeVisitor_resolve_expression).call(this, invoke.Subject);
        if (subject instanceof ast_1.FunctionEntity) {
            const result = subject.Returns;
            if (!result)
                throw new error_1.LinkerError(invoke.Location, "Functions must currently return a type. Inference to come.");
            return result;
        }
        if (subject instanceof ast_1.FunctionType) {
            return subject.Returns;
        }
        if (subject instanceof ast_1.LambdaExpression) {
            return __classPrivateFieldGet(this, _StoreTypeVisitor_instances, "m", _StoreTypeVisitor_resolve_expression).call(this, subject.Expression);
        }
        throw new Error("Attempting to invoke a none function");
    }, (access) => {
        const references = __classPrivateFieldGet(this, _StoreTypeVisitor_instances, "m", _StoreTypeVisitor_resolve_expression).call(this, access.Subject);
        if (!(references instanceof ast_1.StructEntity))
            throw new error_1.LinkerError(access.Location, "Attempting to access a none struct");
        const property = references.GetKey(access.Target);
        if (!property)
            throw new error_1.LinkerError(access.Location, "Target has no key");
        return property.Type;
    })(expression);
};
//# sourceMappingURL=store-type-visitor.js.map