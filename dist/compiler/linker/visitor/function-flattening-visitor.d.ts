import { Component } from "#compiler/ast";
import { ReferenceNameIndexingVisitor } from "./reference-name-indexing-visitor";
export declare class FunctionFlatteningVisitor extends ReferenceNameIndexingVisitor {
    get OperatesOn(): (new (...args: any[]) => Component)[];
    Visit(target: Component): {
        result: Component | undefined;
        cleanup: () => void;
    };
}
//# sourceMappingURL=function-flattening-visitor.d.ts.map