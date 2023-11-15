import { Component, ExternalFunctionDeclaration, FunctionEntity, Visitor } from "#compiler/ast";
export declare class FunctionCollectingVisitor extends Visitor {
    #private;
    constructor();
    get Functions(): Record<string, FunctionEntity | ExternalFunctionDeclaration>;
    get OperatesOn(): (new (...args: any[]) => Component)[];
    Visit(target: Component): {
        result: undefined;
        cleanup: () => void;
    };
}
//# sourceMappingURL=function-collecting-visitor.d.ts.map