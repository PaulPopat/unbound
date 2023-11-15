import { Component, ComponentGroup } from "./base";
import { Property } from "./property";
import { Type } from "./type";
import { Location } from "#compiler/location";
import { Expression } from "./expression";
export declare abstract class Entity extends Component {
    #private;
    constructor(ctx: Location, exported: boolean);
    get Exported(): boolean;
    abstract get more_json(): Record<never, never>;
    get extra_json(): {
        exported: boolean;
    };
}
export declare class FunctionEntity extends Entity {
    #private;
    constructor(ctx: Location, exported: boolean, name: string, parameters: ComponentGroup, returns: Type | undefined, content: ComponentGroup);
    get Name(): string;
    get Parameters(): ComponentGroup;
    get Returns(): Component | undefined;
    get Content(): ComponentGroup;
    get type_name(): string;
    get more_json(): {
        name: string;
        parameters: number[];
        returns: number | undefined;
        content: number[];
    };
}
export declare class StructEntity extends Entity {
    #private;
    constructor(ctx: Location, exported: boolean, name: string, properties: ComponentGroup);
    get Name(): string;
    get Properties(): ComponentGroup;
    HasKey(key: string): boolean;
    GetKey(key: string): Property | undefined;
    get type_name(): string;
    get more_json(): {
        name: string;
        properties: number[];
    };
}
export declare class SchemaEntity extends Entity {
    #private;
    constructor(ctx: Location, exported: boolean, name: string, properties: ComponentGroup);
    get Name(): string;
    get type_name(): string;
    get more_json(): {
        name: string;
        properties: number[];
    };
}
export declare class UsingEntity extends Entity {
    #private;
    constructor(ctx: Location, exported: boolean, name: string);
    get Name(): string;
    get type_name(): string;
    get more_json(): {
        name: string;
    };
}
export declare class ExternalFunctionDeclaration extends Component {
    #private;
    constructor(ctx: Location, name: string, parameters: ComponentGroup, returns: Type);
    get Name(): string;
    get Returns(): Component;
    get type_name(): string;
    get extra_json(): {
        name: string;
        parameters: number[];
        returns: number;
    };
}
export declare class LibEntity extends Entity {
    #private;
    constructor(ctx: Location, exported: boolean, name: Expression, content: ComponentGroup);
    get Name(): Component;
    get type_name(): string;
    get more_json(): {
        name: number;
        content: number[];
    };
}
export declare class SystemEntity extends Entity {
    #private;
    constructor(ctx: Location, exported: boolean, content: ComponentGroup);
    get type_name(): string;
    get more_json(): {
        content: number[];
    };
}
//# sourceMappingURL=entity.d.ts.map