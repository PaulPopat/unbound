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
import { Location } from "@location";

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
          new Location(0, 0, 0, 9),
          false,
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
          new Location(0, 7, 0, 16),
          true,
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
        using Other;
      }`,
      new ComponentGroup(
        new Namespace(
          new Location(0, 0, 0, 9),
          false,
          "Test",
          new ComponentGroup(
            new UsingEntity(new Location(1, 2, 1, 7), false, "Other")
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
          new Location(0, 0, 0, 9),
          false,
          "Test",
          new ComponentGroup(
            new StructEntity(
              new Location(1, 2, 1, 8),
              false,
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
          new Location(0, 0, 0, 9),
          false,
          "Test",
          new ComponentGroup(
            new StructEntity(
              new Location(1, 9, 1, 15),
              true,
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
          new Location(0, 0, 0, 9),
          false,
          "Test",
          new ComponentGroup(
            new StructEntity(
              new Location(1, 2, 1, 8),
              false,
              "Test",
              new ComponentGroup(
                new Property(
                  new Location(2, 4, 2, 8),
                  "test",
                  new ReferenceType(new Location(2, 4, 2, 8), "char")
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
          new Location(0, 0, 0, 9),
          false,
          "Test",
          new ComponentGroup(
            new StructEntity(
              new Location(1, 2, 1, 8),
              false,
              "Test",
              new ComponentGroup(
                new Property(
                  new Location(2, 4, 2, 8),
                  "test",
                  new ReferenceType(new Location(2, 4, 2, 8), "char")
                ),
                new Property(
                  new Location(3, 4, 3, 9),
                  "other",
                  new ReferenceType(new Location(2, 4, 2, 9), "bool")
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
          new Location(0, 0, 0, 9),
          false,
          "Test",
          new ComponentGroup(
            new SchemaEntity(
              new Location(1, 2, 1, 8),
              false,
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
          new Location(0, 0, 0, 9),
          false,
          "Test",
          new ComponentGroup(
            new SchemaEntity(
              new Location(1, 9, 1, 15),
              true,
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
          new Location(0, 0, 0, 9),
          false,
          "Test",
          new ComponentGroup(
            new SchemaEntity(
              new Location(1, 2, 1, 8),
              false,
              "Test",
              new ComponentGroup(
                new Property(
                  new Location(2, 4, 2, 8),
                  "test",
                  new ReferenceType(new Location(0, 0, 0, 0), "char")
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
          new Location(0, 0, 0, 9),
          false,
          "Test",
          new ComponentGroup(
            new SchemaEntity(
              new Location(1, 2, 1, 8),
              false,
              "Test",
              new ComponentGroup(
                new Property(
                  new Location(2, 4, 2, 8),
                  "test",
                  new ReferenceType(new Location(0, 0, 0, 0), "char")
                ),
                new Property(
                  new Location(3, 4, 3, 9),
                  "other",
                  new ReferenceType(new Location(0, 0, 0, 0), "bool")
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
          new Location(0, 0, 0, 9),
          false,
          "Test",
          new ComponentGroup(
            new FunctionEntity(
              new Location(1, 2, 1, 4),
              false,
              "Test",
              new ComponentGroup(),
              new ReferenceType(new Location(1, 14, 1, 17), "int"),
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
          new Location(0, 0, 0, 9),
          false,
          "Test",
          new ComponentGroup(
            new FunctionEntity(
              new Location(1, 9, 1, 11),
              true,
              "Test",
              new ComponentGroup(),
              new ReferenceType(new Location(1, 21, 1, 24), "int"),
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
          new Location(0, 0, 0, 9),
          false,
          "Test",
          new ComponentGroup(
            new FunctionEntity(
              new Location(1, 2, 1, 4),
              false,
              "Test",
              new ComponentGroup(
                new FunctionParameter(
                  new Location(1, 11, 1, 15),
                  "test",
                  new ReferenceType(new Location(1, 24, 1, 27), "bool")
                )
              ),
              new ReferenceType(new Location(1, 24, 1, 27), "int"),
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
          new Location(0, 0, 0, 9),
          false,
          "Test",
          new ComponentGroup(
            new FunctionEntity(
              new Location(1, 2, 1, 4),
              false,
              "Test",
              new ComponentGroup(
                new FunctionParameter(
                  new Location(1, 11, 1, 15),
                  "test",
                  new ReferenceType(new Location(1, 24, 1, 27), "bool")
                ),
                new FunctionParameter(
                  new Location(1, 23, 1, 28),
                  "other",
                  new ReferenceType(new Location(1, 23, 1, 28), "char")
                )
              ),
              new ReferenceType(new Location(1, 37, 1, 40), "int"),
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
          new Location(0, 0, 0, 9),
          false,
          "Test",
          new ComponentGroup(
            new FunctionEntity(
              new Location(1, 2, 1, 4),
              false,
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

  describe(key, () => {
    for (const [input, expected, name] of tests)
      it(name, () => {
        expect(ParseUnbound(input.replaceAll("      ", "")).json).toEqual(
          expected.json
        );
      });
  });
}

const unhappy_blocks: Record<string, Array<[string, ParserError, string]>> = {
  namespace: [
    [
      `namespace Test`,
      new ParserError(undefined, "Unexpected end of file"),
      "has no block",
    ],
    [
      `namespace Test Name {}`,
      new ParserError(
        new Location(0, 15, 0, 0),
        "Unexpected symbol. Expected one of '{', '.' but received 'Name'"
      ),
      "spaces in the name",
    ],
  ],
  entity: [
    [
      `namespace Test {
        fn Test: int {}
      }`,
      new ParserError(
        new Location(1, 9, 0, 0),
        "Unexpected symbol. Expected one of '(' but received ':'"
      ),
      "no parameters section",
    ],
  ],
};

for (const key in unhappy_blocks) {
  const tests = unhappy_blocks[key];

  describe(key + " errors", () => {
    for (const [input, expected, name] of tests)
      it(name, () => {
        expect(() => ParseUnbound(input.replaceAll("      ", ""))).toThrow(
          expected
        );
      });
  });
}
