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
var _Component_location, _a, _b, _c, _ComponentStore_data, _ComponentStore_index, _ComponentStore_Get, _ComponentGroup_components, _Ast_data;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ast = exports.ComponentGroup = exports.ComponentStore = exports.Component = exports.AstItem = exports.Visitor = void 0;
const location_1 = require("#compiler/location");
const node_async_hooks_1 = require("node:async_hooks");
const visiting_context = new node_async_hooks_1.AsyncLocalStorage();
class Visitor {
}
exports.Visitor = Visitor;
const _index = Symbol();
const _children = Symbol();
function AstItem(target, _) {
    const result = function (...args) {
        const instance = new target(...args);
        const index = ComponentStore.Register(instance);
        instance[_index] = index;
        instance[_children] = args.filter((a) => a instanceof Component || a instanceof ComponentGroup).flatMap((c) => c instanceof Component ? [c.Index] : [...c.iterator()].map((c) => c.Index));
        return instance;
    };
    result.prototype = target.prototype;
    return result;
}
exports.AstItem = AstItem;
class Component {
    constructor(location) {
        _Component_location.set(this, void 0);
        this[_a] = -1;
        this[_b] = [];
        __classPrivateFieldSet(this, _Component_location, location, "f");
    }
    get Location() {
        return __classPrivateFieldGet(this, _Component_location, "f");
    }
    get Index() {
        return this[_index];
    }
    get json() {
        return {
            ...this.extra_json,
            type: this.type_name,
            location: __classPrivateFieldGet(this, _Component_location, "f").json,
        };
    }
}
exports.Component = Component;
_Component_location = new WeakMap(), _a = _index, _b = _children;
class ComponentStore {
    static Register(component) {
        var _d;
        const i = __classPrivateFieldGet(this, _c, "f", _ComponentStore_index);
        __classPrivateFieldSet(this, _c, { ...__classPrivateFieldGet(this, _c, "f", _ComponentStore_data), [__classPrivateFieldGet(this, _c, "f", _ComponentStore_index)]: component }, "f", _ComponentStore_data);
        __classPrivateFieldSet(this, _c, (_d = __classPrivateFieldGet(this, _c, "f", _ComponentStore_index), _d++, _d), "f", _ComponentStore_index);
        return i;
    }
    static Get(index) {
        return __classPrivateFieldGet(this, _c, "m", _ComponentStore_Get).call(this, index);
    }
    static Visit(item, visitor) {
        return visiting_context.run(visiting_context.getStore() ?? [], () => {
            if (visiting_context.getStore()?.includes(item.Index))
                return item;
            visiting_context.getStore()?.push(item.Index);
            const instance = __classPrivateFieldGet(this, _c, "m", _ComponentStore_Get).call(this, item.Index);
            if (visitor.OperatesOn.find((o) => instance instanceof o)) {
                const { result, cleanup } = visitor.Visit(instance);
                if (result) {
                    cleanup();
                    __classPrivateFieldGet(this, _c, "f", _ComponentStore_data)[item.Index] = result;
                    delete __classPrivateFieldGet(this, _c, "f", _ComponentStore_data)[result.Index];
                    result[_index] = item[_index];
                }
                for (const child of instance[_children]) {
                    this.Visit(__classPrivateFieldGet(this, _c, "m", _ComponentStore_Get).call(this, child), visitor);
                }
                cleanup();
            }
            else {
                for (const child of instance[_children]) {
                    this.Visit(__classPrivateFieldGet(this, _c, "m", _ComponentStore_Get).call(this, child), visitor);
                }
            }
            return __classPrivateFieldGet(this, _c, "m", _ComponentStore_Get).call(this, item.Index);
        });
    }
    static get Json() {
        const result = {};
        for (const key in __classPrivateFieldGet(this, _c, "f", _ComponentStore_data))
            result[key.toString()] = __classPrivateFieldGet(this, _c, "f", _ComponentStore_data)[key].json;
        return result;
    }
    static Clear() {
        __classPrivateFieldSet(this, _c, {}, "f", _ComponentStore_data);
        __classPrivateFieldSet(this, _c, 0, "f", _ComponentStore_index);
    }
}
exports.ComponentStore = ComponentStore;
_c = ComponentStore, _ComponentStore_Get = function _ComponentStore_Get(index) {
    const result = __classPrivateFieldGet(this, _c, "f", _ComponentStore_data)[index];
    if (!result)
        throw new Error("Could not find component");
    return result;
};
_ComponentStore_data = { value: [] };
_ComponentStore_index = { value: 0 };
class ComponentGroup {
    constructor(...components) {
        _ComponentGroup_components.set(this, void 0);
        __classPrivateFieldSet(this, _ComponentGroup_components, components.map((c) => c.Index), "f");
    }
    get Length() {
        return __classPrivateFieldGet(this, _ComponentGroup_components, "f").length;
    }
    get First() {
        return ComponentStore.Get(__classPrivateFieldGet(this, _ComponentGroup_components, "f")[0]);
    }
    get Last() {
        return ComponentStore.Get(__classPrivateFieldGet(this, _ComponentGroup_components, "f")[__classPrivateFieldGet(this, _ComponentGroup_components, "f").length - 1]);
    }
    get Location() {
        return new location_1.Location(this.First.Location.FileName, this.First.Location.StartLine, this.First.Location.StartColumn, this.Last.Location.EndLine, this.Last.Location.EndColumn);
    }
    get json() {
        return __classPrivateFieldGet(this, _ComponentGroup_components, "f");
    }
    *iterator() {
        for (const component of __classPrivateFieldGet(this, _ComponentGroup_components, "f"))
            yield ComponentStore.Get(component);
    }
}
exports.ComponentGroup = ComponentGroup;
_ComponentGroup_components = new WeakMap();
class Ast {
    constructor(...data) {
        _Ast_data.set(this, void 0);
        __classPrivateFieldSet(this, _Ast_data, data.flatMap((d) => [...d.iterator()]), "f");
    }
    *iterator() {
        for (const item of __classPrivateFieldGet(this, _Ast_data, "f"))
            yield item;
    }
    get json() {
        return __classPrivateFieldGet(this, _Ast_data, "f").flatMap((d) => d.json);
    }
    visited(visitor) {
        const result = [];
        for (const item of __classPrivateFieldGet(this, _Ast_data, "f"))
            result.push(ComponentStore.Visit(item, visitor));
        return new Ast(...result.map((c) => new ComponentGroup(c)));
    }
}
exports.Ast = Ast;
_Ast_data = new WeakMap();
//# sourceMappingURL=base.js.map