import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { PoolClient } from "pg";
import { IUserRepository } from "src/Modules/Users/Main/Ts/Application/Ports/Output/IUserRepository";
import Email from "src/Modules/Users/Main/Ts/Domain/UserAggregate/Email";
import Password from "src/Modules/Users/Main/Ts/Domain/UserAggregate/Password";
import User from "src/Modules/Users/Main/Ts/Domain/UserAggregate/User";
import UserId from "src/Modules/Users/Main/Ts/Domain/UserAggregate/UserId";
import UserPersistenceModel from 'src/Modules/Users/Main/Ts/Infrastructure/Adapters/Output/Persistence/Models/UserPersistenceModel';

export default class PostgresqlUserRepository implements IUserRepository
{
    public constructor
        (
            @InjectMapper()
            private readonly _mapper: Mapper,
            private readonly _connection: PoolClient
        )
    { }
    public async isAccountAvailable(email: Email): Promise<boolean>
    {
        throw new Error("Method not implemented.");
    }
    public async registerNewUser(user: User, hashedPassword: Password): Promise<void>
    {
        // const userPersistenceModel = this._mapper.map(user, User, UserPersistenceModel);

        // await this._connection.query;
    }
    public async getUserByEmailAddress(email: Email): Promise<User>
    {
        throw new Error("Method not implemented.");
    }
    public async getUserById(userId: UserId): Promise<User>
    {
        throw new Error("Method not implemented.");
    }
    public async verifyUser(email: Email): Promise<void>
    {
        throw new Error("Method not implemented.");
    }
    public async promoteUserToAuthor(user: User): Promise<void>
    {
        throw new Error("Method not implemented.");
    }
    public async promoteUserToAdmin(user: User): Promise<void>
    {
        throw new Error("Method not implemented.");
    }
    public async promoteUserToModerator(user: User): Promise<void>
    {
        throw new Error("Method not implemented.");
    }
}
