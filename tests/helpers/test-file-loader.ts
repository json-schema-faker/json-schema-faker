import { readdir, readFile } from "fs/promises";
import { join, relative } from "path";
import type { SchemaFakerTestSuite } from "./schema-faker-runner.js";

// Helper to normalize test file imports (some are arrays, some are single objects)
export function normalizeSuites(imported: unknown): SchemaFakerTestSuite[] {
  if (Array.isArray(imported)) {
    return imported as SchemaFakerTestSuite[];
  }
  // Single suite object wrapped in an array
  return [imported as SchemaFakerTestSuite];
}

// Recursively find all JSON files in a directory
export async function findJsonFiles(dir: string): Promise<string[]> {
  const files: string[] = [];
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      const subFiles = await findJsonFiles(fullPath);
      files.push(...subFiles);
    } else if (entry.isFile() && entry.name.endsWith(".json")) {
      files.push(fullPath);
    }
  }

  return files;
}

// Load and parse all JSON test files from a directory
export async function loadTestFiles(
  baseDir: string,
  subPath: string
): Promise<Array<{ name: string; suites: SchemaFakerTestSuite[] }>> {
  const fullPath = join(baseDir, subPath);
  const jsonFiles = await findJsonFiles(fullPath);
  const testFiles: Array<{ name: string; suites: SchemaFakerTestSuite[] }> = [];

  for (const filePath of jsonFiles.sort()) {
    const content = await readFile(filePath, "utf-8");
    const parsed = JSON.parse(content);
    const relativePath = relative(fullPath, filePath);
    testFiles.push({
      name: relativePath,
      suites: normalizeSuites(parsed),
    });
  }

  return testFiles;
}
