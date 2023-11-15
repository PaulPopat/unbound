import { Component, SchemaEntity, StructEntity } from "#compiler/ast";
import { TypeCollectorVisitor } from "./type-collector-visitor";
export declare class StoreTypeVisitor extends TypeCollectorVisitor {
    #private;
    constructor(types: Record<string, StructEntity | SchemaEntity>);
    get OperatesOn(): (new (...args: any[]) => Component)[];
    Visit(target: Component): {
        result: Component | undefined;
        cleanup: () => void;
    };
}
//# sourceMappingURL=store-type-visitor.d.ts.map