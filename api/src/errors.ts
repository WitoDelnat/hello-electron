import mercurius from "mercurius";
import { logger } from "./utils/logger";

export const errors = {
  api: {
    tasks: {
      notFound: createError("task not found"),
    },
  },
};

function createError(message: string) {
  const errorFn = () => {
    logger.error(message);
    return new mercurius.ErrorWithProps(message);
  };

  errorFn.message = message;

  return errorFn;
}
