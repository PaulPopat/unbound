import { ComponentGroup, Entity, Namespace } from "@ast";
import { SplitTokens } from "./tokeniser";
import { TokenGroup } from "./token";
import { ParserError } from "./error";
import { BuildWhile, BuildWhilePeek, ExpectNext, NextBlock } from "./utils";
import { ExtractEntity } from "./parsers/entity";

function ExtractNamespace(tokens: TokenGroup, exported = false): Namespace {
  const start = NextBlock(tokens);
  if (start.Text === "export") return ExtractNamespace(tokens, true);
  if (start.Text !== "namespace")
    throw ParserError.UnexpectedSymbol(start, "export", "namespace");

  const name = BuildWhile(tokens, ".", " {", () => NextBlock(tokens).Text).join(
    "."
  );

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
  let next = group.next();
  while (!next.done) {
    if (next.value.Text !== "namespace")
      throw ParserError.UnexpectedSymbol(next.value, "namespace");

    result.push(ExtractNamespace(group));
  }

  return new ComponentGroup(...result);
}
