import { ParseUnbound } from "@compiler/parser";
import Fs from "fs";
import Path from "path";

describe("parser", () => {
  const base = Path.resolve(__dirname, "parser");
  const success = Path.resolve(base, "success");
  const error = Path.resolve(base, "errors");
  for (const file of Fs.readdirSync(success)) {
    const test_name = file.replace(".ub", "");
    const path = Path.resolve(success, file);

    it("parses a " + test_name, () => {
      const content = Fs.readFileSync(path, "utf-8");
      const result = ParseUnbound(content);
      expect(result.json).toMatchSnapshot();
    });
  }

  for (const file of Fs.readdirSync(error)) {
    const test_name = file.replace(".ub", "");
    const path = Path.resolve(error, file);

    it("errors when " + test_name, () => {
      const content = Fs.readFileSync(path, "utf-8");
      expect(() => ParseUnbound(content)).toThrowErrorMatchingSnapshot();
    });
  }
});
