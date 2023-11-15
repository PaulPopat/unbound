"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessExpression = exports.InvokationExpression = exports.LambdaExpression = exports.BracketsExpression = exports.ReferenceExpression = exports.IsExpression = exports.MakeExpression = exports.IterateExpression = exports.CountExpression = exports.IfExpression = exports.OperatorExpression = exports.Operators = exports.NextExpression = exports.LiteralExpression = exports.Expression = void 0;
const base_1 = require("./base");
class Expression extends base_1.Component {
}
exports.Expression = Expression;
let LiteralExpression = (() => {
    var _LiteralExpression_type, _LiteralExpression_value;
    let _classDecorators = [base_1.AstItem];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Expression;
    var LiteralExpression = _classThis = class extends _classSuper {
        constructor(ctx, type, value) {
            super(ctx);
            _LiteralExpression_type.set(this, void 0);
            _LiteralExpression_value.set(this, void 0);
            __classPrivateFieldSet(this, _LiteralExpression_type, type, "f");
            __classPrivateFieldSet(this, _LiteralExpression_value, value, "f");
        }
        get Type() {
            return __classPrivateFieldGet(this, _LiteralExpression_type, "f");
        }
        get Value() {
            return __classPrivateFieldGet(this, _LiteralExpression_value, "f");
        }
        get type_name() {
            return "literal_expression";
        }
        get extra_json() {
            return {
                type_name: __classPrivateFieldGet(this, _LiteralExpression_type, "f"),
                value: __classPrivateFieldGet(this, _LiteralExpression_value, "f"),
            };
        }
    };
    _LiteralExpression_type = new WeakMap();
    _LiteralExpression_value = new WeakMap();
    __setFunctionName(_classThis, "LiteralExpression");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LiteralExpression = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LiteralExpression = _classThis;
})();
exports.LiteralExpression = LiteralExpression;
let NextExpression = (() => {
    let _classDecorators = [base_1.AstItem];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Expression;
    var NextExpression = _classThis = class extends _classSuper {
        constructor(ctx) {
            super(ctx);
        }
        get type_name() {
            return "next_expression";
        }
        get extra_json() {
            return {};
        }
    };
    __setFunctionName(_classThis, "NextExpression");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        NextExpression = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return NextExpression = _classThis;
})();
exports.NextExpression = NextExpression;
exports.Operators = [
    "+",
    "-",
    "/",
    "*",
    "==",
    "!=",
    "<",
    ">",
    "<=",
    ">=",
];
let OperatorExpression = (() => {
    var _OperatorExpression_left, _OperatorExpression_operator, _OperatorExpression_right;
    let _classDecorators = [base_1.AstItem];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Expression;
    var OperatorExpression = _classThis = class extends _classSuper {
        constructor(ctx, left, operator, right) {
            super(ctx);
            _OperatorExpression_left.set(this, void 0);
            _OperatorExpression_operator.set(this, void 0);
            _OperatorExpression_right.set(this, void 0);
            __classPrivateFieldSet(this, _OperatorExpression_left, left.Index, "f");
            __classPrivateFieldSet(this, _OperatorExpression_operator, operator, "f");
            __classPrivateFieldSet(this, _OperatorExpression_right, right.Index, "f");
        }
        get Left() {
            return base_1.ComponentStore.Get(__classPrivateFieldGet(this, _OperatorExpression_left, "f"));
        }
        get Operator() {
            return __classPrivateFieldGet(this, _OperatorExpression_operator, "f");
        }
        get Right() {
            return base_1.ComponentStore.Get(__classPrivateFieldGet(this, _OperatorExpression_right, "f"));
        }
        get type_name() {
            return "operator_expression";
        }
        get extra_json() {
            return {
                left: __classPrivateFieldGet(this, _OperatorExpression_left, "f"),
                operator: __classPrivateFieldGet(this, _OperatorExpression_operator, "f"),
                right: __classPrivateFieldGet(this, _OperatorExpression_right, "f"),
            };
        }
    };
    _OperatorExpression_left = new WeakMap();
    _OperatorExpression_operator = new WeakMap();
    _OperatorExpression_right = new WeakMap();
    __setFunctionName(_classThis, "OperatorExpression");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        OperatorExpression = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return OperatorExpression = _classThis;
})();
exports.OperatorExpression = OperatorExpression;
let IfExpression = (() => {
    var _IfExpression_check, _IfExpression_if, _IfExpression_else;
    let _classDecorators = [base_1.AstItem];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Expression;
    var IfExpression = _classThis = class extends _classSuper {
        constructor(ctx, check, on_if, on_else) {
            super(ctx);
            _IfExpression_check.set(this, void 0);
            _IfExpression_if.set(this, void 0);
            _IfExpression_else.set(this, void 0);
            __classPrivateFieldSet(this, _IfExpression_check, check.Index, "f");
            __classPrivateFieldSet(this, _IfExpression_if, on_if, "f");
            __classPrivateFieldSet(this, _IfExpression_else, on_else, "f");
        }
        get Check() {
            return base_1.ComponentStore.Get(__classPrivateFieldGet(this, _IfExpression_check, "f"));
        }
        get If() {
            return __classPrivateFieldGet(this, _IfExpression_if, "f");
        }
        get Else() {
            return __classPrivateFieldGet(this, _IfExpression_else, "f");
        }
        get type_name() {
            return "if_expression";
        }
        get extra_json() {
            return {
                check: __classPrivateFieldGet(this, _IfExpression_check, "f"),
                if: __classPrivateFieldGet(this, _IfExpression_if, "f").json,
                else: __classPrivateFieldGet(this, _IfExpression_else, "f").json,
            };
        }
    };
    _IfExpression_check = new WeakMap();
    _IfExpression_if = new WeakMap();
    _IfExpression_else = new WeakMap();
    __setFunctionName(_classThis, "IfExpression");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        IfExpression = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return IfExpression = _classThis;
})();
exports.IfExpression = IfExpression;
let CountExpression = (() => {
    var _CountExpression_to, _CountExpression_as, _CountExpression_using;
    let _classDecorators = [base_1.AstItem];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Expression;
    var CountExpression = _classThis = class extends _classSuper {
        constructor(ctx, to, as, using) {
            super(ctx);
            _CountExpression_to.set(this, void 0);
            _CountExpression_as.set(this, void 0);
            _CountExpression_using.set(this, void 0);
            __classPrivateFieldSet(this, _CountExpression_to, to.Index, "f");
            __classPrivateFieldSet(this, _CountExpression_as, as, "f");
            __classPrivateFieldSet(this, _CountExpression_using, using, "f");
        }
        get To() {
            return base_1.ComponentStore.Get(__classPrivateFieldGet(this, _CountExpression_to, "f"));
        }
        get As() {
            return __classPrivateFieldGet(this, _CountExpression_as, "f");
        }
        get Body() {
            return __classPrivateFieldGet(this, _CountExpression_using, "f");
        }
        get type_name() {
            return "count_expression";
        }
        get extra_json() {
            return {
                to: __classPrivateFieldGet(this, _CountExpression_to, "f"),
                as: __classPrivateFieldGet(this, _CountExpression_as, "f"),
                using: __classPrivateFieldGet(this, _CountExpression_using, "f").json,
            };
        }
    };
    _CountExpression_to = new WeakMap();
    _CountExpression_as = new WeakMap();
    _CountExpression_using = new WeakMap();
    __setFunctionName(_classThis, "CountExpression");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        CountExpression = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return CountExpression = _classThis;
})();
exports.CountExpression = CountExpression;
let IterateExpression = (() => {
    var _IterateExpression_over, _IterateExpression_as, _IterateExpression_using;
    let _classDecorators = [base_1.AstItem];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Expression;
    var IterateExpression = _classThis = class extends _classSuper {
        constructor(ctx, over, as, using) {
            super(ctx);
            _IterateExpression_over.set(this, void 0);
            _IterateExpression_as.set(this, void 0);
            _IterateExpression_using.set(this, void 0);
            __classPrivateFieldSet(this, _IterateExpression_over, over.Index, "f");
            __classPrivateFieldSet(this, _IterateExpression_as, as, "f");
            __classPrivateFieldSet(this, _IterateExpression_using, using, "f");
        }
        get Over() {
            return base_1.ComponentStore.Get(__classPrivateFieldGet(this, _IterateExpression_over, "f"));
        }
        get As() {
            return __classPrivateFieldGet(this, _IterateExpression_as, "f");
        }
        get Body() {
            return __classPrivateFieldGet(this, _IterateExpression_using, "f");
        }
        get type_name() {
            return "iterate_expression";
        }
        get extra_json() {
            return {
                over: __classPrivateFieldGet(this, _IterateExpression_over, "f"),
                as: __classPrivateFieldGet(this, _IterateExpression_as, "f"),
                using: __classPrivateFieldGet(this, _IterateExpression_using, "f").json,
            };
        }
    };
    _IterateExpression_over = new WeakMap();
    _IterateExpression_as = new WeakMap();
    _IterateExpression_using = new WeakMap();
    __setFunctionName(_classThis, "IterateExpression");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        IterateExpression = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return IterateExpression = _classThis;
})();
exports.IterateExpression = IterateExpression;
let MakeExpression = (() => {
    var _MakeExpression_struct, _MakeExpression_using, _MakeExpression_struct_entity;
    let _classDecorators = [base_1.AstItem];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Expression;
    var MakeExpression = _classThis = class extends _classSuper {
        constructor(ctx, struct, using, struct_entity) {
            super(ctx);
            _MakeExpression_struct.set(this, void 0);
            _MakeExpression_using.set(this, void 0);
            _MakeExpression_struct_entity.set(this, void 0);
            __classPrivateFieldSet(this, _MakeExpression_struct, struct, "f");
            __classPrivateFieldSet(this, _MakeExpression_using, using, "f");
            __classPrivateFieldSet(this, _MakeExpression_struct_entity, struct_entity?.Index, "f");
        }
        get Struct() {
            return __classPrivateFieldGet(this, _MakeExpression_struct, "f");
        }
        get Using() {
            return __classPrivateFieldGet(this, _MakeExpression_using, "f");
        }
        get StructEntity() {
            return __classPrivateFieldGet(this, _MakeExpression_struct_entity, "f")
                ? base_1.ComponentStore.Get(__classPrivateFieldGet(this, _MakeExpression_struct_entity, "f"))
                : undefined;
        }
        get type_name() {
            return "make_expression";
        }
        get extra_json() {
            return {
                struct: __classPrivateFieldGet(this, _MakeExpression_struct, "f"),
                using: __classPrivateFieldGet(this, _MakeExpression_using, "f").json,
            };
        }
    };
    _MakeExpression_struct = new WeakMap();
    _MakeExpression_using = new WeakMap();
    _MakeExpression_struct_entity = new WeakMap();
    __setFunctionName(_classThis, "MakeExpression");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        MakeExpression = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return MakeExpression = _classThis;
})();
exports.MakeExpression = MakeExpression;
let IsExpression = (() => {
    var _IsExpression_left, _IsExpression_right;
    let _classDecorators = [base_1.AstItem];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Expression;
    var IsExpression = _classThis = class extends _classSuper {
        constructor(ctx, left, right) {
            super(ctx);
            _IsExpression_left.set(this, void 0);
            _IsExpression_right.set(this, void 0);
            __classPrivateFieldSet(this, _IsExpression_left, left.Index, "f");
            __classPrivateFieldSet(this, _IsExpression_right, right.Index, "f");
        }
        get Left() {
            return base_1.ComponentStore.Get(__classPrivateFieldGet(this, _IsExpression_left, "f"));
        }
        get Right() {
            return base_1.ComponentStore.Get(__classPrivateFieldGet(this, _IsExpression_right, "f"));
        }
        get type_name() {
            return "is_expression";
        }
        get extra_json() {
            return {
                left: __classPrivateFieldGet(this, _IsExpression_left, "f"),
                right: __classPrivateFieldGet(this, _IsExpression_right, "f"),
            };
        }
    };
    _IsExpression_left = new WeakMap();
    _IsExpression_right = new WeakMap();
    __setFunctionName(_classThis, "IsExpression");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        IsExpression = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return IsExpression = _classThis;
})();
exports.IsExpression = IsExpression;
let ReferenceExpression = (() => {
    var _ReferenceExpression_name, _ReferenceExpression_references;
    let _classDecorators = [base_1.AstItem];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Expression;
    var ReferenceExpression = _classThis = class extends _classSuper {
        constructor(ctx, name, references) {
            super(ctx);
            _ReferenceExpression_name.set(this, void 0);
            _ReferenceExpression_references.set(this, void 0);
            __classPrivateFieldSet(this, _ReferenceExpression_name, name, "f");
            __classPrivateFieldSet(this, _ReferenceExpression_references, references?.Index, "f");
        }
        get Name() {
            return __classPrivateFieldGet(this, _ReferenceExpression_name, "f");
        }
        get References() {
            return __classPrivateFieldGet(this, _ReferenceExpression_references, "f") ? base_1.ComponentStore.Get(__classPrivateFieldGet(this, _ReferenceExpression_references, "f")) : undefined;
        }
        get type_name() {
            return "reference_expression";
        }
        get extra_json() {
            return {
                name: __classPrivateFieldGet(this, _ReferenceExpression_name, "f"),
                references: __classPrivateFieldGet(this, _ReferenceExpression_references, "f"),
            };
        }
    };
    _ReferenceExpression_name = new WeakMap();
    _ReferenceExpression_references = new WeakMap();
    __setFunctionName(_classThis, "ReferenceExpression");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ReferenceExpression = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ReferenceExpression = _classThis;
})();
exports.ReferenceExpression = ReferenceExpression;
let BracketsExpression = (() => {
    var _BracketsExpression_expression;
    let _classDecorators = [base_1.AstItem];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Expression;
    var BracketsExpression = _classThis = class extends _classSuper {
        constructor(ctx, expression) {
            super(ctx);
            _BracketsExpression_expression.set(this, void 0);
            __classPrivateFieldSet(this, _BracketsExpression_expression, expression.Index, "f");
        }
        get Expression() {
            return base_1.ComponentStore.Get(__classPrivateFieldGet(this, _BracketsExpression_expression, "f"));
        }
        get type_name() {
            return "brackets_expression";
        }
        get extra_json() {
            return {
                expression: __classPrivateFieldGet(this, _BracketsExpression_expression, "f"),
            };
        }
    };
    _BracketsExpression_expression = new WeakMap();
    __setFunctionName(_classThis, "BracketsExpression");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        BracketsExpression = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return BracketsExpression = _classThis;
})();
exports.BracketsExpression = BracketsExpression;
let LambdaExpression = (() => {
    var _LambdaExpression_parameters, _LambdaExpression_expression;
    let _classDecorators = [base_1.AstItem];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Expression;
    var LambdaExpression = _classThis = class extends _classSuper {
        constructor(ctx, parameters, expression) {
            super(ctx);
            _LambdaExpression_parameters.set(this, void 0);
            _LambdaExpression_expression.set(this, void 0);
            __classPrivateFieldSet(this, _LambdaExpression_parameters, parameters, "f");
            __classPrivateFieldSet(this, _LambdaExpression_expression, expression.Index, "f");
        }
        get Parameters() {
            return __classPrivateFieldGet(this, _LambdaExpression_parameters, "f");
        }
        get Expression() {
            return base_1.ComponentStore.Get(__classPrivateFieldGet(this, _LambdaExpression_expression, "f"));
        }
        get type_name() {
            return "lambda_expression";
        }
        get extra_json() {
            return {
                parameters: __classPrivateFieldGet(this, _LambdaExpression_parameters, "f").json,
                expression: __classPrivateFieldGet(this, _LambdaExpression_expression, "f"),
            };
        }
    };
    _LambdaExpression_parameters = new WeakMap();
    _LambdaExpression_expression = new WeakMap();
    __setFunctionName(_classThis, "LambdaExpression");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LambdaExpression = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LambdaExpression = _classThis;
})();
exports.LambdaExpression = LambdaExpression;
let InvokationExpression = (() => {
    var _InvokationExpression_subject, _InvokationExpression_parameters;
    let _classDecorators = [base_1.AstItem];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Expression;
    var InvokationExpression = _classThis = class extends _classSuper {
        constructor(ctx, subject, parameters) {
            super(ctx);
            _InvokationExpression_subject.set(this, void 0);
            _InvokationExpression_parameters.set(this, void 0);
            __classPrivateFieldSet(this, _InvokationExpression_subject, subject.Index, "f");
            __classPrivateFieldSet(this, _InvokationExpression_parameters, parameters, "f");
        }
        get Subject() {
            return base_1.ComponentStore.Get(__classPrivateFieldGet(this, _InvokationExpression_subject, "f"));
        }
        get Parameters() {
            return __classPrivateFieldGet(this, _InvokationExpression_parameters, "f");
        }
        get type_name() {
            return "invokation_expression";
        }
        get extra_json() {
            return {
                subject: __classPrivateFieldGet(this, _InvokationExpression_subject, "f"),
                parameters: __classPrivateFieldGet(this, _InvokationExpression_parameters, "f").json,
            };
        }
    };
    _InvokationExpression_subject = new WeakMap();
    _InvokationExpression_parameters = new WeakMap();
    __setFunctionName(_classThis, "InvokationExpression");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        InvokationExpression = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return InvokationExpression = _classThis;
})();
exports.InvokationExpression = InvokationExpression;
let AccessExpression = (() => {
    var _AccessExpression_subject, _AccessExpression_target;
    let _classDecorators = [base_1.AstItem];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Expression;
    var AccessExpression = _classThis = class extends _classSuper {
        constructor(ctx, subject, target) {
            super(ctx);
            _AccessExpression_subject.set(this, void 0);
            _AccessExpression_target.set(this, void 0);
            __classPrivateFieldSet(this, _AccessExpression_subject, subject.Index, "f");
            __classPrivateFieldSet(this, _AccessExpression_target, target, "f");
        }
        get Subject() {
            return base_1.ComponentStore.Get(__classPrivateFieldGet(this, _AccessExpression_subject, "f"));
        }
        get Target() {
            return __classPrivateFieldGet(this, _AccessExpression_target, "f");
        }
        get type_name() {
            return "access_expression";
        }
        get extra_json() {
            return {
                subject: __classPrivateFieldGet(this, _AccessExpression_subject, "f"),
                target: __classPrivateFieldGet(this, _AccessExpression_target, "f"),
            };
        }
    };
    _AccessExpression_subject = new WeakMap();
    _AccessExpression_target = new WeakMap();
    __setFunctionName(_classThis, "AccessExpression");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AccessExpression = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AccessExpression = _classThis;
})();
exports.AccessExpression = AccessExpression;
//# sourceMappingURL=expression.js.map