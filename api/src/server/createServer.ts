import Fastify from "fastify";
import fastifyCors from "fastify-cors";
import fastifySensible from "fastify-sensible";
import mercurius from "mercurius";
import { config } from "../config";
import { createContext } from "../schema/createContext";
import { createSchema } from "../schema/createSchema";
import { DatabasePool } from "../utils/database";
import { logger } from "../utils/logger";
import fastifyHealth from "./fastify-health";

const PLAYGROUND = config.server.playground;

export type ServerInit = {
  database: DatabasePool;
};

export function createServer({ database }: ServerInit) {
  const server = Fastify({ logger });

  server.register(fastifyCors);
  server.register(fastifySensible, { errorHandler: false });
  server.register(fastifyHealth);
  server.register(mercurius, {
    schema: createSchema(),
    graphiql: PLAYGROUND ? "playground" : undefined,
    context: () => {
      return createContext({ database });
    },
  });

  return server;
}
