import { migrate } from "postgres-migrations";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const migration = async function ()
{
    const dbConfig = {
        database: "database-name",
        user: "postgres",
        password: "password",
        host: "localhost",
        port: 5432,
        ensureDatabaseExists: true,
        defaultDatabase: "postgres"
    };

    await migrate(dbConfig, process.cwd() + "/src/Modules/Users/Main/Postgresql/Migrations");
};
