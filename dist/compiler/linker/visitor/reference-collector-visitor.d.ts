import { Component, CountExpression, ExternalFunctionDeclaration, FunctionEntity, FunctionParameter, IterateExpression, StoreStatement, Visitor } from "#compiler/ast";
export declare class ReferenceCollectorVisitor extends Visitor {
    #private;
    constructor(functions: Record<string, FunctionEntity | ExternalFunctionDeclaration>);
    protected find(name: string): CountExpression | IterateExpression | StoreStatement | FunctionParameter | FunctionEntity | ExternalFunctionDeclaration | undefined;
    get OperatesOn(): (new (...args: any[]) => Component)[];
    Visit(target: Component): {
        result: Component | undefined;
        cleanup: () => void;
    };
}
//# sourceMappingURL=reference-collector-visitor.d.ts.map