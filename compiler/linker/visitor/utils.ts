import {
  ComponentGroup,
  ComponentStore,
  FunctionParameter,
  FunctionType,
  PrimitiveType,
  Property,
  ReferenceType,
  SchemaEntity,
  StructEntity,
  Type,
} from "#compiler/ast";
import { Namer } from "#compiler/location";

export function IteratorStruct(returns: Type) {
  const name = Namer.GetName();

  const struct_reference = new ReferenceType(returns.Location, name);

  const main_function_type = new FunctionType(
    returns.Location,
    new ComponentGroup(new FunctionParameter(returns.Location, "ctx", returns)),
    struct_reference
  );

  const init_function_type = new FunctionType(
    returns.Location,
    new ComponentGroup(),
    struct_reference
  );

  const main = new StructEntity(
    returns.Location,
    false,
    Namer.GetName(),
    new ComponentGroup(
      new Property(returns.Location, "next", main_function_type),
      new Property(
        returns.Location,
        "done",
        new PrimitiveType(returns.Location, "bool")
      ),
      new Property(returns.Location, "result", returns)
    )
  );

  const after_init = new StructEntity(
    returns.Location,
    false,
    Namer.GetName(),
    new ComponentGroup(
      new Property(returns.Location, "next", init_function_type),
      new Property(
        returns.Location,
        "done",
        new PrimitiveType(returns.Location, "bool")
      )
    )
  );

  ComponentStore.Replace(
    struct_reference,
    new ReferenceType(returns.Location, name, main)
  );

  return { main, after_init, main_function_type, init_function_type };
}

export function IteratorSchema(returns: Type) {
  const name = Namer.GetName();

  const struct_reference = new ReferenceType(returns.Location, name);

  const main_function_type = new FunctionType(
    returns.Location,
    new ComponentGroup(new FunctionParameter(returns.Location, "ctx", returns)),
    struct_reference
  );

  const init_function_type = new FunctionType(
    returns.Location,
    new ComponentGroup(),
    struct_reference
  );

  const main = new SchemaEntity(
    returns.Location,
    false,
    Namer.GetName(),
    new ComponentGroup(
      new Property(returns.Location, "next", main_function_type),
      new Property(
        returns.Location,
        "done",
        new PrimitiveType(returns.Location, "bool")
      ),
      new Property(returns.Location, "result", returns)
    )
  );

  const after_init = new SchemaEntity(
    returns.Location,
    false,
    Namer.GetName(),
    new ComponentGroup(
      new Property(returns.Location, "next", init_function_type),
      new Property(
        returns.Location,
        "done",
        new PrimitiveType(returns.Location, "bool")
      )
    )
  );

  ComponentStore.Replace(
    struct_reference,
    new ReferenceType(returns.Location, name, main)
  );

  return { main, after_init };
}
