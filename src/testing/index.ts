import { expect } from "@jest/globals";

const ignored = ["constructor"];

declare module "expect" {
  interface AsymmetricMatchers {
    toProperEquals(expected: any): void;
  }
  interface Matchers<R> {
    toProperEquals(expected: any): R;
  }
}

expect.addEqualityTesters([
  function (a, b, customs) {
    function is_class(obj: any) {
      if (typeof obj !== "object") return false;

      const prototype = Object.getPrototypeOf(obj);

      return (
        prototype.constructor &&
        prototype.constructor.toString &&
        prototype.constructor.toString().substring(0, 5) === "class"
      );
    }

    if (!is_class(a) || !is_class(b)) {
      return undefined;
    }

    if (a.prototype !== b.prototype) return false;

    for (let o = b; o && o != Object.prototype; o = Object.getPrototypeOf(o)) {
      for (let name of Object.getOwnPropertyNames(o)) {
        if (!ignored.includes(name)) {
          if (!this.equals(a[name], b[name], customs)) {
            console.error(
              "Class type mismatch: " +
                JSON.stringify(
                  { key: name, a_value: a[name], b_value: b[name] },
                  undefined,
                  2
                )
            );
            return false;
          }
        }
      }
    }
  },
]);

expect.extend({
  toProperEquals(actual, expected) {
    let result = true;
    try {
      expect(actual).toStrictEqual(expected);
    } catch {
      result = false;
    }

    return {
      message() {
        return `Expected: ${actual.toString()}\nTo Equal: ${expected.toString()}`;
      },
      pass: result,
    };
  },
});

export * from "@jest/globals";
