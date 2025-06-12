import pluginJs from "@eslint/js";
import eslintPluginImportX from "eslint-plugin-import-x";
import globals from "globals";
import { configs } from "typescript-eslint";

export default [
  { ignores: ["dist"] },
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...configs.recommended,
  eslintPluginImportX.flatConfigs.recommended,
  eslintPluginImportX.flatConfigs.typescript,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { ignoreRestSiblings: true },
      ],
      "import-x/no-named-as-default-member": "off",
      "no-console": ["error"],
    },
  },
];
