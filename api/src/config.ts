import configFiles from "config";
import * as z from "zod";

const ConfigSchema = z.object({
  server: z.object({
    port: z.number().min(0).max(65535),
    playground: z.boolean(),
  }),
  logger: z.object({
    level: z.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"]),
    json: z.boolean(),
  }),
});

export type Config = z.infer<typeof ConfigSchema>;
export const config = ConfigSchema.parse(configFiles.util.toObject());
