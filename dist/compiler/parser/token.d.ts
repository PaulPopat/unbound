import { Location } from "#compiler/location";
export declare class Token {
    #private;
    constructor(location: Location, text: string);
    get Location(): Location;
    get Text(): string;
    get json(): {
        location: {
            file_name: string;
            start: {
                line: number;
                column: number;
            };
            last: {
                line: number;
                column: number;
            };
        };
        text: string;
    };
}
export declare class TokenGroup {
    #private;
    constructor(tokens: Iterator<Token>);
    next(): IteratorResult<Token, any>;
    peek(): Token | undefined;
}
//# sourceMappingURL=token.d.ts.map