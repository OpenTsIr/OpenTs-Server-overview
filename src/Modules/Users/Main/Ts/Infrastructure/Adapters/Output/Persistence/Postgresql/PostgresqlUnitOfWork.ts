import { IUserRepository } from 'src/Modules/Users/Main/Ts/Application/Ports/Output/IUserRepository';
import { InternalServerErrorException, Logger } from "@nestjs/common";
import { Pool, PoolClient } from "pg";
import { IUnitOfWork } from "src/Modules/Common/Main/Ts/Infrastructure/Adapters/Persistence/IUnitOfWork";
import { IConnection } from 'src/Modules/Common/Main/Ts/Infrastructure/Adapters/Persistence/IConnection';
import { randomUUID } from 'crypto';
import PostgresqlUserRepository from 'src/Modules/Users/Main/Ts/Infrastructure/Adapters/Output/Persistence/Postgresql/PostgresqlUserRepository';

export default class PostgresqlUnitOfWork implements IUnitOfWork
{
    private readonly _logger = new Logger(this.constructor.name);
    private _connection: PoolClient;
    private _transactionId: string = null;

    private _userRepository: IUserRepository;
    // private _eventRepository: IEventRepository;

    public constructor
        (
            // private readonly _mapper: Mapper,
            private readonly _databaseConnection: IConnection<Pool>
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
    // eslint-disable-next-line accessor-pairs
    // public get eventRepository(): IEventRepository
    // {
    //     if (!this._eventRepository)
    //     {
    //         this._eventRepository = new OracledbEventRepository(this.mapper, this.connection);
    //     }
    //     return this._eventRepository;
    // }
    // eslint-disable-next-line accessor-pairs
    // public get mapper(): Mapper
    // {
    //     return this._mapper;
    // }
    public get connection(): PoolClient
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
        await this._databaseConnection.setupConnectionPool();

        this.connection = await this._databaseConnection.pool.connect();
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
    public async [ Symbol.asyncDispose ](): Promise<void>
    {
        this._connection.release();
        console.timeEnd(this._transactionId);
    }
}
