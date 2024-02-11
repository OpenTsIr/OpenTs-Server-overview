import { InternalServerErrorException, Logger } from "@nestjs/common";
import { randomUUID } from 'crypto';
import { PoolClient } from "pg";
import { IUserRepository } from 'src/Modules/Users/Main/Ts/Application/Ports/Output/IUserRepository';
import { IUnitOfWork } from "src/Modules/Common/Main/Ts/Infrastructure/Adapters/Persistence/IUnitOfWork";
import { IConnection } from 'src/Modules/Common/Main/Ts/Infrastructure/Adapters/Persistence/IConnection';
import PostgresqlUserRepository from 'src/Modules/Users/Main/Ts/Infrastructure/Adapters/Output/Persistence/Postgresql/PostgresqlUserRepository';

export default class PostgresqlUnitOfWork implements IUnitOfWork, Disposable
{
    private readonly _logger = new Logger(PostgresqlUnitOfWork.name);
    private _connection: PoolClient;
    private _transactionId: string = null;
    private _userRepository: IUserRepository;

    public constructor
        (
            // private readonly _mapper: Mapper,
            private readonly _databaseConnection: IConnection
        )
    { }
    // eslint-disable-next-line accessor-pairs
    public get userRepository(): IUserRepository
    {
        if (!this._userRepository)
        {
            this._userRepository = new PostgresqlUserRepository(this.connection);
        }
        return this._userRepository;
    }
    // eslint-disable-next-line @typescript-eslint/naming-convention
    private get connection(): PoolClient
    {
        return this._connection;
    }
    // eslint-disable-next-line @typescript-eslint/naming-convention
    private set connection(connection: PoolClient)
    {
        this._connection = connection;
    }
    private async _setupConnection(): Promise<void>
    {
        this.connection = await this._databaseConnection.getConnection();
    }
    public async startTransaction(): Promise<void>
    {
        if (this._transactionId !== null)
        {
            throw new InternalServerErrorException("Transaction Started Already");
        }
        await this._setupConnection();

        this._transactionId = randomUUID();

        console.time(this._transactionId);

        await this.connection.query('BEGIN');

        this._logger.verbose("Transaction Started: " + this._transactionId);
    }
    public async rollbackTransaction(): Promise<void>
    {
        await this.connection.query('ROLLBACK');
        this._logger.warn("Transaction Rolled Back: " + this._transactionId);
    }
    public async commitTransaction(): Promise<void>
    {
        await this.connection.query('COMMIT');
        this._logger.log("Transaction Commited: " + this._transactionId);
    }
    public [ Symbol.dispose ](): void
    {
        this._databaseConnection.releaseConnection();
        console.timeEnd(this._transactionId);
    }
}
