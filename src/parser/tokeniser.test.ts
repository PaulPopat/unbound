import { expect, describe, it } from "@test";
import { SplitTokens, Token } from "./tokeniser";
import { ParserError } from "./error";

describe("SplitTokens", () => {
  it("splits into basic tokens", () => {
    expect([...SplitTokens("this is a test")]).toProperEquals([
      new Token(0, 0, "this"),
      new Token(0, 5, "is"),
      new Token(0, 8, "a"),
      new Token(0, 10, "test"),
    ]);
  });

  it("preserves single quote strings", () => {
    expect([...SplitTokens("this 'is a' test")]).toProperEquals([
      new Token(0, 0, "this"),
      new Token(0, 5, "'is a'"),
      new Token(0, 12, "test"),
    ]);
  });

  it("preserves other single quote strings", () => {
    expect([...SplitTokens("this'is a' test")]).toProperEquals([
      new Token(0, 0, "this"),
      new Token(0, 4, "'is a'"),
      new Token(0, 11, "test"),
    ]);
  });

  it("preserves single quote strings with doube quotes", () => {
    expect([...SplitTokens("this 'is \"a' test")]).toProperEquals([
      new Token(0, 0, "this"),
      new Token(0, 5, "'is \"a'"),
      new Token(0, 13, "test"),
    ]);
  });

  it("throws on a new line from a double quote string", () => {
    expect(() => [...SplitTokens("this 'is\na' test")]).toThrow(
      new ParserError(0, 8, "Error: Unexpected new line")
    );
  });

  it("preserves double quote strings", () => {
    expect([...SplitTokens('this "is a" test')]).toProperEquals([
      new Token(0, 0, "this"),
      new Token(0, 5, '"is a"'),
      new Token(0, 12, "test"),
    ]);
  });

  it("throws on a new line from a double quote string", () => {
    expect(() => [...SplitTokens('th s "is\na" test')]).toThrow(
      new ParserError(0, 8, "Error: Unexpected new line")
    );
  });

  it("preserves back tick quote strings", () => {
    expect([...SplitTokens("this `is a` test")]).toProperEquals([
      new Token(0, 0, "this"),
      new Token(0, 5, "`is a`"),
      new Token(0, 12, "test"),
    ]);
  });

  it("preserves back tick quote strings with new lines", () => {
    expect([...SplitTokens("this `is\na` test")]).toProperEquals([
      new Token(0, 0, "this"),
      new Token(0, 5, "`is\na`"),
      new Token(1, 3, "test"),
    ]);
  })
});
