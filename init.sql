CREATE TABLE IF NOT EXISTS "task" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "name" VARCHAR NOT NULL,
    "description" TEXT NOT NULL,
    "startDate" TIMESTAMP NOT NULL,
    "endDate" TIMESTAMP NOT NULL,
    "finished" BOOLEAN NOT NULL
);
