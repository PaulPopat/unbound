import { ParserError } from "./error";
import { Token } from "./token";

export function NextBlock(tokens: Iterator<Token>) {
  const first = tokens.next();
  if (first.done) throw ParserError.EndOfFile;

  return first.value;
}

export function ExpectNext(
  tokens: Iterator<Token>,
  ...expected: Array<string>
) {
  const item = NextBlock(tokens);
  if (!expected.includes(item.Text))
    throw ParserError.UnexpectedSymbol(item, ...expected);

  return item;
}

export function BuildWhile<T>(
  tokens: Iterator<Token>,
  to_next: string,
  end: string,
  handler: () => T
) {
  const result = [handler()];
  let next = NextBlock(tokens);
  while (next.Text === to_next) {
    result.push(handler());
    next = NextBlock(tokens);
  }

  if (next.Text !== end) throw ParserError.UnexpectedSymbol(next, end, to_next);
  return result;
}

export function IfIs<T>(
  tokens: Iterator<Token>,
  expected: string,
  handler: () => T
) {
  const next = NextBlock(tokens);
  if (next.Text === expected) return handler();
  return undefined;
}
