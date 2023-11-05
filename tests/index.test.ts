import { LinkUnbound } from "@compiler/linker";
import { ParseUnbound } from "@compiler/parser";
import Fs from "fs";
import Path from "path";
import { Ast } from "../compiler/ast/base";

function try_read(path: string) {
  try {
    return Fs.readFileSync(path, "utf-8");
  } catch {
    return undefined;
  }
}

function snapshot_test(
  file_name: string,
  dirname: string,
  process: (data: string) => any
) {
  if (file_name === "snapshots") return;
  const path = Path.resolve(dirname, file_name);
  const expected_path = Path.resolve(dirname, "snapshots", file_name + ".json");

  it(file_name, () => {
    const content = Fs.readFileSync(path, "utf-8");
    const result = process(content);
    const expected = try_read(expected_path);

    if (!expected) {
      try {
        Fs.mkdirSync(Path.resolve(dirname, "snapshots"));
      } catch {}
      Fs.writeFileSync(expected_path, JSON.stringify(result, undefined, 2));
    }

    expect(result).toEqual(JSON.parse(expected ?? "{}"));
  });
}

describe("parser", () => {
  const base = Path.resolve(__dirname, "parser");
  const success = Path.resolve(base, "success");
  const error = Path.resolve(base, "errors");
  for (const file of Fs.readdirSync(success)) {
    snapshot_test(file, success, (d) => ParseUnbound(d, file).json);
  }

  for (const file of Fs.readdirSync(error)) {
    snapshot_test(file, error, (d) => {
      try {
        ParseUnbound(d, file);
      } catch (err: any) {
        return err.toString();
      }

      throw new Error("Parsing succeeded");
    });
  }
});

describe("linker", () => {
  const base = Path.resolve(__dirname, "linker");
  const success = Path.resolve(base, "success");
  const error = Path.resolve(base, "errors");
  for (const file of Fs.readdirSync(success)) {
    snapshot_test(
      file,
      success,
      (d) => LinkUnbound(new Ast(ParseUnbound(d, file))).json
    );
  }

  for (const file of Fs.readdirSync(error)) {
    snapshot_test(file, error, (d) => {
      try {
        LinkUnbound(new Ast(ParseUnbound(d, file))).json;
      } catch (err: any) {
        return err.toString();
      }

      throw new Error("Linking succeeded");
    });
  }
});
