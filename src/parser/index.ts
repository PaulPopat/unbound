import { ComponentGroup, Entity, Namespace } from "@ast";
import { SplitTokens } from "./tokeniser";
import { TokenGroup } from "./token";
import { ParserError } from "./error";
import { BuildWhile, BuildWhilePeek, ExpectNext, NextBlock } from "./utils";
import { ExtractEntity } from "./parsers/entity";

function ExtractNamespace(tokens: TokenGroup, exported = false): Namespace {
  const start = tokens.peek();
  if (!start) throw new ParserError(undefined, "No namespace implementation");
  if (start.Text === "export") {
    NextBlock(tokens);
    return ExtractNamespace(tokens, true);
  }

  const name = BuildWhile(
    tokens,
    "namespace",
    ".",
    "{",
    () => NextBlock(tokens).Text
  ).join(".");

  const entities = BuildWhilePeek(
    tokens,
    (v) => v !== "}",
    () => ExtractEntity(tokens)
  );

  ExpectNext(tokens, "}");

  return new Namespace(
    start.Location,
    exported,
    name,
    new ComponentGroup(...entities)
  );
}

export function ParseUnbound(input: string): ComponentGroup<Namespace> {
  const tokens = SplitTokens(input);
  const group = new TokenGroup(tokens);

  const result: Array<Namespace> = [];
  while (group.peek()) {
    result.push(ExtractNamespace(group));
  }

  return new ComponentGroup(...result);
}