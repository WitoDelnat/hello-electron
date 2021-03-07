import { config } from "./config";
import { createServer } from "./server/createServer";
import { logger } from "./utils/logger";
import { startProcess } from "./utils/process";

const PORT = config.server.port;

const server = createServer();

startProcess(async () => {
  logger.info("starting server");
  await server.listen(PORT, "0.0.0.0");
});
