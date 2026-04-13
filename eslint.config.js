import js from "@eslint/js";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";
import globals from "globals";

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      // Existing codebase patterns — warn don't block
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-require-imports": "warn",
      "@typescript-eslint/ban-ts-comment": "warn",
      "@typescript-eslint/no-unused-expressions": "warn",
      "no-unused-vars": "off", // handled by typescript-eslint rule above
      "no-empty": "warn",
      // no-undef is unreliable with TypeScript — TS handles this
      "no-undef": "off",
      // Pre-existing escape patterns in source
      "no-useless-escape": "warn",
      // cookie-checker.js is intentionally disabled with an early return
      "no-unreachable": "warn",
      // Don't auto-fix let → const
      "prefer-const": "off",
      // Don't rewrite multiple spaces in regex to {n} quantifier
      "no-regex-spaces": "off",
    },
  },
  {
    ignores: ["node_modules", "build", ".astro", "scripts", "public", "src/layouts/DocsLayout.astro"],
  },
];
