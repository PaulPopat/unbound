import {
  ComponentGroup,
  Entity,
  ExternalFunctionEntity,
  FunctionEntity,
  LibEntity,
  SchemaEntity,
  StructEntity,
  SystemEntity,
  UsingEntity,
} from "@ast";
import { Token } from "../token";
import { BuildWhile, ExpectNext, IfIs, NextBlock } from "../utils";
import { ExtractFunctionParameter, ExtractProperty, ExtractType } from "./type";
import { ParserError } from "../error";
import { ExtractStatement } from "./statement";
import { ExtractExpression } from "./expression";

function ExtractExternalFunction(tokens: Iterator<Token>) {
  const start = ExpectNext(tokens, "fn");
  const name = NextBlock(tokens).Text;
  ExpectNext(tokens, "(");
  const parameters = BuildWhile(tokens, ",", ")", () =>
    ExtractFunctionParameter(tokens)
  );
  ExpectNext(tokens, ":");
  const returns = ExtractType(tokens);
  ExpectNext(tokens, ";");

  return new ExternalFunctionEntity(
    start.Location,
    name,
    new ComponentGroup(...parameters),
    returns
  );
}

function ExtractFunction(tokens: Iterator<Token>) {
  const name = NextBlock(tokens).Text;
  ExpectNext(tokens, "(");
  const parameters = BuildWhile(tokens, ",", ")", () =>
    ExtractFunctionParameter(tokens)
  );
  ExpectNext(tokens, ":");
  const returns = IfIs(tokens, ":", () => ExtractType(tokens));
  ExpectNext(tokens, "{");
  const body = BuildWhile(tokens, ";", "}", () => ExtractStatement(tokens));

  return { name, parameters, returns, body };
}

function ExtractLib(tokens: Iterator<Token>) {
  const path = ExtractExpression(tokens);

  ExpectNext(tokens, "{");
  const declarations = BuildWhile(tokens, ";", "}", () =>
    ExtractExternalFunction(tokens)
  );

  return { path: path, declarations };
}

function ExtractSystem(tokens: Iterator<Token>) {
  ExpectNext(tokens, "{");
  const declarations = BuildWhile(tokens, ";", "}", () =>
    ExtractExternalFunction(tokens)
  );

  return { declarations };
}

function ExtractSchemaOrStruct(tokens: Iterator<Token>) {
  const name = NextBlock(tokens).Text;

  ExpectNext(tokens, "{");
  const properties = BuildWhile(tokens, ";", "}", () =>
    ExtractProperty(tokens)
  );

  return { name, properties };
}

function ExtractUsing(tokens: Iterator<Token>) {
  return BuildWhile(tokens, ".", ";", () => NextBlock(tokens).Text).join(".");
}

export function ExtractEntity(
  tokens: Iterator<Token>,
  exported?: boolean
): Entity {
  const current = NextBlock(tokens);

  switch (current.Text) {
    case "schema": {
      const { name, properties } = ExtractSchemaOrStruct(tokens);
      return new SchemaEntity(
        current.Location,
        exported ?? false,
        name,
        new ComponentGroup(...properties)
      );
    }
    case "struct": {
      const { name, properties } = ExtractSchemaOrStruct(tokens);
      return new StructEntity(
        current.Location,
        exported ?? false,
        name,
        new ComponentGroup(...properties)
      );
    }
    case "using": {
      return new UsingEntity(current.Location, false, ExtractUsing(tokens));
    }
    case "export": {
      return ExtractEntity(tokens, true);
    }
    case "lib": {
      const { path, declarations } = ExtractLib(tokens);
      return new LibEntity(
        current.Location,
        exported ?? false,
        path,
        new ComponentGroup(...declarations)
      );
    }
    case "system": {
      const { declarations } = ExtractSystem(tokens);
      return new SystemEntity(
        current.Location,
        exported ?? false,
        new ComponentGroup(...declarations)
      );
    }
    case "fn": {
      const { name, parameters, returns, body } = ExtractFunction(tokens);
      return new FunctionEntity(
        current.Location,
        exported ?? false,
        name,
        new ComponentGroup(...parameters),
        returns,
        new ComponentGroup(...body)
      );
    }
    default:
      throw ParserError.UnexpectedSymbol(
        current,
        "schema",
        "struct",
        "fn",
        "using",
        "lib",
        "system",
        "export"
      );
  }
}
