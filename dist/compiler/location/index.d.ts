export declare class Location {
    #private;
    constructor(file_name: string, start_line: number, start_column: number, end_line: number, end_column: number);
    get FileName(): string;
    get StartLine(): number;
    get StartColumn(): number;
    get EndLine(): number;
    get EndColumn(): number;
    get json(): {
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
    toString(): string;
}
export declare class Namer {
    #private;
    static GetName(): string;
}
//# sourceMappingURL=index.d.ts.map