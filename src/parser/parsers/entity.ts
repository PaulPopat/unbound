import {
  ComponentGroup,
  Entity,
  ExternalFunctionEntity,
  FunctionParameter,
  Property,
  SchemaEntity,
  StructEntity,
  Type,
  UsingEntity,
} from "@ast";
import { Token } from "../token";
import { BuildWhile, ExpectNext, NextBlock } from "../utils";
import { ExtractFunctionParameter, ExtractProperty, ExtractType } from "./type";
import { ParserError } from "../error";

function ExtractExternalFunction(tokens: Iterator<Token>) {
  const name = NextBlock(tokens).Text;
  ExpectNext(tokens, "(");
  const parameters = BuildWhile(tokens, ",", ")", () =>
    ExtractFunctionParameter(tokens)
  );
  ExpectNext(tokens, ":");
  const returns = ExtractType(tokens);
  ExpectNext(tokens, ";");

  return { name, parameters, returns };
}

function ExtractLib(tokens: Iterator<Token>) {
  const path = NextBlock(tokens);
  if (!path.Text.startsWith('"') || !path.Text.endsWith('"'))
    throw new ParserError(
      path,
      `lib blocks must have a file path presented as a static string.`
    );
}

function ExtractSchemaOrStruct(tokens: Iterator<Token>) {
  let exported = false;
  let name = NextBlock(tokens).Text;
  if (name === "export") {
    exported = true;
    name = NextBlock(tokens).Text;
  }

  ExpectNext(tokens, "{");
  const properties = BuildWhile(tokens, ";", "}", () =>
    ExtractProperty(tokens)
  );

  return { name, properties, exported };
}

function ExtractUsing(tokens: Iterator<Token>) {
  return BuildWhile(tokens, ".", ";", () => NextBlock(tokens).Text).join(".");
}

export function ExtractEntity(tokens: Iterator<Token>): Entity {
  const current = NextBlock(tokens);
  const ctx = {
    line: current.LineNumber,
    column: current.ColumnNumber,
  };

  switch (current.Text) {
    case "schema": {
      const { name, properties, exported } = ExtractSchemaOrStruct(tokens);
      return new SchemaEntity(
        {
          ...ctx,
          exported,
        },
        name,
        new ComponentGroup(...properties)
      );
    }
    case "struct": {
      const { name, properties, exported } = ExtractSchemaOrStruct(tokens);
      return new StructEntity(
        {
          ...ctx,
          exported,
        },
        name,
        new ComponentGroup(...properties)
      );
    }
    case "using": {
      return new UsingEntity({ ...ctx, exported: false }, ExtractUsing(tokens));
    }
    default:
      throw ParserError.UnexpectedSymbol(
        current,
        "schema",
        "struct",
        "fn",
        "using",
        "lib",
        "system"
      );
  }
}
