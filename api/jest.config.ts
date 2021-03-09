import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  roots: ["<rootDir>/src"],
  testEnvironment: "node",
  testRunner: "jest-circus/runner",
  transform: { "^.+\\.(ts)?$": "ts-jest" },
};

export default config;
