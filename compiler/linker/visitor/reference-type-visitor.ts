import {
  Component,
  FunctionEntity,
  IsPrimitiveName,
  Namespace,
  PrimitiveType,
  ReferenceType,
  SchemaEntity,
  StructEntity,
  UseType,
  UsingEntity,
  Visitor,
} from "@compiler/ast";
import { LinkerError } from "../error";

export class ReferenceTypeVisitor extends Visitor {
  readonly #types: Record<string, StructEntity | SchemaEntity>;
  #namespace: string = "";
  #using: Array<string> = [];
  #uses: Record<string, UseType> = {};

  constructor(types: Record<string, StructEntity | SchemaEntity>) {
    super();
    this.#types = types;
  }

  #find(name: string) {
    if (this.#uses[name]) return this.#uses[name];

    for (const area of this.#using) {
      const full = `${area}.${name}`;
      const possible = this.#types[full];
      if (!possible) continue;

      if (area === this.#namespace) return possible;

      if (possible.Exported) return possible;
    }

    return undefined;
  }
  get OperatesOn(): (new (...args: any[]) => Component)[] {
    return [Namespace, UsingEntity, FunctionEntity, UseType, ReferenceType];
  }

  Visit(target: Component) {
    if (target instanceof Namespace) {
      this.#namespace = target.Name;
      this.#using = [target.Name];
      return {
        result: undefined,
        cleanup: () => {
          this.#using = [];
          this.#uses = {};
          this.#namespace = "";
        },
      };
    } else if (target instanceof UsingEntity) {
      this.#using = [...this.#using, target.Name];
      return {
        result: undefined,
        cleanup: () => {},
      };
    } else if (target instanceof FunctionEntity) {
      this.#uses = {};
      return {
        result: undefined,
        cleanup: () => {
          this.#uses = {};
        },
      };
    } else if (target instanceof UseType) {
      this.#uses[target.Name] = target;
      return {
        result: undefined,
        cleanup: () => {},
      };
    } else if (target instanceof ReferenceType) {
      const possible = this.#find(target.Name);

      if (possible)
        return {
          result: new ReferenceType(target.Location, target.Name, possible),
          cleanup: () => {},
        };

      if (IsPrimitiveName(target.Name))
        return {
          result: new PrimitiveType(target.Location, target.Name),
          cleanup: () => {},
        };
    }

    throw new LinkerError(
      target.Location,
      "Component is not a recognised type"
    );
  }
}
