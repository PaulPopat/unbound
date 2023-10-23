import {
  BracketsExpression,
  ComponentGroup,
  CountExpression,
  Expression,
  IfExpression,
  InvokationExpression,
  IsExpression,
  IterateExpression,
  LambdaExpression,
  MakeExpression,
  Operator,
  OperatorExpression,
  Operators,
  ReferenceExpression,
} from "@ast";
import { ParserError } from "../error";
import { TokenGroup } from "../token";
import { BuildWhile, BuildWhileOnStart, ExpectNext, NextBlock } from "../utils";
import { ExtractStatement, ExtractStatementBlock } from "./statement";
import { ExtractFunctionParameter, ExtractType } from "./type";

function IsOperator(item: string | undefined): item is Operator {
  return Operators.includes((item ?? "") as Operator);
}

function ExtractIf(tokens: TokenGroup) {
  ExpectNext(tokens, "(");
  const check = ExtractExpression(tokens, [")"]);
  ExpectNext(tokens, ")");
  const if_block =
    tokens.peek()?.Text === "{"
      ? ExtractStatementBlock(tokens)
      : new ComponentGroup(ExtractStatement(tokens));
  ExpectNext(tokens, "else");
  const else_block =
    tokens.peek()?.Text === "{"
      ? ExtractStatementBlock(tokens)
      : new ComponentGroup(ExtractStatement(tokens));

  return { check, if_block, else_block };
}

function ExtractCountOrIterate(tokens: TokenGroup) {
  ExpectNext(tokens, "(");
  const to = ExtractExpression(tokens, [")"]);
  ExpectNext(tokens, "as");
  const as = NextBlock(tokens).Text;
  ExpectNext(tokens, ")");

  const block =
    tokens.peek()?.Text === "{"
      ? ExtractStatementBlock(tokens)
      : new ComponentGroup(ExtractStatement(tokens));

  return { to, as, block };
}

function ExtractMake(tokens: TokenGroup) {
  const name = NextBlock(tokens).Text;

  const block = ExtractStatementBlock(tokens);

  return { name, block };
}

function ExtractLambda(tokens: TokenGroup, look_for: Array<string>) {
  const parameters = BuildWhile(tokens, "(", ",", ")", () =>
    ExtractFunctionParameter(tokens)
  );

  ExpectNext(tokens, "->");

  return { parameters, expression: ExtractExpression(tokens, look_for) };
}

export function ExtractExpression(
  tokens: TokenGroup,
  look_for = [";"]
): Expression {
  let result: Expression | undefined;
  while (look_for.includes(tokens.peek()?.Text ?? "")) {
    const current = NextBlock(tokens);
    const text = current.Text;

    if (text === "(" && !result) {
      const input = ExtractExpression(tokens, [")"]);
      ExpectNext(tokens, ")");
      result = new BracketsExpression(current.Location, input);
    } else if (IsOperator(text)) {
      if (!result)
        throw new ParserError(
          current.Location,
          "Operators must have a left hand side"
        );
      result = new OperatorExpression(
        current.Location,
        result,
        text,
        ExtractExpression(tokens, look_for)
      );
    } else if (text === "if") {
      const { check, if_block, else_block } = ExtractIf(tokens);
      result = new IfExpression(current.Location, check, if_block, else_block);
    } else if (text === "count") {
      const { to, as, block } = ExtractCountOrIterate(tokens);
      result = new CountExpression(current.Location, to, as, block);
    } else if (text === "iterate") {
      const { to, as, block } = ExtractCountOrIterate(tokens);
      result = new IterateExpression(current.Location, to, as, block);
    } else if (text === "make") {
      const { name, block } = ExtractMake(tokens);
      result = new MakeExpression(current.Location, name, block);
    } else if (text === "is") {
      if (!result)
        throw new ParserError(
          current.Location,
          "Is checks must have a left hand side"
        );

      const right = ExtractType(tokens);
      result = new IsExpression(current.Location, result, right);
    } else if (text === "fn") {
      const { parameters, expression } = ExtractLambda(tokens, look_for);
      result = new LambdaExpression(
        current.Location,
        new ComponentGroup(...parameters),
        expression
      );
    } else if (text === "(") {
      if (!result)
        throw new ParserError(
          current.Location,
          "Attempting an invokation without a referenced function"
        );

      const parameters = BuildWhileOnStart(tokens, ",", ")", () =>
        ExtractExpression(tokens, [",", ")"])
      );

      result = new InvokationExpression(
        current.Location,
        result,
        new ComponentGroup(...parameters)
      );
    } else {
      result = new ReferenceExpression(current.Location, current.Text);
    }
  }

  if (!result)
    throw new ParserError(tokens.peek()?.Location, "No Expression found");

  return result;
}
