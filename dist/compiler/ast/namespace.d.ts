import { Location } from "#compiler/location";
import { Component, ComponentGroup } from "./base";
export declare class Namespace extends Component {
    #private;
    constructor(ctx: Location, exported: boolean, name: string, contents: ComponentGroup);
    get Name(): string;
    get Exported(): boolean;
    get Contents(): ComponentGroup;
    get type_name(): string;
    get extra_json(): {
        name: string;
        exported: boolean;
        contents: number[];
    };
}
//# sourceMappingURL=namespace.d.ts.map