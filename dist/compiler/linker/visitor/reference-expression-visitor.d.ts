import { Component, ExternalFunctionDeclaration, FunctionEntity } from "#compiler/ast";
import { ReferenceNameIndexingVisitor } from "./reference-name-indexing-visitor";
export declare class ReferenceExpressionVisitor extends ReferenceNameIndexingVisitor {
    constructor(functions: Record<string, FunctionEntity | ExternalFunctionDeclaration>);
    get OperatesOn(): (new (...args: any[]) => Component)[];
    Visit(target: Component): {
        result: Component | undefined;
        cleanup: () => void;
    };
}
//# sourceMappingURL=reference-expression-visitor.d.ts.map