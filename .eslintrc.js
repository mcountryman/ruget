module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ["react", "@typescript-eslint", "import", "unused-imports"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier",
  ],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {},
    },
    react: {
      version: "detect",
      pragma: "React",
    },
  },
  overrides: [
    {
      files: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
      extends: ["plugin:testing-library/react"],
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "error",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],

    "import/order": ["error", { alphabetize: { order: "asc", caseInsensitive: true } }],
    "no-duplicate-imports": "error",
    "import/newline-after-import": "error",

    // Automatic `import * as React from "react";` done at build time.
    "react/react-in-jsx-scope": "off",
    "no-restricted-imports": [
      "error",

      "@mui/*/*/*",
      "!@mui/material/test-utils/*",
      "@mui/material",
      "@mui/icons-material",
    ],
  },
};
