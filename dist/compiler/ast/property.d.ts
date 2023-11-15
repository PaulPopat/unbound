import { Location } from "#compiler/location";
import { Component } from "./base";
import { Type } from "./type";
export declare class Property extends Component {
    #private;
    constructor(ctx: Location, name: string, type: Type);
    get Name(): string;
    get Type(): Component;
    get type_name(): string;
    get extra_json(): {
        name: string;
        type_name: number;
    };
}
export declare class FunctionParameter extends Component {
    #private;
    constructor(ctx: Location, name: string, type: Type | undefined);
    get Name(): string;
    get Type(): Component | undefined;
    get type_name(): string;
    get extra_json(): {
        name: string;
        type_name: number | null;
    };
}
//# sourceMappingURL=property.d.ts.map