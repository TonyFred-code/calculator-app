import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import prettier from "eslint-config-prettier";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist"]),

  {
    files: ["**/*.{js,jsx}"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    extends: [
      js.configs.recommended,
      react.configs.flat.recommended,
      reactRefresh.configs.vite,
      reactHooks.configs.flat.recommended,
      prettier, // MUST be last
    ],

    rules: {
      // React 17+ JSX runtime
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",

      // Vite Fast Refresh safety
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      "no-unused-vars": ["error", { varsIgnorePattern: "^[A-Z_]" }],
    },
  },
]);
