import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react"; // ⬅️ sin destructuring
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: {
      js,
      react: pluginReact,
    },
    rules: {
      // tus reglas aquí
      "react/jsx-uses-react": "on",
    },
    languageOptions: {
      globals: globals.browser,
    },
    extends: ["js/recommended"],
  },

  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
]);
