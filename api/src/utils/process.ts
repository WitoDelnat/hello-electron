import pino, { Logger } from "pino";
import { logger } from "./logger";

const isProduction = process.env.NODE_ENV === "production";
const noop = async () => {
  return;
};

export function startProcess(main: () => Promise<void>, shutdown: () => Promise<void> = noop) {
  main().catch(async (err) => {
    logger.fatal(err, "Unexpected shutdown because error.");
    await shutdown();
    process.exit(1);
  });

  if (!isProduction) return;

  process.on(
    "SIGTERM",
    pino.final(logger as pino.Logger, async (_: Error, finalLogger: Logger) => {
      finalLogger.info("Shutdown because terminated (SIGTERM).");
      await shutdown();
      process.exit(0);
    }),
  );
  process.on(
    "SIGINT",
    pino.final(logger as pino.Logger, async (_: Error, finalLogger: Logger) => {
      finalLogger.info("Graceful shutdown because interrupted (SIGINT).");
      await shutdown();
      process.exit(0);
    }),
  );
  process.on(
    "uncaughtException",
    pino.final(logger as pino.Logger, async (err: Error, finalLogger: Logger) => {
      finalLogger.fatal({ err }, "Unexpected shutdown because uncaught exception.");
      await shutdown();
      process.exit(1);
    }),
  );
  process.on(
    "unhandledRejection",
    pino.final(logger as pino.Logger, async (err: Error, finalLogger: Logger) => {
      finalLogger.fatal({ err }, "Unexpected shutdown because unhandled rejection.");
      await shutdown();
      process.exit(1);
    }),
  );
}
