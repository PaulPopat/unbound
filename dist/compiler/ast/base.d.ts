import { Location } from "#compiler/location";
export declare abstract class Visitor {
    abstract get OperatesOn(): Array<new (...args: any[]) => Component>;
    abstract Visit(target: Component): {
        result: Component | undefined;
        cleanup: () => void;
    };
}
declare const _index: unique symbol;
declare const _children: unique symbol;
export declare function AstItem(target: new (...args: any[]) => Component, _: ClassDecoratorContext): any;
export declare abstract class Component {
    #private;
    [_index]: number;
    [_children]: Array<number>;
    constructor(location: Location);
    get Location(): Location;
    get Index(): number;
    abstract get type_name(): string;
    abstract get extra_json(): Record<never, never>;
    get json(): unknown;
}
export declare class ComponentStore {
    #private;
    static Register(component: Component): number;
    static Get(index: number): Component;
    static Visit(item: Component, visitor: Visitor): Component;
    static get Json(): Record<string, unknown>;
    static Clear(): void;
}
export declare class ComponentGroup {
    #private;
    constructor(...components: Array<Component>);
    get Length(): number;
    get First(): Component;
    get Last(): Component;
    get Location(): Location;
    get json(): number[];
    iterator(): Generator<Component, void, unknown>;
}
export declare class Ast {
    #private;
    constructor(...data: Array<ComponentGroup>);
    iterator(): Generator<Component, void, unknown>;
    get json(): unknown[];
    visited(visitor: Visitor): Ast;
}
export {};
//# sourceMappingURL=base.d.ts.map