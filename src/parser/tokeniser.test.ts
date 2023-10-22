import { expect, describe, it } from "@test";
import { SplitTokens } from "./tokeniser";
import { ParserError } from "./error";
import { Token } from "./token";
import { Location } from "@location";

describe("SplitTokens", () => {
  it("splits into basic tokens", () => {
    expect([...SplitTokens("this is a test")].map((t) => t.json)).toStrictEqual(
      [
        new Token(new Location(0, 0, 0, 4), "this"),
        new Token(new Location(0, 5, 0, 7), "is"),
        new Token(new Location(0, 8, 0, 9), "a"),
        new Token(new Location(0, 10, 0, 14), "test"),
      ].map((t) => t.json)
    );
  });

  it("preserves single quote strings", () => {
    expect(
      [...SplitTokens("this 'is a' test")].map((t) => t.json)
    ).toStrictEqual(
      [
        new Token(new Location(0, 0, 0, 4), "this"),
        new Token(new Location(0, 5, 0, 11), "'is a'"),
        new Token(new Location(0, 12, 0, 16), "test"),
      ].map((t) => t.json)
    );
  });

  it("parses brackets", () => {
    expect(
      [...SplitTokens("this (is a) test")].map((t) => t.json)
    ).toStrictEqual(
      [
        new Token(new Location(0, 0, 0, 4), "this"),
        new Token(new Location(0, 5, 0, 6), "("),
        new Token(new Location(0, 6, 0, 8), "is"),
        new Token(new Location(0, 9, 0, 10), "a"),
        new Token(new Location(0, 10, 0, 11), ")"),
        new Token(new Location(0, 12, 0, 16), "test"),
      ].map((t) => t.json)
    );
  });

  it("preserves other single quote strings", () => {
    expect(
      [...SplitTokens("this'is a' test")].map((t) => t.json)
    ).toStrictEqual(
      [
        new Token(new Location(0, 0, 0, 4), "this"),
        new Token(new Location(0, 4, 0, 10), "'is a'"),
        new Token(new Location(0, 11, 0, 15), "test"),
      ].map((t) => t.json)
    );
  });

  it("preserves single quote strings with double quotes", () => {
    expect(
      [...SplitTokens("this 'is \"a' test")].map((t) => t.json)
    ).toStrictEqual(
      [
        new Token(new Location(0, 0, 0, 4), "this"),
        new Token(new Location(0, 5, 0, 12), "'is \"a'"),
        new Token(new Location(0, 13, 0, 17), "test"),
      ].map((t) => t.json)
    );
  });

  it("throws on a new line from a single quote string", () => {
    expect(() => [...SplitTokens("this 'is\na' test")]).toThrow(
      new ParserError(new Location(0, 5, 0, 5), "Unexpected new line")
    );
  });

  it("preserves double quote strings", () => {
    expect(
      [...SplitTokens('this "is a" test')].map((t) => t.json)
    ).toStrictEqual(
      [
        new Token(new Location(0, 0, 0, 4), "this"),
        new Token(new Location(0, 5, 0, 11), '"is a"'),
        new Token(new Location(0, 12, 0, 16), "test"),
      ].map((t) => t.json)
    );
  });

  it("throws on a new line from a double quote string", () => {
    expect(() => [...SplitTokens('this "is\na" test')]).toThrow(
      new ParserError(new Location(0, 5, 0, 5), "Unexpected new line")
    );
  });

  it("preserves back tick quote strings", () => {
    expect(
      [...SplitTokens("this `is a` test")].map((t) => t.json)
    ).toStrictEqual(
      [
        new Token(new Location(0, 0, 0, 4), "this"),
        new Token(new Location(0, 5, 0, 11), "`is a`"),
        new Token(new Location(0, 12, 0, 16), "test"),
      ].map((t) => t.json)
    );
  });

  it("preserves back tick quote strings with new lines", () => {
    expect(
      [...SplitTokens("this `is\na` test")].map((t) => t.json)
    ).toStrictEqual(
      [
        new Token(new Location(0, 0, 0, 4), "this"),
        new Token(new Location(0, 5, 1, 2), "`is\na`"),
        new Token(new Location(1, 3, 1, 7), "test"),
      ].map((t) => t.json)
    );
  });
});
