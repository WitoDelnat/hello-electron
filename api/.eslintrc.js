module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  env: {
    browser: false,
    jasmine: true,
    jest: true,
  },
  extends: ["plugin:@typescript-eslint/recommended"],
  rules: {
    "@typescript-eslint/no-explicit-any": 2,
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/no-use-before-define": [
      "error",
      { functions: false, classes: false },
    ],
    "@typescript-eslint/explicit-module-boundary-types": "off",
  },
};
