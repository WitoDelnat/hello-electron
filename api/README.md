# API - Hello Linear

## Tests

Automated tests expect a database to be available.

```
docker run --rm --detach \
  --name hello-linear-tests \
  -e POSTGRES_DB=api-db \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -p 15432:5432 \
  postgres:12.1
```

## Deployment

**Getting started**

```

minikube start
skaffold run
minikube tunnel

```

> The deployment is exposed with a LoadBalancer service.

**Database initalisation**

Automated database initalisation and migrations are out-of-scope.
You will have to port-forward the database and execute the following SQL statement to initialise the database:

```
CREATE TABLE "tasks" (
  id uuid,
  name text NOT NULL,
  status text NOT NULL DEFAULT 'ongoing',
  "createdAt" TIMESTAMP(3) WITH TIME ZONE NOT NULL DEFAULT NOW(),

  PRIMARY KEY("id")
);
```
