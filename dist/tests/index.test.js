"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const linker_1 = require("#compiler/linker");
const parser_1 = require("#compiler/parser");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ast_1 = require("#compiler/ast");
const expect_1 = __importDefault(require("expect"));
const test_file = process.argv[1] ? path_1.default.resolve(process.argv[1]) : undefined;
function try_read(path) {
    try {
        return fs_1.default.readFileSync(path, "utf-8");
    }
    catch {
        return undefined;
    }
}
let errors = false;
let describing = "";
function describe(name, handler) {
    console.log("\n\n\nDescribing: " + name);
    describing = name;
    handler();
}
function it(name, handler) {
    try {
        console.log(`\n\nRunning Test: ${describing} -> ${name}`);
        handler();
        console.log(`Test Passed: ${describing} -> ${name}`);
    }
    catch (err) {
        console.log(`Error for: ${describing} -> ${name}`);
        console.error(err);
        errors = true;
    }
    finally {
        ast_1.ComponentStore.Clear();
    }
}
function snapshot_test(file_name, dirname, process) {
    if (file_name === "snapshots")
        return;
    const path = path_1.default.resolve(dirname, file_name);
    if (test_file && test_file !== path)
        return;
    const expected_path = path_1.default.resolve(dirname, "snapshots", file_name + ".json");
    it(file_name, () => {
        const content = fs_1.default.readFileSync(path, "utf-8");
        let result = process(content);
        if (typeof result !== "string")
            result = ast_1.ComponentStore.Json;
        const expected = try_read(expected_path);
        if (!expected) {
            try {
                fs_1.default.mkdirSync(path_1.default.resolve(dirname, "snapshots"));
            }
            catch { }
            fs_1.default.writeFileSync(expected_path, JSON.stringify(result, undefined, 2));
        }
        (0, expect_1.default)(result).toEqual(JSON.parse(expected ?? "{}"));
    });
}
describe("parser", () => {
    const base = path_1.default.resolve("tests", "parser");
    const success = path_1.default.resolve(base, "success");
    const error = path_1.default.resolve(base, "errors");
    for (const file of fs_1.default.readdirSync(success)) {
        snapshot_test(file, success, (d) => (0, parser_1.ParseUnbound)(d, file));
    }
    for (const file of fs_1.default.readdirSync(error)) {
        snapshot_test(file, error, (d) => {
            try {
                (0, parser_1.ParseUnbound)(d, file);
            }
            catch (err) {
                return err.toString();
            }
            throw new Error("Parsing succeeded");
        });
    }
});
describe("linker", () => {
    const base = path_1.default.resolve("tests", "linker");
    const success = path_1.default.resolve(base, "success");
    const error = path_1.default.resolve(base, "errors");
    for (const file of fs_1.default.readdirSync(success)) {
        snapshot_test(file, success, (d) => (0, linker_1.LinkUnbound)(new ast_1.Ast((0, parser_1.ParseUnbound)(d, file))));
    }
    // for (const file of Fs.readdirSync(error)) {
    //   snapshot_test(file, error, (d) => {
    //     try {
    //       LinkUnbound(new Ast(ParseUnbound(d, file))).json;
    //     } catch (err: any) {
    //       return err.toString();
    //     }
    //     throw new Error("Linking succeeded");
    //   });
    // }
});
process.exit(errors ? 1 : 0);
//# sourceMappingURL=index.test.js.map