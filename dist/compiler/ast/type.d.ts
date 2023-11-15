import { Location } from "#compiler/location";
import { Component, ComponentGroup } from "./base";
import { StructEntity } from ".";
export declare abstract class Type extends Component {
}
export declare class SchemaType extends Type {
    #private;
    constructor(ctx: Location, name: string, properties: ComponentGroup);
    get type_name(): string;
    get extra_json(): {
        name: string;
        properties: number[];
    };
}
export declare class ReferenceType extends Type {
    #private;
    constructor(ctx: Location, name: string, references?: Type);
    get Name(): string;
    get References(): Component | undefined;
    get type_name(): string;
    get extra_json(): {
        name: string;
        references: number | undefined;
    };
}
export declare const PrimitiveNames: readonly ["int", "char", "double", "float", "bool", "long", "any"];
export type PrimitiveName = (typeof PrimitiveNames)[number];
export declare function IsPrimitiveName(input: string): input is PrimitiveName;
export declare class PrimitiveType extends Type {
    #private;
    constructor(ctx: Location, name: PrimitiveName);
    get type_name(): string;
    get extra_json(): {
        name: "int" | "char" | "float" | "double" | "long" | "bool" | "any";
    };
}
export declare class IterableType extends Type {
    #private;
    constructor(ctx: Location, type: Type);
    get Type(): Component;
    get type_name(): string;
    get extra_json(): {
        type_name: number;
    };
}
export declare class FunctionType extends Type {
    #private;
    constructor(ctx: Location, parameters: ComponentGroup, returns: Type | StructEntity);
    get Returns(): Component;
    get type_name(): string;
    get extra_json(): {
        parameters: number[];
        returns: number;
    };
}
export declare class UseType extends Type {
    #private;
    constructor(ctx: Location, name: string, constraints: ComponentGroup);
    get Name(): string;
    get Constraints(): ComponentGroup;
    get type_name(): string;
    get extra_json(): {
        name: string;
        constraints: number[];
    };
}
//# sourceMappingURL=type.d.ts.map