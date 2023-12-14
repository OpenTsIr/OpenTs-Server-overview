import { PoolClient } from "pg";
import { IUserRepository } from "src/Modules/Users/Main/Ts/Application/Ports/Output/IUserRepository";
import Email from "src/Modules/Users/Main/Ts/Domain/UserAggregate/Email";
import Password from "src/Modules/Users/Main/Ts/Domain/UserAggregate/Password";
import User from "src/Modules/Users/Main/Ts/Domain/UserAggregate/User";
import UserId from "src/Modules/Users/Main/Ts/Domain/UserAggregate/UserId";

export default class PostgresqlUserRepository implements IUserRepository
{
    constructor (private readonly _client: PoolClient)
    { }
    async isAccountAvailable(email: Email): Promise<boolean>
    {
        throw new Error("Method not implemented.");
    }
    async registerNewUser(email: Email, hashedPassword: Password): Promise<void>
    {
        throw new Error("Method not implemented.");
    }
    async getUserByEmailAddress(email: Email): Promise<User>
    {
        throw new Error("Method not implemented.");
    }
    async getUserById(userId: UserId): Promise<User>
    {
        throw new Error("Method not implemented.");
    }
    async verifyUser(email: Email): Promise<void>
    {
        throw new Error("Method not implemented.");
    }
    async promoteUserToAuthor(user: User): Promise<void>
    {
        throw new Error("Method not implemented.");
    }
    async promoteUserToAdmin(user: User): Promise<void>
    {
        throw new Error("Method not implemented.");
    }
    async promoteUserToModerator(user: User): Promise<void>
    {
        throw new Error("Method not implemented.");
    }
}
