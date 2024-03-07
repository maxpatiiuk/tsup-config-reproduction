import { defineConfig } from "tsup";

export default defineConfig(() => ({
  entry: ["src/index.ts", "src/testing.ts"],
  format: ["esm"],
  target: "es2020",
  dts: true,
  outDir: "dist",
  clean: true,
  minify: false,
  minifyIdentifiers: false,
  minifySyntax: false,
  minifyWhitespace: false,
  splitting: false,
}));
