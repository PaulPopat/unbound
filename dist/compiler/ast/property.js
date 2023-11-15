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
exports.FunctionParameter = exports.Property = void 0;
const base_1 = require("./base");
let Property = (() => {
    var _Property_name, _Property_type;
    let _classDecorators = [base_1.AstItem];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = base_1.Component;
    var Property = _classThis = class extends _classSuper {
        constructor(ctx, name, type) {
            super(ctx);
            _Property_name.set(this, void 0);
            _Property_type.set(this, void 0);
            __classPrivateFieldSet(this, _Property_name, name, "f");
            __classPrivateFieldSet(this, _Property_type, type.Index, "f");
        }
        get Name() {
            return __classPrivateFieldGet(this, _Property_name, "f");
        }
        get Type() {
            return base_1.ComponentStore.Get(__classPrivateFieldGet(this, _Property_type, "f"));
        }
        get type_name() {
            return "property";
        }
        get extra_json() {
            return {
                name: __classPrivateFieldGet(this, _Property_name, "f"),
                type_name: __classPrivateFieldGet(this, _Property_type, "f"),
            };
        }
    };
    _Property_name = new WeakMap();
    _Property_type = new WeakMap();
    __setFunctionName(_classThis, "Property");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Property = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Property = _classThis;
})();
exports.Property = Property;
let FunctionParameter = (() => {
    var _FunctionParameter_name, _FunctionParameter_type;
    let _classDecorators = [base_1.AstItem];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = base_1.Component;
    var FunctionParameter = _classThis = class extends _classSuper {
        constructor(ctx, name, type) {
            super(ctx);
            _FunctionParameter_name.set(this, void 0);
            _FunctionParameter_type.set(this, void 0);
            __classPrivateFieldSet(this, _FunctionParameter_name, name, "f");
            __classPrivateFieldSet(this, _FunctionParameter_type, type?.Index, "f");
        }
        get Name() {
            return __classPrivateFieldGet(this, _FunctionParameter_name, "f");
        }
        get Type() {
            return __classPrivateFieldGet(this, _FunctionParameter_type, "f") != null ? base_1.ComponentStore.Get(__classPrivateFieldGet(this, _FunctionParameter_type, "f")) : undefined;
        }
        get type_name() {
            return "function_parameter";
        }
        get extra_json() {
            return {
                name: __classPrivateFieldGet(this, _FunctionParameter_name, "f"),
                type_name: __classPrivateFieldGet(this, _FunctionParameter_type, "f") ?? null,
            };
        }
    };
    _FunctionParameter_name = new WeakMap();
    _FunctionParameter_type = new WeakMap();
    __setFunctionName(_classThis, "FunctionParameter");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FunctionParameter = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FunctionParameter = _classThis;
})();
exports.FunctionParameter = FunctionParameter;
//# sourceMappingURL=property.js.map