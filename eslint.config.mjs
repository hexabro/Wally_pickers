import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";


export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: ["react"],
    extends: [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:react/jsx-runtime"
    ],
    rules: {
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      ...pluginReact.rules,
    },
    settings: {
      react: {
        version: "detect"
      }
    }
  }
]);

