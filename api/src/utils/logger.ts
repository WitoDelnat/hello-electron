import pino from "pino";
import { config } from "../config";

const LOG_LEVEL = config.logger.level;
const LOG_JSON = config.logger.json;

export const logger = pino({
  level: LOG_LEVEL,
  prettyPrint: LOG_JSON
    ? undefined
    : {
        levelFirst: true,
        colorize: true,
        ignore: "pid,hostname",
      },
  formatters: {
    level: (label) => ({ level: label }),
  },
}) as pino.BaseLogger;
