import { TokenGroup } from "./token";
export declare function NextBlock(tokens: TokenGroup): import("./token").Token;
export declare function ExpectNext(tokens: TokenGroup, ...expected: Array<string>): import("./token").Token;
export declare function BuildWhilePeek<T>(tokens: TokenGroup, to_next: (value: string) => boolean, handler: () => T): T[];
export declare function BuildWhile<T>(tokens: TokenGroup, expect_start: string | undefined, to_next: string, end: string, handler: () => T): T[];
export declare function BuildWhileOnStart<T>(tokens: TokenGroup, to_next: string, end: string, handler: () => T): T[];
export declare function IfIs<T>(tokens: TokenGroup, expected: string, handler: () => T): T | undefined;
//# sourceMappingURL=utils.d.ts.map