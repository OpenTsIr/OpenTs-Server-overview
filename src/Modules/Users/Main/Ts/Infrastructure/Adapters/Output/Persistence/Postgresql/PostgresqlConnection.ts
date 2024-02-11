import { IConnection } from "src/Modules/Common/Main/Ts/Infrastructure/Adapters/Persistence/IConnection";
import { Injectable, InternalServerErrorException, NotImplementedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Pool, PoolClient } from "pg";

@Injectable()
export default class PostgresqlConnection implements IConnection
{
    private static _pool: Pool = null;
    private static _connection: PoolClient = null;

    public constructor (private readonly _configService: ConfigService)
    {
        if (!!PostgresqlConnection._pool)
        {
            throw new InternalServerErrorException("Connection already exists");
        }
        PostgresqlConnection._pool = new Pool({
            user: this._configService.getOrThrow("DATABASE_USER"),
            password: this._configService.getOrThrow("DATABASE_PASSWORD"),
            database: this._configService.getOrThrow("DATABASE_NAME")
        });
    }
    public async getConnection(): Promise<PoolClient>
    {
        PostgresqlConnection._connection = await PostgresqlConnection._pool.connect();

        return PostgresqlConnection._connection;
    }
    public releaseConnection(): void
    {
        PostgresqlConnection._connection.release();
    }
    public async isConnectionHealthy(): Promise<boolean>
    {
        try
        {
            await this.getConnection();

            return true;
        }
        catch
        {
            return false;
        }
        finally
        {
            this.releaseConnection();
        }
    }
}
