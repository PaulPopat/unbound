import {
  ComponentGroup,
  FunctionParameter,
  FunctionType,
  IterableType,
  Property,
  ReferenceType,
  SchemaType,
  Type,
  UseType,
} from "@ast";
import { Token } from "../token";
import { BuildWhile, ExpectNext, NextBlock } from "../utils";

export function ExtractFunctionParameter(
  tokens: Iterator<Token>
): FunctionParameter<Type> {
  const name = NextBlock(tokens);
  ExpectNext(tokens, ":");
  const type = ExtractType(tokens);

  return new FunctionParameter(name.Location, name.Text, type);
}

export function ExtractProperty(tokens: Iterator<Token>): Property<Type> {
  const name = NextBlock(tokens);
  ExpectNext(tokens, ":");
  const type = ExtractType(tokens);

  return new Property(name.Location, name.Text, type);
}

function ExtractFunction(tokens: Iterator<Token>) {
  const parameters = BuildWhile(tokens, ",", ")", () =>
    ExtractFunctionParameter(tokens)
  );

  ExpectNext(tokens, "-");
  ExpectNext(tokens, ">");

  return {
    parameters,
    returns: ExtractType(tokens),
  };
}

function ExtractSchema(tokens: Iterator<Token>) {
  const name = NextBlock(tokens).Text;
  ExpectNext(tokens, "{");
  const properties = BuildWhile(tokens, ";", "}", () =>
    ExtractProperty(tokens)
  );

  return { name, properties };
}

function ExtractIterable(tokens: Iterator<Token>) {
  const result = ExtractType(tokens);
  ExpectNext(tokens, "]");

  return result;
}

function ExtractUse(tokens: Iterator<Token>) {
  const constraints = BuildWhile(tokens, "|", "=", () => ExtractType(tokens));

  return {
    name: NextBlock(tokens).Text,
    constraints,
  };
}

export function ExtractType(tokens: Iterator<Token>): Type {
  const current = NextBlock(tokens);

  switch (current.Text) {
    case "use": {
      const { name, constraints } = ExtractUse(tokens);
      return new UseType(
        current.Location,
        name,
        new ComponentGroup(...constraints)
      );
    }
    case "[": {
      return new IterableType(current.Location, ExtractIterable(tokens));
    }
    case "(": {
      const { parameters, returns } = ExtractFunction(tokens);
      return new FunctionType(
        current.Location,
        new ComponentGroup(...parameters),
        returns
      );
    }
    case "schema": {
      const { properties, name } = ExtractSchema(tokens);
      return new SchemaType(
        current.Location,
        name,
        new ComponentGroup(...properties)
      );
    }
    default:
      return new ReferenceType(current.Location, current.Text);
  }
}
