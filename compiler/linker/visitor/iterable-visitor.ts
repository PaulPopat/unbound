import {
  Component,
  ComponentGroup,
  FunctionParameter,
  FunctionType,
  IterableType,
  Namespace,
  PrimitiveType,
  Property,
  SchemaEntity,
  SchemaType,
  UseType,
  Visitor,
} from "#compiler/ast";
import { Namer, Location } from "#compiler/location";
import { LinkerError } from "../error";

const EmptyLocation = new Location("generated", -1, -1, -1, -1);

export class IterableVisitor extends Visitor {
  #data: Array<SchemaEntity> = [];

  get Namespace() {
    return new Namespace(
      EmptyLocation,
      false,
      "__Compiled__Code__",
      new ComponentGroup(...this.#data)
    );
  }
  get OperatesOn() {
    return [IterableType];
  }

  Visit(target: Component): {
    result: Component | undefined;
    cleanup: () => void;
  } {
    if (target instanceof IterableType) {
      const context_schema = new SchemaType(
        target.Location,
        new ComponentGroup(
          new Property(
            target.Location,
            "ctx",
            new UseType(
              target.Location,
              Namer.GetName(),
              new ComponentGroup(new PrimitiveType(target.Location, "any"))
            )
          ),
          new Property(target.Location, "result", target.Type),
          new Property(
            target.Location,
            "continue",
            new PrimitiveType(target.Location, "bool")
          )
        )
      );

      return {
        result: new SchemaType(
          target.Location,
          new ComponentGroup(
            new Property(
              target.Location,
              "next",
              new FunctionType(
                target.Location,
                new ComponentGroup(
                  new FunctionParameter(target.Location, "ctx", context_schema)
                ),
                context_schema
              )
            ),
            new Property(
              target.Location,
              "init",
              new FunctionType(
                target.Location,
                new ComponentGroup(),
                context_schema
              )
            )
          )
        ),
        cleanup: () => {},
      };
    }

    throw new LinkerError(target.Location, "No matching handler");
  }
}
