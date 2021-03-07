import { config } from "./config";
import { createServer } from "./server/createServer";
import { createDatabasePool } from "./utils/database";
import { logger } from "./utils/logger";
import { startProcess } from "./utils/process";

const database = createDatabasePool({
  host: config.database.host,
  port: config.database.port,
  name: config.database.name,
  user: config.database.user,
  password: config.database.password,
});
const server = createServer({ database });

startProcess({
  main: async () => {
    logger.info("starting server");
    await server.listen(config.server.port, "0.0.0.0");
  },
  shutdown: async () => {
    await database.end();
  },
});
