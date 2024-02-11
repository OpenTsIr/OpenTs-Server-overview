import { ConfigModule, ConfigService } from "@nestjs/config";
import { Test, TestingModule } from "@nestjs/testing";
import PostgresqlConnection from "src/Modules/Users/Main/Ts/Infrastructure/Adapters/Output/Persistence/Postgresql/PostgresqlConnection";

describe("PostgresqlConnection", () =>
{
    let moduleRef: TestingModule = null;
    let psqlConnection: PostgresqlConnection = null;

    beforeAll(async () =>
    {
        // build
        moduleRef = await Test.createTestingModule({
            imports: [ ConfigModule.forRoot({ envFilePath: [ ".env.development.local" ] }) ],
            providers: [ PostgresqlConnection, ConfigService ]
        }).compile();
    });
    it("checks for heathy postgresql database connection", async () =>
    {
        psqlConnection = moduleRef.get(PostgresqlConnection);

        // operate
        await psqlConnection.getConnection();
        const isConnectionHealthy = await psqlConnection.isConnectionHealthy();

        expect(isConnectionHealthy).toBe(true);
    });
    afterAll(async () =>
    {
        await moduleRef.close();
    });
});
