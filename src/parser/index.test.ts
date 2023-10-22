import {
  ComponentGroup,
  FunctionEntity,
  FunctionParameter,
  Namespace,
  Property,
  ReferenceType,
  SchemaEntity,
  StructEntity,
  UsingEntity,
} from "@ast";
import { ParseUnbound } from ".";
import { ParserError } from "./error";

const blocks: Record<
  string,
  Array<[string, ComponentGroup<Namespace>, string]>
> = {
  namespaces: [
    [``, new ComponentGroup(), "Parses an empty file"],
    [
      `namespace Test {}`,
      new ComponentGroup(
        new Namespace(
          { line: 0, column: 0, exported: false },
          "Test",
          new ComponentGroup()
        )
      ),
      "Parses an empty namespace",
    ],
    [
      `export namespace Test {}`,
      new ComponentGroup(
        new Namespace(
          { line: 0, column: 0, exported: false },
          "Test",
          new ComponentGroup()
        )
      ),
      "Parses an exported namespace",
    ],
  ],
  entities: [
    [
      `namespace Test {
        using Other
      }`,
      new ComponentGroup(
        new Namespace(
          { line: 0, column: 0, exported: false },
          "Test",
          new ComponentGroup(
            new UsingEntity({ line: 1, column: 2, exported: false }, "Other")
          )
        )
      ),
      "Parses a using entity",
    ],
    [
      `namespace Test {
        struct Test {}
      }`,
      new ComponentGroup(
        new Namespace(
          { line: 0, column: 0, exported: false },
          "Test",
          new ComponentGroup(
            new StructEntity(
              { line: 1, column: 2, exported: false },
              "Test",
              new ComponentGroup()
            )
          )
        )
      ),
      "Parses a struct entity",
    ],
    [
      `namespace Test {
        export struct Test {}
      }`,
      new ComponentGroup(
        new Namespace(
          { line: 0, column: 0, exported: false },
          "Test",
          new ComponentGroup(
            new StructEntity(
              { line: 1, column: 2, exported: true },
              "Test",
              new ComponentGroup()
            )
          )
        )
      ),
      "Parses a public struct entity",
    ],
    [
      `namespace Test {
        struct Test {
          test: char;
        }
      }`,
      new ComponentGroup(
        new Namespace(
          { line: 0, column: 0, exported: false },
          "Test",
          new ComponentGroup(
            new StructEntity(
              { line: 1, column: 2, exported: false },
              "Test",
              new ComponentGroup(
                new Property(
                  { line: 2, column: 4 },
                  "test",
                  new ReferenceType({ line: 2, column: 10 }, "char")
                )
              )
            )
          )
        )
      ),
      "Parses a struct entity with a property",
    ],
    [
      `namespace Test {
        struct Test {
          test: char;
          other: bool;
        }
      }`,
      new ComponentGroup(
        new Namespace(
          { line: 0, column: 0, exported: false },
          "Test",
          new ComponentGroup(
            new StructEntity(
              { line: 1, column: 2, exported: false },
              "Test",
              new ComponentGroup(
                new Property(
                  { line: 2, column: 4 },
                  "test",
                  new ReferenceType({ line: 2, column: 10 }, "char")
                ),
                new Property(
                  { line: 2, column: 4 },
                  "other",
                  new ReferenceType({ line: 2, column: 11 }, "bool")
                )
              )
            )
          )
        )
      ),
      "Parses a struct entity with multiple properties",
    ],
    [
      `namespace Test {
        schema Test {}
      }`,
      new ComponentGroup(
        new Namespace(
          { line: 0, column: 0, exported: false },
          "Test",
          new ComponentGroup(
            new SchemaEntity(
              { line: 1, column: 2, exported: false },
              "Test",
              new ComponentGroup()
            )
          )
        )
      ),
      "Parses a schema entity",
    ],
    [
      `namespace Test {
        export schema Test {}
      }`,
      new ComponentGroup(
        new Namespace(
          { line: 0, column: 0, exported: false },
          "Test",
          new ComponentGroup(
            new SchemaEntity(
              { line: 1, column: 2, exported: true },
              "Test",
              new ComponentGroup()
            )
          )
        )
      ),
      "Parses an exported schema entity",
    ],
    [
      `namespace Test {
        schema Test {
          test: char;
        }
      }`,
      new ComponentGroup(
        new Namespace(
          { line: 0, column: 0, exported: false },
          "Test",
          new ComponentGroup(
            new SchemaEntity(
              { line: 1, column: 2, exported: false },
              "Test",
              new ComponentGroup(
                new Property(
                  { line: 2, column: 4 },
                  "test",
                  new ReferenceType({ line: 2, column: 10 }, "char")
                )
              )
            )
          )
        )
      ),
      "Parses a schema entity with a property",
    ],
    [
      `namespace Test {
        schema Test {
          test: char;
          other: bool;
        }
      }`,
      new ComponentGroup(
        new Namespace(
          { line: 0, column: 0, exported: false },
          "Test",
          new ComponentGroup(
            new SchemaEntity(
              { line: 1, column: 2, exported: false },
              "Test",
              new ComponentGroup(
                new Property(
                  { line: 2, column: 4 },
                  "test",
                  new ReferenceType({ line: 2, column: 10 }, "char")
                ),
                new Property(
                  { line: 2, column: 4 },
                  "other",
                  new ReferenceType({ line: 2, column: 11 }, "bool")
                )
              )
            )
          )
        )
      ),
      "Parses a schema entity with multiple properties",
    ],
    [
      `namespace Test {
        fn Test (): int {}
      }`,
      new ComponentGroup(
        new Namespace(
          { line: 0, column: 0, exported: false },
          "Test",
          new ComponentGroup(
            new FunctionEntity(
              { line: 1, column: 2, exported: false },
              "Test",
              new ComponentGroup(),
              new ReferenceType({ line: 1, column: 14 }, "int"),
              new ComponentGroup()
            )
          )
        )
      ),
      "Parses a function entity",
    ],
    [
      `namespace Test {
        export fn Test (): int {}
      }`,
      new ComponentGroup(
        new Namespace(
          { line: 0, column: 0, exported: false },
          "Test",
          new ComponentGroup(
            new FunctionEntity(
              { line: 1, column: 2, exported: true },
              "Test",
              new ComponentGroup(),
              new ReferenceType({ line: 1, column: 14 }, "int"),
              new ComponentGroup()
            )
          )
        )
      ),
      "Parses an exported function entity",
    ],
    [
      `namespace Test {
        fn Test (test: bool): int {}
      }`,
      new ComponentGroup(
        new Namespace(
          { line: 0, column: 0, exported: false },
          "Test",
          new ComponentGroup(
            new FunctionEntity(
              { line: 1, column: 2, exported: false },
              "Test",
              new ComponentGroup(
                new FunctionParameter(
                  { line: 1, column: 11 },
                  "test",
                  new ReferenceType({ line: 1, column: 17 }, "bool")
                )
              ),
              new ReferenceType({ line: 1, column: 24 }, "int"),
              new ComponentGroup()
            )
          )
        )
      ),
      "Parses a function entity with a parameter",
    ],
    [
      `namespace Test {
        fn Test (test: bool, other: char): int {}
      }`,
      new ComponentGroup(
        new Namespace(
          { line: 0, column: 0, exported: false },
          "Test",
          new ComponentGroup(
            new FunctionEntity(
              { line: 1, column: 2, exported: false },
              "Test",
              new ComponentGroup(
                new FunctionParameter(
                  { line: 1, column: 11 },
                  "test",
                  new ReferenceType({ line: 1, column: 17 }, "bool")
                ),
                new FunctionParameter(
                  { line: 1, column: 23 },
                  "other",
                  new ReferenceType({ line: 1, column: 30 }, "char")
                )
              ),
              new ReferenceType({ line: 1, column: 37 }, "int"),
              new ComponentGroup()
            )
          )
        )
      ),
      "Parses a function entity with multiple parameters",
    ],
    [
      `namespace Test {
        fn Test () {}
      }`,
      new ComponentGroup(
        new Namespace(
          { line: 0, column: 0, exported: false },
          "Test",
          new ComponentGroup(
            new FunctionEntity(
              { line: 1, column: 2, exported: false },
              "Test",
              new ComponentGroup(),
              undefined,
              new ComponentGroup()
            )
          )
        )
      ),
      "Parses a function entity with no return type",
    ],
  ],
};

for (const key in blocks) {
  const tests = blocks[key];

  describe.skip(key, () => {
    for (const [input, expected, name] of tests)
      it(name, () => {
        expect(ParseUnbound(input.replaceAll("      ", ""))).toEqual(expected);
      });
  });
}

const unhappy_blocks: Record<string, Array<[string, ParserError, string]>> = {
  namespace: [
    [
      `namespace Test`,
      new ParserError(0, 0, "All namespaces require a block"),
      "has no block",
    ],
    [
      `namespace Test Name {}`,
      new ParserError(0, 0, "Expected '{' but received 'Name'"),
      "spaces in the name",
    ],
    [
      `namespace fn {}`,
      new ParserError(0, 0, "Invalid namespace name 'fn'"),
      "keyword as the name",
    ],
  ],
  entity: [
    [
      `namespace Test {
        fn Test: int {}
      }`,
      new ParserError(1, 2, "Expected '(' but received ':'"),
      "no parameters section",
    ],
  ],
};

for (const key in unhappy_blocks) {
  const tests = unhappy_blocks[key];

  describe.skip(key + " errors", () => {
    for (const [input, expected, name] of tests)
      it(name, () => {
        expect(() => ParseUnbound(input.replaceAll("      ", ""))).toThrow(
          expected
        );
      });
  });
}
