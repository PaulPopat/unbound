import { Component, CountExpression, ExternalFunctionDeclaration, FunctionEntity, FunctionParameter, IterateExpression, StoreStatement, Visitor } from "#compiler/ast";
type Local = StoreStatement | CountExpression | IterateExpression | FunctionParameter;
export declare class ReferenceNameIndexingVisitor extends Visitor {
    #private;
    constructor(functions: Record<string, FunctionEntity | ExternalFunctionDeclaration>);
    protected find(name: string): FunctionEntity | ExternalFunctionDeclaration | Local | undefined;
    get OperatesOn(): (new (...args: any[]) => Component)[];
    Visit(target: Component): {
        result: Component | undefined;
        cleanup: () => void;
    };
}
export {};
//# sourceMappingURL=reference-name-indexing-visitor.d.ts.map