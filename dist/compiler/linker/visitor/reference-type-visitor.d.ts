import { Component, SchemaEntity, StructEntity } from "#compiler/ast";
import { TypeCollectorVisitor } from "./type-collector-visitor";
export declare class ReferenceTypeVisitor extends TypeCollectorVisitor {
    constructor(types: Record<string, StructEntity | SchemaEntity>);
    get OperatesOn(): (new (...args: any[]) => Component)[];
    Visit(target: Component): {
        result: Component | undefined;
        cleanup: () => void;
    };
}
//# sourceMappingURL=reference-type-visitor.d.ts.map