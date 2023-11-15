import { Location } from "#compiler/location";
import { Token } from "./token";
export declare class ParserError extends Error {
    #private;
    constructor(location: Location | undefined, message: string);
    static get EndOfFile(): ParserError;
    static UnexpectedSymbol(received: Token, ...expected: Array<string>): ParserError;
}
//# sourceMappingURL=error.d.ts.map