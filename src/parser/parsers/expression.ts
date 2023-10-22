import { Expression, ReferenceExpression, Statement } from "@ast";
import { ParserError } from "../error";
import { Token } from "../token";
import { NextBlock } from "../utils";

export function ExtractExpression(tokens: Iterator<Token>): Expression {
  const current = NextBlock(tokens);

  switch (current.Text) {
    default:
      return new ReferenceExpression(current.Location, current.Text);
  }
}
