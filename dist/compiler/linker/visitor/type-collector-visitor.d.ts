import { Component, SchemaEntity, StructEntity, UseType, Visitor } from "#compiler/ast";
export declare class TypeCollectorVisitor extends Visitor {
    #private;
    constructor(types: Record<string, StructEntity | SchemaEntity>);
    protected find(name: string): StructEntity | UseType | SchemaEntity | undefined;
    get OperatesOn(): (new (...args: any[]) => Component)[];
    Visit(target: Component): {
        result: Component | undefined;
        cleanup: () => void;
    };
}
//# sourceMappingURL=type-collector-visitor.d.ts.map