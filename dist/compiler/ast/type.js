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
exports.UseType = exports.FunctionType = exports.IterableType = exports.PrimitiveType = exports.IsPrimitiveName = exports.PrimitiveNames = exports.ReferenceType = exports.SchemaType = exports.Type = void 0;
const base_1 = require("./base");
class Type extends base_1.Component {
}
exports.Type = Type;
let SchemaType = (() => {
    var _SchemaType_name, _SchemaType_properties;
    let _classDecorators = [base_1.AstItem];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Type;
    var SchemaType = _classThis = class extends _classSuper {
        constructor(ctx, name, properties) {
            super(ctx);
            _SchemaType_name.set(this, void 0);
            _SchemaType_properties.set(this, void 0);
            __classPrivateFieldSet(this, _SchemaType_name, name, "f");
            __classPrivateFieldSet(this, _SchemaType_properties, properties, "f");
        }
        get type_name() {
            return "schema_type";
        }
        get extra_json() {
            return {
                name: __classPrivateFieldGet(this, _SchemaType_name, "f"),
                properties: __classPrivateFieldGet(this, _SchemaType_properties, "f").json,
            };
        }
    };
    _SchemaType_name = new WeakMap();
    _SchemaType_properties = new WeakMap();
    __setFunctionName(_classThis, "SchemaType");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SchemaType = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SchemaType = _classThis;
})();
exports.SchemaType = SchemaType;
let ReferenceType = (() => {
    var _ReferenceType_name, _ReferenceType_references;
    let _classDecorators = [base_1.AstItem];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Type;
    var ReferenceType = _classThis = class extends _classSuper {
        constructor(ctx, name, references) {
            super(ctx);
            _ReferenceType_name.set(this, void 0);
            _ReferenceType_references.set(this, void 0);
            __classPrivateFieldSet(this, _ReferenceType_name, name, "f");
            __classPrivateFieldSet(this, _ReferenceType_references, references?.Index, "f");
        }
        get Name() {
            return __classPrivateFieldGet(this, _ReferenceType_name, "f");
        }
        get References() {
            return __classPrivateFieldGet(this, _ReferenceType_references, "f") ? base_1.ComponentStore.Get(__classPrivateFieldGet(this, _ReferenceType_references, "f")) : undefined;
        }
        get type_name() {
            return "reference_type";
        }
        get extra_json() {
            return {
                name: __classPrivateFieldGet(this, _ReferenceType_name, "f"),
                references: __classPrivateFieldGet(this, _ReferenceType_references, "f"),
            };
        }
    };
    _ReferenceType_name = new WeakMap();
    _ReferenceType_references = new WeakMap();
    __setFunctionName(_classThis, "ReferenceType");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ReferenceType = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ReferenceType = _classThis;
})();
exports.ReferenceType = ReferenceType;
exports.PrimitiveNames = [
    "int",
    "char",
    "double",
    "float",
    "bool",
    "long",
    "any",
];
function IsPrimitiveName(input) {
    return exports.PrimitiveNames.includes(input);
}
exports.IsPrimitiveName = IsPrimitiveName;
let PrimitiveType = (() => {
    var _PrimitiveType_name;
    let _classDecorators = [base_1.AstItem];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Type;
    var PrimitiveType = _classThis = class extends _classSuper {
        constructor(ctx, name) {
            super(ctx);
            _PrimitiveType_name.set(this, void 0);
            __classPrivateFieldSet(this, _PrimitiveType_name, name, "f");
        }
        get type_name() {
            return "primitive_type";
        }
        get extra_json() {
            return {
                name: __classPrivateFieldGet(this, _PrimitiveType_name, "f"),
            };
        }
    };
    _PrimitiveType_name = new WeakMap();
    __setFunctionName(_classThis, "PrimitiveType");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PrimitiveType = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PrimitiveType = _classThis;
})();
exports.PrimitiveType = PrimitiveType;
let IterableType = (() => {
    var _IterableType_type;
    let _classDecorators = [base_1.AstItem];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Type;
    var IterableType = _classThis = class extends _classSuper {
        constructor(ctx, type) {
            super(ctx);
            _IterableType_type.set(this, void 0);
            __classPrivateFieldSet(this, _IterableType_type, type.Index, "f");
        }
        get Type() {
            return base_1.ComponentStore.Get(__classPrivateFieldGet(this, _IterableType_type, "f"));
        }
        get type_name() {
            return "iterable_type";
        }
        get extra_json() {
            return {
                type_name: __classPrivateFieldGet(this, _IterableType_type, "f"),
            };
        }
    };
    _IterableType_type = new WeakMap();
    __setFunctionName(_classThis, "IterableType");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        IterableType = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return IterableType = _classThis;
})();
exports.IterableType = IterableType;
let FunctionType = (() => {
    var _FunctionType_parameters, _FunctionType_returns;
    let _classDecorators = [base_1.AstItem];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Type;
    var FunctionType = _classThis = class extends _classSuper {
        constructor(ctx, parameters, returns) {
            super(ctx);
            _FunctionType_parameters.set(this, void 0);
            _FunctionType_returns.set(this, void 0);
            __classPrivateFieldSet(this, _FunctionType_parameters, parameters, "f");
            __classPrivateFieldSet(this, _FunctionType_returns, returns.Index, "f");
        }
        get Returns() {
            return base_1.ComponentStore.Get(__classPrivateFieldGet(this, _FunctionType_returns, "f"));
        }
        get type_name() {
            return "function_type";
        }
        get extra_json() {
            return {
                parameters: __classPrivateFieldGet(this, _FunctionType_parameters, "f").json,
                returns: __classPrivateFieldGet(this, _FunctionType_returns, "f"),
            };
        }
    };
    _FunctionType_parameters = new WeakMap();
    _FunctionType_returns = new WeakMap();
    __setFunctionName(_classThis, "FunctionType");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FunctionType = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FunctionType = _classThis;
})();
exports.FunctionType = FunctionType;
let UseType = (() => {
    var _UseType_name, _UseType_constraints;
    let _classDecorators = [base_1.AstItem];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Type;
    var UseType = _classThis = class extends _classSuper {
        constructor(ctx, name, constraints) {
            super(ctx);
            _UseType_name.set(this, void 0);
            _UseType_constraints.set(this, void 0);
            __classPrivateFieldSet(this, _UseType_name, name, "f");
            __classPrivateFieldSet(this, _UseType_constraints, constraints, "f");
        }
        get Name() {
            return __classPrivateFieldGet(this, _UseType_name, "f");
        }
        get Constraints() {
            return __classPrivateFieldGet(this, _UseType_constraints, "f");
        }
        get type_name() {
            return "use_type";
        }
        get extra_json() {
            return {
                name: __classPrivateFieldGet(this, _UseType_name, "f"),
                constraints: __classPrivateFieldGet(this, _UseType_constraints, "f").json,
            };
        }
    };
    _UseType_name = new WeakMap();
    _UseType_constraints = new WeakMap();
    __setFunctionName(_classThis, "UseType");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UseType = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UseType = _classThis;
})();
exports.UseType = UseType;
//# sourceMappingURL=type.js.map