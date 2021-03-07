import Fastify from "fastify";
import fastifyCors from "fastify-cors";
import fastifySensible from "fastify-sensible";
import mercurius from "mercurius";
import { config } from "../config";
import { createSchema } from "../schema/createSchema";
import { logger } from "../utils/logger";
import fastifyHealth from "./fastify-health";

const PLAYGROUND = config.server.playground;

export function createServer() {
  const server = Fastify({ logger });

  server.register(fastifyCors);
  server.register(fastifySensible, { errorHandler: false });
  server.register(fastifyHealth);
  server.register(mercurius, {
    schema: createSchema(),
    graphiql: PLAYGROUND ? "playground" : undefined,
  });

  return server;
}
