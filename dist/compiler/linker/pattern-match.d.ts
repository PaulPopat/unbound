import { Component } from "#compiler/ast";
export declare function PatternMatch<TOptions extends Array<new (...args: Array<any>) => Component>>(...options: TOptions): <TResult>(...handlers: { [TKey in keyof TOptions]: (input: InstanceType<TOptions[TKey]>) => TResult; }) => (input: Component) => TResult;
//# sourceMappingURL=pattern-match.d.ts.map