import { sql } from "slonik";
import { config } from "../../config";
import { createServer } from "../../server/createServer";
import { createDatabasePool, Database } from "../database";
import { GraphQLClient } from "graphql-request";

const port = config.server.port;

export function createTestContext() {
  const database = createDatabasePool({
    host: config.database.host,
    port: config.database.port,
    name: config.database.name,
    user: config.database.user,
    password: config.database.password,
  });
  const server = createServer({ database });
  const client = new GraphQLClient(`http://localhost:${port}/graphql`);

  beforeAll(async () => {
    await server.ready();
    server.listen(config.server.port);
  });

  beforeEach(async () => {
    await resetDatabase(database);
  });

  afterAll(async () => {
    await server.close();
    await database.end();
  });

  return {
    get db() {
      return database;
    },
    get client() {
      return client;
    },
  };
}

async function resetDatabase(db: Database) {
  // TODO proper migrations
  await db.query(sql`TRUNCATE TABLE "tasks";`);
}
