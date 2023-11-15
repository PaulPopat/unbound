import { Component, SchemaEntity, StructEntity, Visitor } from "#compiler/ast";
export declare class TypeNameIndexingVisitor extends Visitor {
    #private;
    constructor();
    get Types(): Record<string, StructEntity | SchemaEntity>;
    get OperatesOn(): (new (...args: any[]) => Component)[];
    Visit(target: Component): {
        result: undefined;
        cleanup: () => void;
    };
}
//# sourceMappingURL=type-name-indexing-visitor.d.ts.map