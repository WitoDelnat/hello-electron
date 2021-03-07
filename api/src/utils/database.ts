import { CommonQueryMethodsType, createPool, DatabasePoolConnectionType } from "slonik";

export type Database = CommonQueryMethodsType;
export type DatabasePool = DatabasePoolConnectionType;

export type DatabaseInit = {
  host: string;
  port: number;
  name: string;
  user: string;
  password: string;
};

export function createDatabasePool({ host, port, name, user, password }: DatabaseInit) {
  const encodedUser = encodeURIComponent(user);
  const encodedPassword = encodeURIComponent(password);
  const connectionString = `postgres://${encodedUser}:${encodedPassword}@${host}:${port}/${name}`;

  return createPool(connectionString, {
    typeParsers: [
      {
        name: "timestamptz",
        parse: (value) => (value ? new Date(value) : null),
      },
    ],
  });
}
