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
exports.PanicStatement = exports.AssignStatement = exports.ReturnStatement = exports.StoreStatement = exports.Statement = void 0;
const base_1 = require("./base");
class Statement extends base_1.Component {
}
exports.Statement = Statement;
let StoreStatement = (() => {
    var _StoreStatement_name, _StoreStatement_equals, _StoreStatement_type;
    let _classDecorators = [base_1.AstItem];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Statement;
    var StoreStatement = _classThis = class extends _classSuper {
        constructor(ctx, name, equals, type) {
            super(ctx);
            _StoreStatement_name.set(this, void 0);
            _StoreStatement_equals.set(this, void 0);
            _StoreStatement_type.set(this, void 0);
            __classPrivateFieldSet(this, _StoreStatement_name, name, "f");
            __classPrivateFieldSet(this, _StoreStatement_equals, equals.Index, "f");
            __classPrivateFieldSet(this, _StoreStatement_type, type?.Index, "f");
        }
        get Name() {
            return __classPrivateFieldGet(this, _StoreStatement_name, "f");
        }
        get Equals() {
            return base_1.ComponentStore.Get(__classPrivateFieldGet(this, _StoreStatement_equals, "f"));
        }
        get Type() {
            return __classPrivateFieldGet(this, _StoreStatement_type, "f") ? base_1.ComponentStore.Get(__classPrivateFieldGet(this, _StoreStatement_type, "f")) : undefined;
        }
        get type_name() {
            return "store_statement";
        }
        get extra_json() {
            return {
                name: __classPrivateFieldGet(this, _StoreStatement_name, "f"),
                equals: __classPrivateFieldGet(this, _StoreStatement_equals, "f"),
                store_type: __classPrivateFieldGet(this, _StoreStatement_type, "f"),
            };
        }
    };
    _StoreStatement_name = new WeakMap();
    _StoreStatement_equals = new WeakMap();
    _StoreStatement_type = new WeakMap();
    __setFunctionName(_classThis, "StoreStatement");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        StoreStatement = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return StoreStatement = _classThis;
})();
exports.StoreStatement = StoreStatement;
let ReturnStatement = (() => {
    var _ReturnStatement_value;
    let _classDecorators = [base_1.AstItem];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Statement;
    var ReturnStatement = _classThis = class extends _classSuper {
        constructor(ctx, value) {
            super(ctx);
            _ReturnStatement_value.set(this, void 0);
            __classPrivateFieldSet(this, _ReturnStatement_value, value.Index, "f");
        }
        get Value() {
            return base_1.ComponentStore.Get(__classPrivateFieldGet(this, _ReturnStatement_value, "f"));
        }
        get type_name() {
            return "return_statement";
        }
        get extra_json() {
            return {
                value: __classPrivateFieldGet(this, _ReturnStatement_value, "f"),
            };
        }
    };
    _ReturnStatement_value = new WeakMap();
    __setFunctionName(_classThis, "ReturnStatement");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ReturnStatement = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ReturnStatement = _classThis;
})();
exports.ReturnStatement = ReturnStatement;
let AssignStatement = (() => {
    var _AssignStatement_name, _AssignStatement_equals;
    let _classDecorators = [base_1.AstItem];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Statement;
    var AssignStatement = _classThis = class extends _classSuper {
        constructor(ctx, name, equals) {
            super(ctx);
            _AssignStatement_name.set(this, void 0);
            _AssignStatement_equals.set(this, void 0);
            __classPrivateFieldSet(this, _AssignStatement_name, name, "f");
            __classPrivateFieldSet(this, _AssignStatement_equals, equals.Index, "f");
        }
        get Name() {
            return __classPrivateFieldGet(this, _AssignStatement_name, "f");
        }
        get Equals() {
            return base_1.ComponentStore.Get(__classPrivateFieldGet(this, _AssignStatement_equals, "f"));
        }
        get type_name() {
            return "assign_statement";
        }
        get extra_json() {
            return {
                name: __classPrivateFieldGet(this, _AssignStatement_name, "f"),
                equals: __classPrivateFieldGet(this, _AssignStatement_equals, "f"),
            };
        }
    };
    _AssignStatement_name = new WeakMap();
    _AssignStatement_equals = new WeakMap();
    __setFunctionName(_classThis, "AssignStatement");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        AssignStatement = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return AssignStatement = _classThis;
})();
exports.AssignStatement = AssignStatement;
let PanicStatement = (() => {
    var _PanicStatement_value;
    let _classDecorators = [base_1.AstItem];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Statement;
    var PanicStatement = _classThis = class extends _classSuper {
        constructor(ctx, value) {
            super(ctx);
            _PanicStatement_value.set(this, void 0);
            __classPrivateFieldSet(this, _PanicStatement_value, value.Index, "f");
        }
        get Value() {
            return base_1.ComponentStore.Get(__classPrivateFieldGet(this, _PanicStatement_value, "f"));
        }
        get type_name() {
            return "panic_statement";
        }
        get extra_json() {
            return {
                value: __classPrivateFieldGet(this, _PanicStatement_value, "f"),
            };
        }
    };
    _PanicStatement_value = new WeakMap();
    __setFunctionName(_classThis, "PanicStatement");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        PanicStatement = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return PanicStatement = _classThis;
})();
exports.PanicStatement = PanicStatement;
//# sourceMappingURL=statement.js.map