import {
  AssignStatement,
  PanicStatement,
  ReturnStatement,
  Statement,
  StoreStatement,
} from "@ast";
import { ParserError } from "../error";
import { Token } from "../token";
import { ExpectNext, NextBlock } from "../utils";
import { ExtractExpression } from "./expression";

function ExtractStore(tokens: Iterator<Token>) {
  const name = NextBlock(tokens).Text;
  ExpectNext(tokens, "=");

  return { name, equals: ExtractExpression(tokens) };
}

function ExtractAssign(tokens: Iterator<Token>) {
  const name = NextBlock(tokens).Text;
  ExpectNext(tokens, "=");

  return { name, equals: ExtractExpression(tokens) };
}

function ExtractReturn(tokens: Iterator<Token>) {
  return ExtractExpression(tokens);
}

function ExtractPanic(tokens: Iterator<Token>) {
  return ExtractExpression(tokens);
}

export function ExtractStatement(tokens: Iterator<Token>): Statement {
  const current = NextBlock(tokens);

  switch (current.Text) {
    case "store": {
      const { name, equals } = ExtractStore(tokens);
      return new StoreStatement(current.Location, name, equals);
    }
    case "return": {
      return new ReturnStatement(current.Location, ExtractReturn(tokens));
    }
    case "assign": {
      const { name, equals } = ExtractAssign(tokens);
      return new AssignStatement(current.Location, name, equals);
    }
    case "panic": {
      return new PanicStatement(current.Location, ExtractPanic(tokens));
    }
    default:
      throw ParserError.UnexpectedSymbol(
        current,
        "store",
        "return",
        "assign",
        "panic"
      );
  }
}
