import Path from "path";
import Fs from "fs/promises";

type Target = "linux" | "macos" | "windows";

type File = string | Partial<Record<Target, string>>;

type Project = {
  files: Array<File>;
  libs?: Array<string>;
  target: Target;
  bin: string;
};

type Library = {
  files: Array<File>;
  libs?: Array<string>;
  supported: Target;
};

export async function Compile(root_dir: string) {
  const project: Project = JSON.parse(
    await Fs.readFile(Path.resolve(root_dir, "cinder.json"), "utf-8")
  );

  const cache_dir = Path.resolve(root_dir, ".cinder_cache");

  for (const path of project.libs ?? []) {
    const dir = Buffer.from(path).toString("hex");
    const loc = Path.resolve(cache_dir, dir);
    try {
      const stat = await Fs.stat(loc);
      if (!stat.isDirectory()) throw new Error("Not found");

      console.log(`Using cache for ${path}`);
    } catch {
      console.log(`Could not use cache for ${path}, pulling from remote`);
    }
  }
}
