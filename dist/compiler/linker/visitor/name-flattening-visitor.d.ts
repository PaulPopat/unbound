import { Component, Visitor } from "#compiler/ast";
export declare class NameFlatteningVisitor extends Visitor {
    constructor();
    get OperatesOn(): (new (...args: any[]) => Component)[];
    Visit(target: Component): {
        result: Component;
        cleanup: () => void;
    };
}
//# sourceMappingURL=name-flattening-visitor.d.ts.map