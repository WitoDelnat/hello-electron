import Fastify from "fastify";
import fastifyCors from "fastify-cors";
import fastifySensible from "fastify-sensible";
import fastifyHealth from "./fastify-health";
import { logger } from "../utils/logger";

export function createServer() {
  const server = Fastify({ logger });

  server.register(fastifyCors);
  server.register(fastifySensible, { errorHandler: false });
  server.register(fastifyHealth);

  return server;
}
