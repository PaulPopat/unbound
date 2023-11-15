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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
var _Entity_exported;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SystemEntity = exports.LibEntity = exports.ExternalFunctionDeclaration = exports.UsingEntity = exports.SchemaEntity = exports.StructEntity = exports.FunctionEntity = exports.Entity = void 0;
const base_1 = require("./base");
const property_1 = require("./property");
const node_async_hooks_1 = require("node:async_hooks");
class Entity extends base_1.Component {
    constructor(ctx, exported) {
        super(ctx);
        _Entity_exported.set(this, void 0);
        __classPrivateFieldSet(this, _Entity_exported, exported, "f");
    }
    get Exported() {
        return __classPrivateFieldGet(this, _Entity_exported, "f");
    }
    get extra_json() {
        return {
            ...this.more_json,
            exported: __classPrivateFieldGet(this, _Entity_exported, "f"),
        };
    }
}
exports.Entity = Entity;
_Entity_exported = new WeakMap();
let FunctionEntity = (() => {
    var _FunctionEntity_name, _FunctionEntity_parameters, _FunctionEntity_returns, _FunctionEntity_content;
    let _classDecorators = [base_1.AstItem];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Entity;
    var FunctionEntity = _classThis = class extends _classSuper {
        constructor(ctx, exported, name, parameters, returns, content) {
            super(ctx, exported);
            _FunctionEntity_name.set(this, void 0);
            _FunctionEntity_parameters.set(this, void 0);
            _FunctionEntity_returns.set(this, void 0);
            _FunctionEntity_content.set(this, void 0);
            __classPrivateFieldSet(this, _FunctionEntity_name, name, "f");
            __classPrivateFieldSet(this, _FunctionEntity_parameters, parameters, "f");
            __classPrivateFieldSet(this, _FunctionEntity_returns, returns?.Index, "f");
            __classPrivateFieldSet(this, _FunctionEntity_content, content, "f");
        }
        get Name() {
            return __classPrivateFieldGet(this, _FunctionEntity_name, "f");
        }
        get Parameters() {
            return __classPrivateFieldGet(this, _FunctionEntity_parameters, "f");
        }
        get Returns() {
            return __classPrivateFieldGet(this, _FunctionEntity_returns, "f") ? base_1.ComponentStore.Get(__classPrivateFieldGet(this, _FunctionEntity_returns, "f")) : undefined;
        }
        get Content() {
            return __classPrivateFieldGet(this, _FunctionEntity_content, "f");
        }
        get type_name() {
            return "function_entity";
        }
        get more_json() {
            return {
                name: __classPrivateFieldGet(this, _FunctionEntity_name, "f"),
                parameters: __classPrivateFieldGet(this, _FunctionEntity_parameters, "f").json,
                returns: __classPrivateFieldGet(this, _FunctionEntity_returns, "f"),
                content: __classPrivateFieldGet(this, _FunctionEntity_content, "f").json,
            };
        }
    };
    _FunctionEntity_name = new WeakMap();
    _FunctionEntity_parameters = new WeakMap();
    _FunctionEntity_returns = new WeakMap();
    _FunctionEntity_content = new WeakMap();
    __setFunctionName(_classThis, "FunctionEntity");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        FunctionEntity = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return FunctionEntity = _classThis;
})();
exports.FunctionEntity = FunctionEntity;
let StructEntity = (() => {
    var _StructEntity_name, _StructEntity_properties;
    let _classDecorators = [base_1.AstItem];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Entity;
    var StructEntity = _classThis = class extends _classSuper {
        constructor(ctx, exported, name, properties) {
            super(ctx, exported);
            _StructEntity_name.set(this, void 0);
            _StructEntity_properties.set(this, void 0);
            __classPrivateFieldSet(this, _StructEntity_name, name, "f");
            __classPrivateFieldSet(this, _StructEntity_properties, properties, "f");
        }
        get Name() {
            return __classPrivateFieldGet(this, _StructEntity_name, "f");
        }
        get Properties() {
            return __classPrivateFieldGet(this, _StructEntity_properties, "f");
        }
        HasKey(key) {
            for (const property of __classPrivateFieldGet(this, _StructEntity_properties, "f").iterator())
                if (property instanceof property_1.Property)
                    if (property.Name === key)
                        return true;
            return false;
        }
        GetKey(key) {
            for (const property of __classPrivateFieldGet(this, _StructEntity_properties, "f").iterator())
                if (property instanceof property_1.Property)
                    if (property.Name === key)
                        return property;
            return undefined;
        }
        get type_name() {
            return "struct_entity";
        }
        get more_json() {
            return {
                name: __classPrivateFieldGet(this, _StructEntity_name, "f"),
                properties: __classPrivateFieldGet(this, _StructEntity_properties, "f").json,
            };
        }
    };
    _StructEntity_name = new WeakMap();
    _StructEntity_properties = new WeakMap();
    __setFunctionName(_classThis, "StructEntity");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        StructEntity = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return StructEntity = _classThis;
})();
exports.StructEntity = StructEntity;
let SchemaEntity = (() => {
    var _SchemaEntity_name, _SchemaEntity_properties;
    let _classDecorators = [base_1.AstItem];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Entity;
    var SchemaEntity = _classThis = class extends _classSuper {
        constructor(ctx, exported, name, properties) {
            super(ctx, exported);
            _SchemaEntity_name.set(this, void 0);
            _SchemaEntity_properties.set(this, void 0);
            __classPrivateFieldSet(this, _SchemaEntity_name, name, "f");
            __classPrivateFieldSet(this, _SchemaEntity_properties, properties, "f");
        }
        get Name() {
            return __classPrivateFieldGet(this, _SchemaEntity_name, "f");
        }
        get type_name() {
            return "schema_entity";
        }
        get more_json() {
            return {
                name: __classPrivateFieldGet(this, _SchemaEntity_name, "f"),
                properties: __classPrivateFieldGet(this, _SchemaEntity_properties, "f").json,
            };
        }
    };
    _SchemaEntity_name = new WeakMap();
    _SchemaEntity_properties = new WeakMap();
    __setFunctionName(_classThis, "SchemaEntity");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SchemaEntity = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SchemaEntity = _classThis;
})();
exports.SchemaEntity = SchemaEntity;
let UsingEntity = (() => {
    var _UsingEntity_name;
    let _classDecorators = [base_1.AstItem];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Entity;
    var UsingEntity = _classThis = class extends _classSuper {
        constructor(ctx, exported, name) {
            super(ctx, exported);
            _UsingEntity_name.set(this, void 0);
            __classPrivateFieldSet(this, _UsingEntity_name, name, "f");
        }
        get Name() {
            return __classPrivateFieldGet(this, _UsingEntity_name, "f");
        }
        get type_name() {
            return "using_entity";
        }
        get more_json() {
            return {
                name: __classPrivateFieldGet(this, _UsingEntity_name, "f"),
            };
        }
    };
    _UsingEntity_name = new WeakMap();
    __setFunctionName(_classThis, "UsingEntity");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        UsingEntity = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return UsingEntity = _classThis;
})();
exports.UsingEntity = UsingEntity;
function NameFromPath(path) {
    return path.replace(/\//gm, "_").replace(/\\/gm, "_").replace(/./gm, "__");
}
const external_function_context = new node_async_hooks_1.AsyncLocalStorage();
let ExternalFunctionDeclaration = (() => {
    var _ExternalFunctionDeclaration_name, _ExternalFunctionDeclaration_parameters, _ExternalFunctionDeclaration_returns;
    let _classDecorators = [base_1.AstItem];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = base_1.Component;
    var ExternalFunctionDeclaration = _classThis = class extends _classSuper {
        constructor(ctx, name, parameters, returns) {
            super(ctx);
            _ExternalFunctionDeclaration_name.set(this, void 0);
            _ExternalFunctionDeclaration_parameters.set(this, void 0);
            _ExternalFunctionDeclaration_returns.set(this, void 0);
            __classPrivateFieldSet(this, _ExternalFunctionDeclaration_name, name, "f");
            __classPrivateFieldSet(this, _ExternalFunctionDeclaration_parameters, parameters, "f");
            __classPrivateFieldSet(this, _ExternalFunctionDeclaration_returns, returns.Index, "f");
        }
        get Name() {
            return __classPrivateFieldGet(this, _ExternalFunctionDeclaration_name, "f");
        }
        get Returns() {
            return base_1.ComponentStore.Get(__classPrivateFieldGet(this, _ExternalFunctionDeclaration_returns, "f"));
        }
        get type_name() {
            return "external_function_declaration";
        }
        get extra_json() {
            return {
                name: __classPrivateFieldGet(this, _ExternalFunctionDeclaration_name, "f"),
                parameters: __classPrivateFieldGet(this, _ExternalFunctionDeclaration_parameters, "f").json,
                returns: __classPrivateFieldGet(this, _ExternalFunctionDeclaration_returns, "f"),
            };
        }
    };
    _ExternalFunctionDeclaration_name = new WeakMap();
    _ExternalFunctionDeclaration_parameters = new WeakMap();
    _ExternalFunctionDeclaration_returns = new WeakMap();
    __setFunctionName(_classThis, "ExternalFunctionDeclaration");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ExternalFunctionDeclaration = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ExternalFunctionDeclaration = _classThis;
})();
exports.ExternalFunctionDeclaration = ExternalFunctionDeclaration;
let LibEntity = (() => {
    var _LibEntity_name, _LibEntity_content;
    let _classDecorators = [base_1.AstItem];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Entity;
    var LibEntity = _classThis = class extends _classSuper {
        constructor(ctx, exported, name, content) {
            super(ctx, exported);
            _LibEntity_name.set(this, void 0);
            _LibEntity_content.set(this, void 0);
            __classPrivateFieldSet(this, _LibEntity_name, name.Index, "f");
            __classPrivateFieldSet(this, _LibEntity_content, content, "f");
        }
        get Name() {
            return base_1.ComponentStore.Get(__classPrivateFieldGet(this, _LibEntity_name, "f"));
        }
        get type_name() {
            return "lib_entity";
        }
        get more_json() {
            return {
                name: __classPrivateFieldGet(this, _LibEntity_name, "f"),
                content: __classPrivateFieldGet(this, _LibEntity_content, "f").json,
            };
        }
    };
    _LibEntity_name = new WeakMap();
    _LibEntity_content = new WeakMap();
    __setFunctionName(_classThis, "LibEntity");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        LibEntity = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return LibEntity = _classThis;
})();
exports.LibEntity = LibEntity;
let SystemEntity = (() => {
    var _SystemEntity_content;
    let _classDecorators = [base_1.AstItem];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = Entity;
    var SystemEntity = _classThis = class extends _classSuper {
        constructor(ctx, exported, content) {
            super(ctx, exported);
            _SystemEntity_content.set(this, void 0);
            __classPrivateFieldSet(this, _SystemEntity_content, content, "f");
        }
        get type_name() {
            return "system_entity";
        }
        get more_json() {
            return {
                content: __classPrivateFieldGet(this, _SystemEntity_content, "f").json,
            };
        }
    };
    _SystemEntity_content = new WeakMap();
    __setFunctionName(_classThis, "SystemEntity");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        SystemEntity = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return SystemEntity = _classThis;
})();
exports.SystemEntity = SystemEntity;
//# sourceMappingURL=entity.js.map