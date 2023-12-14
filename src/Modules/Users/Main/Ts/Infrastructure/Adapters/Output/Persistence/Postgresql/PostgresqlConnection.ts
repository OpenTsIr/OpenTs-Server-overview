import { IConnection } from "src/Modules/Common/Main/Ts/Infrastructure/Adapters/Persistence/IConnection";
import { InternalServerErrorException, NotImplementedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Pool, PoolClient } from "pg";

export default class PostgresqlConnection implements IConnection<Pool>
{
    private static _pool: Pool = null;

    public constructor (private readonly _configService: ConfigService)
    {
        if (!!this.pool)
        {
            throw new InternalServerErrorException("امکان اجرای درخواست وجود ندارد");
        }
        this.pool = new Pool({
            user: this._configService.getOrThrow("DATABASE_USER"),
            password: this._configService.getOrThrow("DATABASE_PASSWORD")
        });
    }
    get connection(): Promise<Pool>
    {
        throw new NotImplementedException();
    }
    public get pool(): Pool
    {
        return PostgresqlConnection._pool;
    }
    private set pool(pool: Pool)
    {
        PostgresqlConnection._pool = pool;
    }
    async setupConnectionPool(): Promise<void>
    {
        if (this.pool === null)
        {
            this.pool = PostgresqlConnection._pool;
        }
        return Promise.resolve();
    }
    public async isConnectionHealthy(): Promise<boolean>
    {
        let currentClient: PoolClient;

        try
        {
            currentClient = await this.pool.connect();

            return true;
        }
        catch
        {
            throw new InternalServerErrorException("خطای داخلی");
        }
        finally
        {
            currentClient.release();
        }
    }
}
