import { GraphQLClient } from "graphql-request";
import { DatabasePoolType, sql } from "slonik";
import { config } from "../../config";
import { createServer } from "../../server/createServer";
import { createDatabasePool, Database } from "../database";

const port = config.server.port;

export type SdkFunctionWrapper = <T>(action: () => Promise<T>) => Promise<T>;
export type GetSdk<T = Record<string, unknown>> = (client: GraphQLClient) => T;

export type Context<SDK extends GetSdk> = {
  readonly db: DatabasePoolType;
  readonly client: ReturnType<SDK>;
};

export function createTestContext<SDK extends GetSdk>(getSdk: SDK): Context<SDK> {
  const database = createDatabasePool({
    host: config.database.host,
    port: config.database.port,
    name: config.database.name,
    user: config.database.user,
    password: config.database.password,
  });
  const server = createServer({ database });
  const client = new GraphQLClient(`http://localhost:${port}/graphql`);
  const sdk = getSdk(client);

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
      return sdk as ReturnType<SDK>;
    },
  };
}

async function resetDatabase(db: Database) {
  // TODO proper migrations
  await db.query(sql`TRUNCATE TABLE "tasks";`);
}
